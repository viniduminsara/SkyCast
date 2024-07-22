import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {weatherIcons} from "@/constants/WeatherIcons";
import {useThemeColor} from "@/components/Themed";
import {LightText, RegularText, SemiBoldText} from "@/components/StyledText";

interface ForecastCardProps{
    data: ForecastData;
}

const ForecastCard = (props: ForecastCardProps) => {
    const bgColor = useThemeColor({}, 'cardColor');
    const {location, current, forecast} = props.data;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <View className="w-full p-4 rounded-2xl shadow-md" style={{backgroundColor: bgColor}}>
            <View className="flex flex-row justify-between items-center">
                <View>
                    <LightText>{current.condition.text}</LightText>
                    <SemiBoldText className="text-xl">{formatDate(location.localtime.split(' ')[0])}</SemiBoldText>
                </View>
                <MaterialCommunityIcons name="dots-horizontal" size={24} color="gray" />
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} className="mt-4">
                {forecast.forecastday[0].hour.map((day, index) => (
                    <View key={index} className="flex items-center mr-4">
                        <RegularText>{day.time.split(' ')[1]}</RegularText>
                        <Image source={weatherIcons[day.condition.text.trim()]} className="w-12 h-12 my-2" />
                        <SemiBoldText className="text-lg">{day.temp_c.toFixed(0)}°C</SemiBoldText>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ForecastCard;
