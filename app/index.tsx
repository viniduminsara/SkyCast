import {SafeAreaView, Text,} from "@/components/Themed";
import {ActivityIndicator, StyleSheet} from "react-native";
import {useRouter} from "expo-router";
import {useEffect} from "react";


const RootScreen = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace('/(app)')
        }, 1000);
    }, [])

    return (
        <SafeAreaView className='flex-1 justify-center items-center'>
            <ActivityIndicator size='large'/>
        </SafeAreaView>
    )
}

export default RootScreen;
