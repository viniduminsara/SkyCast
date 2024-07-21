import {TouchableOpacity, View} from "react-native";
import {FontAwesome6, Octicons} from "@expo/vector-icons";
import {RegularText} from "@/components/StyledText";
import React from "react";
import {useThemeColor} from "@/components/Themed";

type OcticonNames = keyof typeof Octicons.glyphMap;

interface SettingsItemProps {
    title: string;
    iconName: OcticonNames;
}

const SettingsItem = (props: SettingsItemProps) => {
    const color = useThemeColor({}, 'text');

    return (
        <TouchableOpacity className='flex-row justify-between items-center py-4'>
            <View className='flex-row items-center gap-x-4'>
                <Octicons name={props.iconName} size={20} color={color}/>
                <RegularText className='text-lg'>{props.title}</RegularText>
            </View>
            <FontAwesome6 name='chevron-right' size={24} color={color} />
        </TouchableOpacity>
    )
}

export default SettingsItem;
