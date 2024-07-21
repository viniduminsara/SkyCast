import {NativeModules, Platform, View} from "react-native";
import {SafeAreaView, useThemeColor} from "@/components/Themed";
import CustomHeader from "@/components/CustomHeader";
import React from "react";
import {SemiBoldText} from "@/components/StyledText";
import ToggleInput from "@/components/ToggleInput";
import SettingsItem from "@/components/SettingsItem";
const {StatusBarManager} = NativeModules;

const SettingsScreen = () => {
    const bgColor = useThemeColor({}, 'cardColor');

    return (
        <SafeAreaView className='w-full h-full' style={{paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,}}>
            <CustomHeader title='Settings'/>
            <View className='px-6'>
                <View className='mt-4'>
                    <SemiBoldText className='text-xl mb-4 px-4'>App Settings</SemiBoldText>
                    <View className='flex w-full px-6 pt-4 rounded-3xl' style={{backgroundColor: bgColor}}>
                        <ToggleInput
                            title='Weather'
                            options={[
                                { label: "°C", value: "c" },
                                { label: "°F", value: "f" }
                            ]}
                            changeHandler={(value) => console.log('value: ', value)}
                        />
                        <ToggleInput
                            title='Wind'
                            options={[
                                { label: "Km", value: "km" },
                                { label: "Mil", value: "mil" }
                            ]}
                            changeHandler={(value) => console.log('value: ', value)}
                        />
                        <ToggleInput
                            title='Theme'
                            options={[
                                { label: "Dark", value: "dark" },
                                { label: "Light", value: "light" }
                            ]}
                            changeHandler={(value) => console.log('value: ', value)}
                        />
                    </View>
                </View>
                <View className='mt-4'>
                    <SemiBoldText className='text-xl mb-4 px-4'>App info</SemiBoldText>
                    <View className='flex w-full px-6 py-2 rounded-3xl' style={{backgroundColor: bgColor}}>
                        <SettingsItem title='WeatherPro' iconName='verified'/>
                        <SettingsItem title='About Weather app' iconName='info'/>
                        <SettingsItem title='Share' iconName='share-android'/>
                        <SettingsItem title='Join with us' iconName='people'/>
                        <SettingsItem title='Mobile data limit' iconName='broadcast'/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SettingsScreen;
