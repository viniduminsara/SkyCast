import {SafeAreaView} from "@/components/Themed";
import {ActivityIndicator, NativeModules, Platform} from "react-native";

const {StatusBarManager} = NativeModules;

const RootScreen = () => {

    return (
        <SafeAreaView className='w-full h-full flex justify-center items-center'
                      style={{paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,}}>
            <ActivityIndicator size='large'/>
        </SafeAreaView>
    )
}

export default RootScreen;
