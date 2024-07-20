import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import {weatherIcons} from "@/constants/WeatherIcons";
import {useThemeColor} from "@/components/Themed";
import {LightText, RegularText, SemiBoldText} from "@/components/StyledText";

interface HourlyData {
    time: string;
    icon: any;
    temperature: number;
}

interface ForecastCardProps{
    data: HourlyData[];
}

const ForecastCard = (props: ForecastCardProps) => {
    const bgColor = useThemeColor({}, 'cardColor');

    return (
        <View className="w-full p-4 rounded-2xl shadow-md" style={{backgroundColor: bgColor}}>
            <View className="flex flex-row justify-between items-center">
                <View>
                    <LightText>Partly Cloudy</LightText>
                    <SemiBoldText className="text-xl">July, 17th 2024</SemiBoldText>
                </View>
                <MaterialCommunityIcons name="dots-horizontal" size={24} color="gray" />
            </View>
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} className="mt-4">
                {props.data.map((hour, index) => (
                    <View key={index} className="flex items-center mr-4">
                        <RegularText>{hour.time}</RegularText>
                        <Image source={weatherIcons[hour.icon]} className="w-12 h-12 my-2" />
                        <SemiBoldText className="text-lg">{hour.temperature}°C</SemiBoldText>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ForecastCard;
