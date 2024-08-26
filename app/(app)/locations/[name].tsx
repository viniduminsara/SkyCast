import {ActivityIndicator, Alert, Image, NativeModules, Platform, ScrollView, TouchableOpacity, useColorScheme, View} from "react-native";
import {SafeAreaView, useThemeColor} from "@/components/Themed";
import {useLocalSearchParams, useRouter} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import {BoldText, LightText, RegularText, SemiBoldText} from "@/components/StyledText";
import {FontAwesome6, MaterialCommunityIcons} from "@expo/vector-icons";
import React, {useEffect, useRef, useState} from "react";
import {weatherIcons} from "@/constants/WeatherIcons";
import WeatherDetailsCard from "@/components/WeatherDetailsCard";
import {weatherTips} from "@/constants/WeatherTips";
import MapView, {Marker} from "react-native-maps";
import {darkMapStyle, lightMapStyle} from "@/constants/MapStyles";
import SwitchSelector from "react-native-switch-selector";
import {fetchHistoryLocationData, fetchWeatherData} from "@/api/weather";
import {PROVIDER_GOOGLE} from "react-native-maps"

const {StatusBarManager} = NativeModules;

const DetailScreen = () => {
    const {location, country} = useLocalSearchParams();
    const [weather, setWeather] = useState<ForecastData | undefined>(undefined);
    const [historyData, setHistoryData] = useState<ForecastData>();
    const [activeTypeData, setActiveTypeData] = useState<ForecastDay>();
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

    const handleActiveTypeChange = (value: string | number) => {
        if (value === 'today'){
            setActiveTypeData(weather?.forecast.forecastday[0]);
        }else if (value === 'tomorrow'){
            setActiveTypeData(weather?.forecast.forecastday[1]);
        }else if (value === 'yesterday'){
            setActiveTypeData(historyData?.forecast.forecastday[0]);
        }
    }

    useEffect(() => {
        fetchWeatherData(`${location},${country}`)
            .then((data) => {
                if (data !== null){
                    setWeather(data);
                    setActiveTypeData(data.forecast.forecastday[0]);
                }else {
                    Alert.alert('Something went wrong', 'Please check your internet connection');
                }
            });

        fetchHistoryLocationData(`${location},${country}`)
            .then((data) => {
                if (data !== null){
                    setHistoryData(data);
                    console.log('history: ', data.forecast.forecastday);
                }else {
                    Alert.alert('Something went wrong', 'Please check your internet connection');
                }
            });
    }, [location, country]);

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
    }, [weather, historyData, location, country]);

    return (
        <SafeAreaView className='w-full h-full'
                      style={{paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,}}>
            {weather && activeTypeData && historyData ?
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
                            <Image source={weatherIcons[weather.current.condition.text.trim()]} className='w-32 h-32'/>
                            <BoldText className='text-2xl mb-3 text-white'>{weather.current.condition.text}</BoldText>
                            <RegularText
                                className='text-xl mb-4 text-white'>{formatDate(weather.location.localtime)}</RegularText>
                            <LinearGradient
                                colors={['rgba(255,255,255,0.7)', 'rgba(255,255,255,1)']}
                                className='w-80 rounded-3xl px-6 py-4'
                                start={{x: 0.7, y: 0}}
                            >
                                <SwitchSelector
                                    initial={1}
                                    onPress={handleActiveTypeChange}
                                    textColor="#6B7280"
                                    selectedColor="#FFFFFF"
                                    buttonColor="#7CA9FF"
                                    borderColor='#ffffff00'
                                    backgroundColor='#ffffff00'
                                    hasPadding
                                    options={[
                                        {label: 'Yesterday', value: 'yesterday'},
                                        {label: 'Today', value: 'today'},
                                        {label: 'Tomorrow', value: 'tomorrow'},
                                    ]}
                                    style={{width: '100%',}}
                                    textStyle={{fontFamily: 'Poppins-Regular'}}
                                    selectedTextStyle={{fontFamily: 'Poppins-Regular'}}
                                />
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{flexGrow: 1}} className="mt-4">
                                    {activeTypeData?.hour.map((hour, index: number) => (
                                        <View key={index} className="flex items-center mr-4">
                                            <RegularText className='text-gray-500'>{hour.time.split(' ')[1]}</RegularText>
                                            <Image source={weatherIcons[hour.condition.text.trim()]} className="w-10 h-10 my-2"/>
                                            <SemiBoldText
                                                className="text-lg text-gray-500">{hour.temp_c.toFixed(0)}°C</SemiBoldText>
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
                                    {weatherTips[weather.current.condition.text.trim()]}
                                </RegularText>
                            </View>
                        </View>
                        <View className="w-full rounded-2xl my-4" style={{backgroundColor: bgColor}}>
                            <View className='rounded-t-2xl' style={{overflow: 'hidden'}}>
                                <MapView
                                    provider={PROVIDER_GOOGLE}
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

                :

                <View className='w-full h-full flex justify-center items-center'>
                    <ActivityIndicator size='large'/>
                </View>
            }
        </SafeAreaView>
    )
}

export default DetailScreen;
