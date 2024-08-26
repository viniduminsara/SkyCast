import {SafeAreaView} from "@/components/Themed";
import {Image, NativeModules, Platform, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import {useEffect} from "react";
import {useLocation} from "@/context/LocationContext";
import auth from "@react-native-firebase/auth";
import {BoldText, LightText, RegularText} from "@/components/StyledText";
import * as Location from "expo-location";

const {StatusBarManager} = NativeModules;

const PermissionScreen = () => {
    const router = useRouter();
    const {location, updateLocation} = useLocation();
    const user = auth().currentUser;

    useEffect(() => {
        if (location) {
            if (user) {
                router.replace('/(app)');
            }else {
                router.replace('/(auth)/sign-in');
            }
        } else {

        }
    }, [location]);

    const handleSkip = () => {
        if (user) {
            router.replace('/(app)');
        }else {
            router.replace('/(auth)/sign-in');
        }
    };

    const handleEnableLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status)
        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            updateLocation(location);
            return;
        }

        updateLocation(null);
    }

    return (
        <SafeAreaView className='w-full h-full'
                      style={{paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,}}>
            <View className='flex justify-center items-center h-full'>
                <BoldText className='text-3xl mb-8'>Enable Your Location</BoldText>
                <Image source={require('../assets/images/location.png')} className='w-32 h-32 mb-16'/>
                <LightText className='px-16 text-lg text-center mb-6'>Please allow us to access your location service</LightText>
                <TouchableOpacity className='bg-primary px-28 py-2 rounded-xl mb-4' onPress={handleEnableLocation}>
                    <RegularText>Enable Location</RegularText>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSkip}>
                    <LightText>Not now</LightText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PermissionScreen;
