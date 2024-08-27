import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { LightText, RegularText, SemiBoldText } from '@/components/StyledText';
import {useThemeColor} from "@/components/Themed";

interface NewsCardProps {
    data: NewsArticle
}

const NewsCard = (props: NewsCardProps) => {
    const color = useThemeColor({}, 'cardColor');

    console.log(props.data)

    return (
        <View className="w-full rounded-2xl mb-8" style={{backgroundColor: color}}>
            <Image
                source={{ uri: props.data.image_url !== null ? props.data.image_url : 'https://picsum.photos/seed/picsum/200/300' }}
                className='w-full h-40 rounded-t-2xl'
                resizeMode='cover'
            />
            <View className="p-4">
                <SemiBoldText className='text-xl'>{props.data.title !== null ? props.data.title : '-'}</SemiBoldText>
                <View className='flex flex-row w-full justify-between items-end'>
                    <RegularText className="text-gray-500 mt-2">
                        {props.data.pubDate ? props.data.pubDate.split('T')[0] : ''}
                    </RegularText>
                    <LightText className="text-gray-500">{props.data.source_name}</LightText>
                </View>
            </View>
        </View>
    );
};

export default NewsCard;
