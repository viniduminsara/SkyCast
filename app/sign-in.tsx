import {Text, View} from "@/components/Themed";
import {StyleSheet} from "react-native";


const SignInScreen = () => {

    return (
        <View style={styles.container}>
            <Text>SignIn</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default SignInScreen;
