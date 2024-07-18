import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { LightText, RegularText, SemiBoldText } from '@/components/StyledText';
import {useThemeColor} from "@/components/Themed";

interface NewsCardProps {
    data: NewsArticle
}

const NewsCard = (props: NewsCardProps) => {
    const color = useThemeColor({}, 'cardColor');

    return (
        <View className="w-full rounded-2xl mb-8" style={{backgroundColor: color}}>
            <Image
                source={{ uri: props.data.image_url }}
                className='w-full h-40 rounded-t-2xl'
                resizeMode='cover'
            />
            <View className="p-4">
                <SemiBoldText className='text-xl'>{props.data.title}</SemiBoldText>
                <View className='flex flex-row w-full justify-between items-end'>
                    <RegularText className="text-gray-500 mt-2">
                        {props.data.published_at ? props.data.published_at.split('T')[0] : ''}
                    </RegularText>
                    <LightText className="text-gray-500">{props.data.source}</LightText>
                </View>
            </View>
        </View>
    );
};

export default NewsCard;
