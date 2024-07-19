import {Image, NativeModules, Platform, ScrollView, TouchableOpacity, useColorScheme, View} from "react-native";
import {SafeAreaView, Text, useThemeColor} from "@/components/Themed";
import {useLocalSearchParams, useRouter} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import {BoldText, LightText, RegularText, SemiBoldText} from "@/components/StyledText";
import {FontAwesome6, MaterialCommunityIcons} from "@expo/vector-icons";
import React, {useEffect, useRef, useState} from "react";
import {weatherIcons} from "@/constants/weatherIcons";
import WeatherDetailsCard from "@/components/WeatherDetailsCard";
import {weatherTips} from "@/constants/WeatherTips";
import MapView, {Marker} from "react-native-maps";
import {darkMapStyle, lightMapStyle} from "@/constants/mapStyles";
const { StatusBarManager } = NativeModules;

const DetailScreen = () => {
    const {location, country} = useLocalSearchParams();
    const [activeButton, setActiveButton] = useState<string>('today');
    const [weather, setWeather] = useState<WeatherData>(
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
    );
    const router = useRouter();
    const mapRef = useRef<MapView>(null);
    const colorScheme = useColorScheme();
    const bgColor = useThemeColor({}, 'cardColor');

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const forecastData: any = [
        {time: '2 PM', icon: 'Overcast', temperature: 32},
        {time: '3 PM', icon: 'Heavy rain', temperature: 30},
        {time: '4 PM', icon: 'Moderate or heavy rain with thunder', temperature: 29},
        {time: '5 PM', icon: 'Light rain shower', temperature: 29},
        {time: '6 PM', icon: 'Sunny', temperature: 31},
    ];

    useEffect(() => {
        if (!weather) return;
        if (mapRef.current) {
            mapRef.current.animateCamera({
                center: {
                    longitude: weather.location.lon,
                    latitude: weather.location.lat,
                },
                zoom: 5,
            })
        }
    }, []);

    return (
        <SafeAreaView className='w-full h-full' style={{paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,}}>
            <ScrollView>
                <LinearGradient colors={['#3C6FD1', '#7CA9FF']} className='w-full h-[400px] rounded-b-[32px]'>
                    <View className='flex flex-row justify-between items-center py-6 px-8'>
                        <TouchableOpacity onPress={() => router.back()}>
                            <FontAwesome6 name="chevron-left" size={24} color="white"/>
                        </TouchableOpacity>
                        <SemiBoldText className='text-lg text-white'>{location}, {country}</SemiBoldText>
                        <MaterialCommunityIcons name="dots-horizontal" size={24} color="white"/>
                    </View>
                    <View className='flex justify-center items-center'>
                        <Image source={weatherIcons[weather.current.condition.text]} className='w-32 h-32'/>
                        <BoldText className='text-2xl mb-3 text-white'>{weather.current.condition.text}</BoldText>
                        <RegularText
                            className='text-xl mb-4 text-white'>{formatDate(weather.location.localtime)}</RegularText>
                        <LinearGradient
                            colors={['rgba(255,255,255,0.7)', 'rgba(255,255,255,1)']}
                            className='w-80 rounded-3xl px-6 py-4'
                            start={{x: 0.7, y: 0}}
                        >
                            <View className='flex flex-row justify-between'>
                                <TouchableOpacity
                                    className={activeButton === 'yesterday' ? 'bg-primary py-2 px-3 rounded-2xl' : 'py-2 px-3'}
                                    onPress={() => setActiveButton('yesterday')}
                                >
                                    <RegularText
                                        className={activeButton === 'yesterday' ? 'text-white' : 'text-black'}>Yesterday</RegularText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={activeButton === 'today' ? 'bg-primary py-2 px-3 rounded-2xl' : 'py-2 px-3'}
                                    onPress={() => setActiveButton('today')}
                                >
                                    <RegularText
                                        className={activeButton === 'today' ? 'text-white' : 'text-black'}>Today</RegularText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={activeButton === 'tomorrow' ? 'bg-primary py-2 px-3 rounded-2xl' : 'py-2 px-3'}
                                    onPress={() => setActiveButton('tomorrow')}
                                >
                                    <RegularText
                                        className={activeButton === 'tomorrow' ? 'text-white' : 'text-black'}>Tomorrow</RegularText>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{flexGrow: 1}} className="mt-4">
                                {forecastData.map((hour: any, index: number) => (
                                    <View key={index} className="flex items-center mr-4">
                                        <RegularText className='text-gray-500'>{hour.time}</RegularText>
                                        <Image source={weatherIcons[hour.icon]} className="w-10 h-10 my-2"/>
                                        <SemiBoldText
                                            className="text-lg text-gray-500">{hour.temperature}°C</SemiBoldText>
                                    </View>
                                ))}
                            </ScrollView>
                        </LinearGradient>
                    </View>
                </LinearGradient>
                <View className='px-6 mt-20'>
                    <View className='flex flex-row flex-wrap justify-center items-center'>
                        <WeatherDetailsCard imageSource={require('../../../assets/images/temperature.png')}
                                            label='Temperature' value={`${weather.current.temp_c}°C`}/>
                        <WeatherDetailsCard imageSource={require('../../../assets/images/wind.png')} label='Wind'
                                            value={`${weather.current.wind_mph} mp/h`}/>
                        <WeatherDetailsCard imageSource={require('../../../assets/images/uv.png')} label='UV Index'
                                            value={`${weather.current.uv.toFixed(1)}`}/>
                        <WeatherDetailsCard imageSource={require('../../../assets/images/humidity.png')}
                                            label='Humidity' value={`${weather.current.humidity}%`}/>
                    </View>
                    <View className='my-4'>
                        <SemiBoldText className='text-2xl mb-3'>Tips</SemiBoldText>
                        <View className='w-full flex flex-row justify-center items-center py-4 rounded-2xl'
                              style={{backgroundColor: bgColor}}>
                            <Image source={require('../../../assets/images/star.png')} className='w-8 h-8 mr-2'/>
                            <RegularText className='flex-1 flex-wrap text-left' style={{maxWidth: '80%'}}>
                                {weatherTips[weather.current.condition.text]}
                            </RegularText>
                        </View>
                    </View>
                    <View className="w-full rounded-2xl my-4" style={{backgroundColor: bgColor}}>
                        <View className='rounded-t-2xl' style={{overflow: 'hidden'}}>
                            <MapView
                                ref={mapRef}
                                className='w-full h-40'
                                customMapStyle={colorScheme === 'dark' ? darkMapStyle : lightMapStyle}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: weather.location.lat,
                                        longitude: weather.location.lon
                                    }}
                                    title={weather.location.name}
                                />
                            </MapView>
                        </View>
                        <View className="p-4">
                            <LightText>Location</LightText>
                            <SemiBoldText className='text-xl'>{location}, {country}</SemiBoldText>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailScreen;
