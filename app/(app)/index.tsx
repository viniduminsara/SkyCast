import {Text, View, StyleSheet} from "react-native";
import {SafeAreaView} from "@/components/Themed";
import {LinearGradient} from "expo-linear-gradient";

const DashboardScreen = () => {

    return (
        <SafeAreaView className='flex-1 justify-center items-center'>
            <LinearGradient
                colors={['#3C6FD1', '#7CA9FF']}
                className='w-24 h-24'
            />
        </SafeAreaView>
    )
}

export default DashboardScreen;
