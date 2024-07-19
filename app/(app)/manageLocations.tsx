import {SafeAreaView, useThemeColor} from "@/components/Themed";
import {NativeModules, Platform, TextInput, TouchableOpacity, useColorScheme, View} from "react-native";
import {AntDesign, FontAwesome6, MaterialCommunityIcons} from "@expo/vector-icons";
import {SemiBoldText} from "@/components/StyledText";
import React from "react";
import {useRouter} from "expo-router";
import MapView from "react-native-maps";
import {darkMapStyle, lightMapStyle} from "@/constants/mapStyles";

const {StatusBarManager} = NativeModules;

const ManageLocationsScreen = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const color = useThemeColor({}, 'text');
    const bgColor = useThemeColor({}, 'cardColor');

    return (
        <SafeAreaView className='w-full h-full'
                      style={{paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,}}>
            <View className='flex flex-row justify-between items-center py-6 px-8'>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome6 name="chevron-left" size={24} color={color}/>
                </TouchableOpacity>
                <SemiBoldText className='text-lg'>Manage Locations</SemiBoldText>
                <MaterialCommunityIcons name="dots-horizontal" size={24} color={color}/>
            </View>
            <View className=''>
                <View className='flex flex-row justify-around items-center rounded-full shadow px-4 py-2 mx-4 mb-4' style={{backgroundColor: bgColor}}>
                    <AntDesign name="search1" size={24} color="#A098AE" className='w-6 h-6'/>
                    <TextInput
                        placeholder="Search"
                        className='flex-1 pl-4 text-lg'
                        placeholderTextColor={color}
                        style={{color: color}}
                    />
                </View>
                <MapView
                    customMapStyle={colorScheme === 'dark' ? darkMapStyle : lightMapStyle}
                    className='w-full h-full'
                ></MapView>
            </View>
        </SafeAreaView>
    )
}

export default ManageLocationsScreen;
