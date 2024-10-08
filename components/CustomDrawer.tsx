import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {View, ScrollView, ScrollViewProps, TouchableOpacity} from 'react-native';
import {useRouter} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import {BoldText, RegularText, SemiBoldText} from "@/components/StyledText";
import DrawerItem from "@/components/DrawerItem";
import {useLocation} from "@/context/LocationContext";

const CustomDrawerContent = (props: React.JSX.IntrinsicAttributes & ScrollViewProps & { children: React.ReactNode; } & React.RefAttributes<ScrollView>) => {
    const router = useRouter();
    const {location, weatherData, currentLocationData} = useLocation();

    return (
            <LinearGradient colors={['#3C6FD1', '#7CA9FF']} style={{height: '100%', paddingVertical: 30, paddingHorizontal: 20}}>
                <DrawerContentScrollView {...props} style={{height: '100%'}} contentContainerStyle={{flexGrow:1}}>
                    <View style={{height: '100%', flex: 1, justifyContent: 'space-between'}}>
                        <View>
                            <RegularText style={{fontSize: 16, color: '#ffffff', opacity: 0.6}}>Current location</RegularText>
                            <BoldText style={{fontSize: 20, color: '#ffffff'}}>
                                {location ?
                                    `${currentLocationData?.location.name}, ${currentLocationData?.location.country}`
                                    :
                                    'Not Available'
                                }
                            </BoldText>
                            <View style={{marginTop: 30}}>
                                <RegularText style={{fontSize: 16, color: '#ffffff', opacity: 0.6, marginBottom: 10}}>Locations</RegularText>
                                {weatherData.map((data, index) => (
                                    <DrawerItem
                                        key={index}
                                        data={data}
                                        handler={() =>
                                            router.push({
                                                pathname: `locations/${data.location.name}`,
                                                params: {
                                                    location: data.location.name,
                                                    country: data.location.country
                                                }
                                            })}
                                    />
                                ))}
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => router.push('/(app)')}
                                style={{flex: 1, flexDirection: 'row', alignItems: 'center', width: 200, marginVertical: 10}}>
                                <Entypo name="home" color='white' size={24} />
                                <SemiBoldText style={{marginLeft: 10, fontSize: 16, color: '#ffffff'}}>Dashboard</SemiBoldText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.push('/locations/add')}
                                style={{flex: 1, flexDirection: 'row', alignItems: 'center', width: 200, marginVertical: 10}}>
                                <MaterialCommunityIcons name="map-marker-plus" size={24} color="white"/>
                                <SemiBoldText style={{marginLeft: 10, fontSize: 16, color: '#ffffff'}}>Add Location</SemiBoldText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.push('/locations/manage')}
                                style={{flex: 1, flexDirection: 'row', alignItems: 'center', width: 200, marginVertical: 10}}>
                                <MaterialIcons name="edit-location-alt" size={24} color="white" />
                                <SemiBoldText style={{marginLeft: 10, fontSize: 16, color: '#ffffff'}}>Manage Locations</SemiBoldText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.push('/settings')}
                                style={{flex: 1, flexDirection: 'row', alignItems: 'center', width: 200, marginVertical: 10}}>
                                <Ionicons name="settings-sharp" size={24} color="white" />
                                <SemiBoldText style={{marginLeft: 10, fontSize: 16, color: '#ffffff'}}>Settings</SemiBoldText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </DrawerContentScrollView>
            </LinearGradient>
    );
};

export default CustomDrawerContent;
