import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {View, Text, ScrollView, ScrollViewProps, TouchableOpacity} from 'react-native';
import {useThemeColor} from '@/components/Themed';
import {useRouter} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import {BoldText, RegularText, SemiBoldText} from "@/components/StyledText";

const CustomDrawerContent = (props) => {
    const iconColor = useThemeColor({}, 'text');
    const router = useRouter();

    return (
        <DrawerContentScrollView {...props}>
            <LinearGradient colors={['#3C6FD1', '#7CA9FF']} style={{paddingHorizontal: 20, paddingTop: 40}}>
                <View>
                    <RegularText style={{fontSize: 16}}>Current location</RegularText>
                    <BoldText style={{fontSize: 20}}>Berlin, Germany</BoldText>
                </View>
                <View style={{marginTop: 50}}>
                    <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center', width: 200, marginVertical: 10}}>
                        <MaterialCommunityIcons name="map-marker-plus" size={24} color="yellow"/>
                        <SemiBoldText style={{marginLeft: 15, fontSize: 16, color: 'yellow'}}>Add Location</SemiBoldText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center', width: 200, marginVertical: 10}}>
                        <MaterialCommunityIcons name="map-marker" size={24} color="white"/>
                        <SemiBoldText style={{marginLeft: 15, fontSize: 16}}>Colombo, Sri Lanka</SemiBoldText>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 447}}>
                    <DrawerItem
                        label="Settings"
                        onPress={() => router.push('/settings')}
                        icon={({ size }) => (
                            <Feather name="settings" color={iconColor} size={size} />
                        )}
                    />
                    <DrawerItem
                        label="Share this app"
                        onPress={() => {}}
                        icon={({ size }) => (
                            <Feather name="share-2" color={iconColor} size={size} />
                        )}
                    />
                    <DrawerItem
                        label="Rate this app"
                        onPress={() => {}}
                        icon={({ size }) => (
                            <Feather name="star" color={iconColor} size={size} />
                        )}
                    />
                </View>
            </LinearGradient>
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
