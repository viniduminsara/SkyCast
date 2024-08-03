import {MaterialCommunityIcons} from "@expo/vector-icons";
import {RegularText, SemiBoldText} from "@/components/StyledText";
import {TouchableOpacity} from "react-native";
import React from "react";

interface DrawerItemProps {
    data: WeatherData;
    handler: () => void;
}

const DrawerItem = ({data, handler}: DrawerItemProps) => {
    return (
        <TouchableOpacity className='flex-row items-center my-3' onPress={handler}>
            <MaterialCommunityIcons name="map-marker" size={24} color="white"/>
            <RegularText className='ml-3 text-lg text-white'>{data.location.name}, {data.location.country}</RegularText>
        </TouchableOpacity>
    )
}

export default DrawerItem;
