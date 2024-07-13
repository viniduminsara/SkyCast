import {Text, View} from "@/components/Themed";
import {StyleSheet} from "react-native";
import {useRouter} from "expo-router";
import {useEffect} from "react";


const RootScreen = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/signup')
        }, 3000);
    }, [])

    return (
        <View className='flex-1 justify-center items-center'>
            <Text className='text-red-500'>Root</Text>
        </View>
    )
}

export default RootScreen;
