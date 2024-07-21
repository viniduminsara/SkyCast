import {SafeAreaView, useThemeColor} from "@/components/Themed";
import {
    FlatList,
    Image,
    NativeModules,
    Platform,
    ScrollView,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";
import {FontAwesome6, MaterialIcons} from "@expo/vector-icons";
import {LightText, SemiBoldText} from "@/components/StyledText";
import React, {useState} from "react";
import {useRouter} from "expo-router";
import LocationItem from "@/components/LocationItem";
import CustomHeader from "@/components/CustomHeader";
const {StatusBarManager} = NativeModules;

const ManageLocationScreen = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const color = useThemeColor({}, 'text');
    const bgColor = useThemeColor({}, 'cardColor');
    const [weatherData, setWeatherData] = useState<WeatherData[]>([
        {
            location: {
                name: "Kalutara",
                region: "Western",
                country: "Sri Lanka",
                lat: 6.58,
                lon: 79.96,
                tz_id: "Asia/Colombo",
                localtime_epoch: 1721197141,
                localtime: "2024-07-17 11:49"
            },
            current: {
                last_updated_epoch: 1721196900,
                last_updated: "2024-07-17 11:45",
                temp_c: 32.3,
                temp_f: 90.1,
                is_day: 1,
                condition: {
                    text: "Partly cloudy",
                    icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
                    code: 1003
                },
                wind_mph: 2.2,
                wind_kph: 3.6,
                wind_degree: 266,
                wind_dir: "W",
                pressure_mb: 1010.0,
                pressure_in: 29.82,
                precip_mm: 1.16,
                precip_in: 0.05,
                humidity: 71,
                cloud: 50,
                feelslike_c: 46.0,
                feelslike_f: 114.8,
                windchill_c: 26.7,
                windchill_f: 80.1,
                heatindex_c: 30.3,
                heatindex_f: 86.5,
                dewpoint_c: 23.9,
                dewpoint_f: 74.9,
                vis_km: 10.0,
                vis_miles: 6.0,
                uv: 6.0,
                gust_mph: 18.3,
                gust_kph: 29.4
            }
        }
    ]);

    return (
        <SafeAreaView className='w-full h-full' style={{paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,}}>
            <CustomHeader title='Manage Locations'/>
            <FlatList
                data={weatherData}
                renderItem={({ item }) => <LocationItem current={item.current} location={item.location}/>}
                className='px-5'
            />
            <TouchableOpacity className='absolute bottom-6 right-6 flex-row items-center px-4 py-3 rounded-2xl' style={{backgroundColor: bgColor}}>
                <MaterialIcons name="edit" size={24} color={color} />
                <SemiBoldText className='text-lg ml-2'>Edit</SemiBoldText>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ManageLocationScreen;
