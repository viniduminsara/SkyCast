import {View} from "react-native";
import {Text} from "@/components/Themed";
import {useLocalSearchParams, useRouter} from "expo-router";

const DetailScreen = () => {
    const { name, weatherData } = useLocalSearchParams();
    const router = useRouter();

    let weather = null;

    if (typeof weatherData === 'string') {
        weather = JSON.parse(weatherData);
    }

    return (
        <View className='flex-1 justify-center items-center'>
            <Text>Details of user {name} </Text>
            <Text>{weather.location.name}</Text>
            <Text>{weather.current.temp_c} °C</Text>
        </View>
    )
}

export default DetailScreen;
