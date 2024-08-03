import React, { memo } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { Image, TouchableOpacity, View } from "react-native";
import { BoldText, LightText, RegularText, SemiBoldText } from "@/components/StyledText";
import { weatherIcons } from "@/constants/WeatherIcons";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

interface WeatherCardProps {
    data: WeatherData;
    handler: () => void;
    currentLocation?: boolean;
}

const WeatherCard = ({ data, handler, currentLocation }: WeatherCardProps) => {
    const iconSource = weatherIcons[data.current.condition.text];

    return (
        <TouchableOpacity className='mr-4' onPress={handler}>
            <LinearGradient colors={['#3C6FD1', '#7CA9FF']} start={{ x: 0.3, y: 0.2 }} className='w-80 h-fit px-4 py-4 rounded-2xl'>
                <View className='flex flex-row justify-between items-center'>
                    <View>
                        <LightText className='text-md text-white'>Chance of rain {data.current.cloud}%</LightText>
                        <SemiBoldText className='text-2xl text-white'>{data.current.condition.text}</SemiBoldText>
                    </View>
                    <Image source={iconSource} className='w-24 h-24' />
                </View>
                <View className='flex flex-row items-center gap-x-2'>
                    <MaterialCommunityIcons name="map-marker" size={24} color="white" />
                    <RegularText className='text-lg text-white'>
                        {!currentLocation ?
                            `${data.location.name}, ${data.location.country.length > 12 ? `${data.location.country.slice(0, 12)} ...` : data.location.country}` : 'Current Location'}
                    </RegularText>
                </View>
                <View className='mt-4 flex flex-row justify-between items-center'>
                    <View className='flex flex-row items-start gap-x-1'>
                        <BoldText className='text-4xl text-white'>{data.current.temp_c.toFixed(0)}</BoldText>
                        <LightText className='text-lg text-white'>°C</LightText>
                    </View>
                    <View className='flex flex-row items-end gap-x-1'>
                        <Feather name="cloud-drizzle" size={24} color="white" />
                        <LightText className='text-lg text-white'>{data.current.humidity}%</LightText>
                    </View>
                    <View className='flex flex-row items-end gap-x-1'>
                        <Feather name="sun" size={24} color="white" />
                        <LightText className='text-lg text-white'>{data.current.uv}</LightText>
                    </View>
                    <View className='flex flex-row items-end gap-x-1'>
                        <Feather name="wind" size={24} color="white" />
                        <LightText className='text-lg text-white'>{data.current.wind_kph} kp/h</LightText>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

export default memo(WeatherCard);
