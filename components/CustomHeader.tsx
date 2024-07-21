import {TouchableOpacity, View} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import {SemiBoldText} from "@/components/StyledText";
import React from "react";
import {useRouter} from "expo-router";
import {useThemeColor} from "@/components/Themed";

interface CustomHeaderProps {
    title: string;
}

const CustomHeader = (props: CustomHeaderProps) => {
    const router = useRouter();
    const color = useThemeColor({}, 'text');

    return (
        <View className='flex flex-row justify-between items-center py-6 px-8'>
            <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="chevron-left" size={24} color={color}/>
            </TouchableOpacity>
            <SemiBoldText className='text-lg'>{props.title}</SemiBoldText>
            <View/>
        </View>
    )
}

export default CustomHeader;
