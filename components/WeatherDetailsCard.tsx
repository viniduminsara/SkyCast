import {Image, ImageSourcePropType, Text, View} from "react-native";
import React from "react";
import {LightText, SemiBoldText} from "@/components/StyledText";
import {useThemeColor} from "@/components/Themed";

interface DetailsCardProps {
    imageSource: ImageSourcePropType;
    value: string;
    label: string;
}

const WeatherDetailsCard = (props: DetailsCardProps) => {
    const bgColor = useThemeColor({}, 'cardColor');

    return (
        <View className='flex-row justify-around items-center w-40 px-2 py-6 rounded-3xl m-1' style={{backgroundColor: bgColor}}>
            <Image source={props.imageSource}/>
            <View>
                <SemiBoldText className='text-2xl'>{props.value}</SemiBoldText>
                <LightText className='text-lg'>{props.label}</LightText>
            </View>
        </View>
    )
}

export default WeatherDetailsCard;
