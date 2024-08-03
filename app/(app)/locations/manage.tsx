import {SafeAreaView, useThemeColor} from "@/components/Themed";
import {Alert, FlatList, NativeModules, Platform} from "react-native";
import React from "react";
import LocationItem from "@/components/LocationItem";
import CustomHeader from "@/components/CustomHeader";
import {useLocation} from "@/context/LocationContext";
const {StatusBarManager} = NativeModules;

const ManageLocationScreen = () => {
    const {weatherData, removeLocation} = useLocation();

    return (
        <SafeAreaView className='w-full h-full' style={{paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,}}>
            <CustomHeader title='Manage Locations'/>
            <FlatList
                data={weatherData}
                renderItem={({ item }) =>
                    <LocationItem
                        data={item}
                        handler={async () => {
                            Alert.alert(
                                'Remove Confirmation',
                                'Are you sure you want to remove?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Remove cancelled'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Remove',
                                        onPress: () => {
                                            removeLocation(`${item.location.name}, ${item.location.country}`)
                                        },
                                    },
                                ],
                                { cancelable: false }
                            );
                        }}
                    />}
                className='px-5'
            />
        </SafeAreaView>
    )
}

export default ManageLocationScreen;
