import {SafeAreaView, Text,} from "@/components/Themed";
import {ActivityIndicator, Button, Linking} from "react-native";
import {useRouter} from "expo-router";
import {useEffect} from "react";
import {useLocation} from "@/context/LocationContext";
import auth from "@react-native-firebase/auth";

const RootScreen = () => {
    const router = useRouter();
    const {location} = useLocation();
    const user = auth().currentUser;

    useEffect(() => {
        if (location) {
            if (user) {
                router.replace('/(app)');
            }else {
                router.replace('/(auth)/sign-in');
            }
        }
    }, [location]);

    const openLocationSettings = () => {
        Linking.openSettings();
    };

    return (
        <SafeAreaView className='flex-1 justify-center items-center'>
            <ActivityIndicator size='large'/>
            <Text>{location? JSON.stringify(location) : 'Loading Location'}</Text>
            <Button title="Open Location Settings" onPress={openLocationSettings} />
        </SafeAreaView>
    )
}

export default RootScreen;
