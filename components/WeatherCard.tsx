import {LinearGradient} from "expo-linear-gradient";
import {Image, TouchableOpacity, View} from "react-native";
import {BoldText, LightText, RegularText, SemiBoldText} from "@/components/StyledText";
import {weatherIcons} from "@/constants/weatherIcons";
import {Feather, MaterialCommunityIcons} from "@expo/vector-icons";
import {useRouter} from "expo-router";

interface WeatherCardProps {
    data: WeatherData;
    handler: () => void;
}

const WeatherCard = (props: WeatherCardProps) => {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: 'details/1',
            params: { name: props.data.location.name, country: props.data.location.country }
        });
    };

    return (
        <TouchableOpacity className='mr-4' onPress={props.handler}>
            <LinearGradient colors={['#3C6FD1', '#7CA9FF']} start={{ x: 0.3, y: 0.2 }} className='w-80 h-fit px-4 py-4 rounded-2xl'>
                <View className='flex flex-row justify-between items-center'>
                    <View>
                        <LightText className='text-md text-white'>Chance of rain {props.data.current.cloud}%</LightText>
                        <SemiBoldText className='text-2xl text-white'>{props.data.current.condition.text}</SemiBoldText>
                    </View>
                    <Image source={weatherIcons[props.data.current.condition.text]} className='w-24 h-24'/>
                </View>
                <View className='flex flex-row items-center gap-x-2'>
                    <MaterialCommunityIcons name="map-marker" size={24} color="white"/>
                    <RegularText className='text-lg text-white'>{props.data.location.name}, {props.data.location.country}</RegularText>
                </View>
                <View className='mt-4 flex flex-row justify-between items-center'>
                    <View className='flex flex-row items-start gap-x-1'>
                        <BoldText className='text-4xl text-white'>{props.data.current.temp_c.toFixed(0)}</BoldText>
                        <LightText className='text-lg text-white'>°C</LightText>
                    </View>
                    <View className='flex flex-row items-end gap-x-1'>
                        <Feather name="cloud-drizzle" size={24} color="white" />
                        <LightText className='text-lg text-white'>{props.data.current.humidity}%</LightText>
                    </View>
                    <View className='flex flex-row items-end gap-x-1'>
                        <Feather name="sun" size={24} color="white" />
                        <LightText className='text-lg text-white'>{props.data.current.uv}</LightText>
                    </View>
                    <View className='flex flex-row items-end gap-x-1'>
                        <Feather name="wind" size={24} color="white" />
                        <LightText className='text-lg text-white'>{props.data.current.wind_kph} kp/h</LightText>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default WeatherCard;
