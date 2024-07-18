import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native";
import {SafeAreaView} from "@/components/Themed";
import React, {useState} from "react";
import WeatherCard from "@/components/WeatherCard";
import NewsCard from "@/components/NewsCard";
import {RegularText, SemiBoldText} from "@/components/StyledText";
import ForecastCard from "@/components/ForecastCard";
import {useRouter} from "expo-router";

const DashboardScreen = () => {

    const router = useRouter();
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
        },
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
        },
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
    const [news, setNews] = useState<NewsArticle>(
        {
            uuid: "c6953fc5-455e-4a3a-9aa1-88bd7c74ecee",
            title: "Weather: Take precautions during inclement weather conditions",
            description: "South African Weather Service issued severe weather alerts, including severe thunderstorms, damaging and strong winds, and disruptive rains.",
            keywords: "",
            snippet: "Inclement weather conditions are expected in six provinces over the next two days. Photo: Pexels\n\nThe South African government has urged residents in various pr...",
            url: "https://www.thesouthafrican.com/news/weather-take-precautions-during-inclement-weather-conditions-29-december-2023/",
            image_url: "https://www.thesouthafrican.com/wp-content/uploads/2023/12/Untitled-design-2023-12-29T153959.273.jpg",
            language: "en",
            published_at: "2023-12-29T14:02:13.000000Z",
            source: "thesouthafrican.com",
            categories: [
                "general"
            ],
            relevance_score: 21.609299,
            locale: "za"
        }
    );

    const forecastData:any = [
        { time: '2 PM', icon: 'Overcast', temperature: 32 },
        { time: '3 PM', icon: 'Heavy rain', temperature: 30 },
        { time: '4 PM', icon: 'Moderate or heavy rain with thunder', temperature: 29 },
        { time: '5 PM', icon: 'Light rain shower', temperature: 29 },
        { time: '6 PM', icon: 'Sunny', temperature: 31 },
    ];

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Good Morning';
        } else if (currentHour < 18) {
            return 'Good Afternoon';
        } else if (currentHour < 21) {
            return 'Good Evening';
        } else {
            return 'Good Night';
        }
    };

    return (
        <SafeAreaView className='w-full h-full px-4'>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SemiBoldText className='text-4xl'>Hi There Vinidu</SemiBoldText>
                <RegularText className='text-xl mb-4'>{getGreeting()}</RegularText>
                <View className='h-auto'>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
                        {weatherData.map((data, index) => (
                            <WeatherCard
                                key={index}
                                data={data}
                                handler={() =>
                                    router.push({
                                        pathname: `details/${data.location.name}`,
                                        params: { weatherData: JSON.stringify(data) }
                                    })}
                            />
                        ))}
                    </ScrollView>
                </View>
                <View className='mt-6'>
                    <SemiBoldText className='text-2xl mb-4'>Forecast</SemiBoldText>
                    <ForecastCard data={forecastData}/>
                </View>
                <View className='mt-6'>
                    <SemiBoldText className='text-2xl mb-4'>News</SemiBoldText>
                    <NewsCard data={news}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DashboardScreen;
