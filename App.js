import React, { Component } from 'react';
import * as eva from '@eva-design/eva';
import { Appearance } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { HomeScreen } from './src/components/HomeScreen';

export default class App extends Component {
  constructor(props) {
    super(props);

    const colorScheme = Appearance.getColorScheme();
    this.state = {
      colorScheme,
      deviceTheme: colorScheme === 'dark' ? 'dark' : 'light',
      appTheme: eva[colorScheme === 'dark' ? 'dark' : 'light'],
    };
    this.appearanceListener = null;
  }

  componentDidMount() {
    Appearance.addChangeListener(this.handleAppearanceChange);
  }

  componentWillUnmount() {
    if (this.appearanceListener) {
      this.appearanceListener.remove();
    }
  }

  handleAppearanceChange = ({ colorScheme }) => {
    const deviceTheme = colorScheme === 'dark' ? 'dark' : 'light';
    this.setState({
      colorScheme,
      deviceTheme,
      appTheme: eva[deviceTheme],
    });
  };

  render() {

    const { appTheme } = this.state;

    return (
      <ApplicationProvider {...eva} theme={appTheme}>
        <IconRegistry icons={EvaIconsPack} />
        <HomeScreen />
      </ApplicationProvider>
    );
  }
}
