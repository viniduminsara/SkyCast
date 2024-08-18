import {Alert, NativeModules, Platform, View} from "react-native";
import {SafeAreaView, useThemeColor} from "@/components/Themed";
import CustomHeader from "@/components/CustomHeader";
import React from "react";
import {SemiBoldText} from "@/components/StyledText";
import ToggleInput from "@/components/ToggleInput";
import SettingsItem from "@/components/SettingsItem";
import auth from "@react-native-firebase/auth";
const {StatusBarManager} = NativeModules;

const SettingsScreen = () => {
    const bgColor = useThemeColor({}, 'cardColor');

    const handleSignOut = () => {
        Alert.alert(
            'Sign out Confirmation',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Logout cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'Sign out',
                    onPress: () => {
                        auth().signOut()
                            .then(() => {
                                console.log('User signed out!')
                            })
                    },
                },
            ],
            { cancelable: false }
        );
    }

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
                        {/*<ToggleInput*/}
                        {/*    title='Theme'*/}
                        {/*    options={[*/}
                        {/*        { label: "Dark", value: "dark" },*/}
                        {/*        { label: "Light", value: "light" }*/}
                        {/*    ]}*/}
                        {/*    changeHandler={(value) => {*/}
                        {/*        toggleColorScheme()*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </View>
                </View>
                <View className='mt-4'>
                    <SemiBoldText className='text-xl mb-4 px-4'>App info</SemiBoldText>
                    <View className='flex w-full px-6 py-2 rounded-3xl' style={{backgroundColor: bgColor}}>
                        <SettingsItem title='WeatherPro' iconName='verified'/>
                        <SettingsItem title='About Weather app' iconName='info'/>
                        <SettingsItem title='Share' iconName='share-android'/>
                        <SettingsItem title='Join with us' iconName='people'/>
                        <SettingsItem title='Sign out' iconName='sign-out' handler={handleSignOut}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SettingsScreen;
