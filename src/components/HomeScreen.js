import React, { Component } from 'react';
import { ToastAndroid, BackHandler, Alert } from 'react-native';
import { Layout, Input, Icon, Button, Card, Text, Spinner } from '@ui-kitten/components';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Clipboard from '@react-native-clipboard/clipboard';
import SplashScreen from 'react-native-splash-screen';
import { API_KEY, API_URL } from '../../apiData';
import { Styles } from '../styles/Styles';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';

export class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            data: '',
            Rcredits: '',
            loading: false,
            offline: '',
            sen: '',
            error: false
        };

        this.text = React.createRef();
    }

    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
            cancelable: false
        }
        )
        return true;
    }

    componentDidMount() {
        SplashScreen.hide();

        this.unsubscribe = NetInfo.addEventListener(state => {
            this.setState({ offline: state.isConnected });
            if (!state.isConnected) {
                showMessage({
                    message: "You are offline !",
                    type: "danger"
                });
            }
            else {
                hideMessage();
            }
        });

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)

        this.getCredits();
    }

    componentWillUnmount() {
        if (this.state.offline == true) {
            ToastAndroid.show('You are online', ToastAndroid.LONG);
        }
        this.unsubscribe();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)

    }

    fetchSummary = async () => {
        this.text.current.blur();
        this.setState({ data: '', loading: true });
        const apiKey = API_KEY;
        const url = API_URL;

        if (this.state.offline) {

            const form = new FormData();
            form.append('key', apiKey);
            form.append('txt', this.state.value);
            form.append('sentences', this.state.sen);

            axios
                .post(url, form, {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    if (response.data.status.code == 0) {
                        AsyncStorage.setItem('credit', response.data.status.remaining_credits)
                            .then(() => {
                                this.setState({
                                    data: response.data.summary,
                                    loading: false,
                                    sen: '',
                                    value: '',
                                });
                            })
                            .catch(error => {
                                throw error;
                            });
                    } else {
                        this.setState({ error: true, loading: false, data: response.data.status.msg + ", try again" });
                    }
                })
                .catch(error => {
                    throw error;
                });
        } else {
            this.setState({ loading: false });
        }
    };

    validations = () => {
        if (
            this.state.value === ''
            || this.state.value.match(/^(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#]+\.[^\s]*$/)
            || this.state.sen === '') {
            ToastAndroid.show('Enter valid data', ToastAndroid.SHORT);
            this.setState({ loading: false });
        } else if (this.state.value === '' || this.state.sen === '') {
            ToastAndroid.show('All values are required.', ToastAndroid.SHORT);
        } else {
            this.fetchSummary();
        }
    };

    getCredits = async () => {
        const credits = await AsyncStorage.getItem('credit');
        if (credits !== '' && credits !== undefined) {
            this.setState({ Rcredits: credits });
        } else {
            this.setState({ Rcredits: '' });
        }
    };

    SendIcon = () => (
        <Icon name='paper-plane' fill="white" style={{ width: 22, height: 18 }} />
    );

    CloseIcon = () => {
        <Icon name="close" fill="white" />
    }

    render() {

        return (
            <Layout style={Styles.container}>
                <FlashMessage position="center" autoHide={false} floating={true} />
                <Layout style={Styles.header}>
                    <Text style={Styles.header_texts}>Remaining Credits: {!this.state.Rcredits ? "error" : this.state.Rcredits}</Text>
                </Layout>
                <Layout style={[Styles.message_container, this.state.value.length > 30 ? { flexGrow: 8 } : { flexGrow: 12 }]}>
                    <Card style={Styles.header_card}>
                        <Card
                            style={Styles.card_background}
                            onLongPress={() => {
                                this.state.data != "" ? Clipboard.setString(this.state.data.toString()) : null
                                this.state.data != "" ? ToastAndroid.show("Text copied to clipboard", ToastAndroid.SHORT) : ToastAndroid.show("Message is empty", ToastAndroid.SHORT)
                            }}
                            status={this.state.offline == false || this.state.error == true ? 'danger' :
                                !this.state.data ? 'warning' : 'success'}>
                            {this.state.offline == false ?
                                <Text
                                    status='danger'
                                    style={Styles.offline_text}>You are offline, Please connect to internet</Text> :
                                this.state.loading == true && this.state.data == "" ?
                                    <Spinner
                                        style={Styles.loading_style}
                                        size='giant' /> :
                                    !this.state.data && this.state.offline == true ?
                                        <Text
                                            status='warning'
                                            style={Styles.empty_style}>Data is empty</Text> :
                                        (<Text selectable={true}
                                            style={Styles.summary_data}>{this.state.data}</Text>)}
                        </Card>
                    </Card>
                </Layout>
                <Layout style={Styles.Input_layout}>
                    <Input
                        accessoryRight={this.CloseIcon}
                        allowFontScaling={false}
                        ref={this.text}
                        multiline
                        size='large'
                        style={Styles.Input_text}
                        defaultValue={this.state.value}
                        placeholder='Show me the texts'
                        onChangeText={nextValue => this.setState({ value: nextValue })}
                    />
                    <Input
                        allowFontScaling={false}
                        keyboardType='number-pad'
                        ref={this.text}
                        size='large'
                        style={Styles.Input_number}
                        defaultValue={this.state.sen}
                        placeholder='S'
                        onChangeText={nextValue => this.setState({ sen: nextValue })}
                    />
                    <Button onPress={() => this.validations()} style={Styles.Send}
                        accessoryRight={this.SendIcon}
                    />
                </Layout>
            </Layout>
        );
    }
}