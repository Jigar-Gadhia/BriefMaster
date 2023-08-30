import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    header: {
        flex: 0,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    header_texts: {
        marginRight: wp("4%"),
        marginVertical: hp("1%")
    },
    message_container: {
        flex: 1,
        alignSelf: "center",
    },
    header_card: {
        borderColor: "#0091f7",
        flex: 1,
        flexGrow: 1,
        width: wp("93%"),
        alignSelf: "center",
        justifyContent: "flex-end",
        borderRadius: 15
    },
    card_background: {
        borderRadius: 10,
        borderColor: "#f766ae",
        marginBottom: hp("1%")
    },
    offline_text: {
        margin: 5
    },
    loading_style: {
        alignSelf: "center"
    },
    empty_style: {
        margin: 10
    },
    summary_data: {
        lineHeight: 22,
        letterSpacing: 1
    },
    Input_layout: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    Input_text: {
        width: wp("63.5%"),
        borderRadius: 10,
        maxHeight: hp("30%")
    },
    Input_number: {
        marginHorizontal: wp("3%"),
        width: wp("14%"),
        height: hp("5.5%"),
        borderRadius: 10,
    },
    Send: {
        height: hp("5%"),
        borderRadius: 10
    }
})