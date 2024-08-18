import {Image, TouchableOpacity, View} from "react-native";
import {weatherIcons} from "@/constants/WeatherIcons";
import {LightText, SemiBoldText} from "@/components/StyledText";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";

interface LocationItemProps {
    data: WeatherData;
    handler: () => void;
}

const LocationItem = ({data, handler}: LocationItemProps) => {

    return (
        <LinearGradient
            colors={['#3C6FD1', '#7CA9FF']}
            start={{ x: 0.3, y: 0.4 }}
            className='w-full rounded-3xl p-2 flex-row justify-between items-center mb-3'
        >
            <View className='flex-row items-center gap-x-2'>
                <Image source={weatherIcons[data.current.condition.text]} className='w-20 h-20'/>
                <View>
                    <SemiBoldText className='text-white'>
                        {data.location.name}, {data.location.country.length > 12 ?
                            `${data.location.country.slice(0, 12)} ...` : data.location.country}
                    </SemiBoldText>
                    <LightText className='text-2xl text-white'>{data.current.condition.text}</LightText>
                </View>
            </View>
            <TouchableOpacity className='mr-4' onPress={handler}>
                <Ionicons name="trash-sharp" size={28} color="white" />
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default LocationItem
