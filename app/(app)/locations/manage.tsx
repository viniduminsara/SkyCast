import {SafeAreaView, useThemeColor} from "@/components/Themed";
import {Image, NativeModules, Platform, TouchableOpacity, useColorScheme, View} from "react-native";
import {FontAwesome6, MaterialIcons} from "@expo/vector-icons";
import {LightText, SemiBoldText} from "@/components/StyledText";
import React from "react";
import {useRouter} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import {weatherIcons} from "@/constants/WeatherIcons";
const {StatusBarManager} = NativeModules;

const ManageLocationScreen = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const color = useThemeColor({}, 'text');

    return (
        <SafeAreaView className='w-full h-full' style={{paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,}}>
            <View className='flex flex-row justify-between items-center py-6 px-8'>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome6 name="chevron-left" size={24} color={color}/>
                </TouchableOpacity>
                <SemiBoldText className='text-lg'>Manage Locations</SemiBoldText>
                <View/>
            </View>
            <View className='px-6'>
                <LinearGradient colors={['#3C6FD1', '#7CA9FF']}
                                start={{ x: 0.3, y: 0.4 }}
                                className='w-full rounded-xl p-2 flex-row justify-between items-center'
                >
                    <View className='flex-row items-center gap-x-2'>
                        <Image source={weatherIcons['Partly cloudy']} className='w-20 h-20'/>
                        <View>
                            <SemiBoldText>Kalutara, Sri Lanka</SemiBoldText>
                            <LightText className='text-2xl'>Partly Cloudy</LightText>
                        </View>
                    </View>
                    <LightText className='text-5xl'>32°</LightText>
                </LinearGradient>
            </View>
            <TouchableOpacity className='absolute bottom-6 right-6 flex-row items-center px-4 py-3 bg-primary rounded-2xl'>
                <MaterialIcons name="edit" size={24} color="white" />
                <SemiBoldText className='text-lg ml-2 text-white'>Edit</SemiBoldText>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ManageLocationScreen;
