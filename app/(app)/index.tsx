import {View, ScrollView, Alert} from "react-native";
import {SafeAreaView} from "@/components/Themed";
import React, {useEffect, useState} from "react";
import WeatherCard from "@/components/WeatherCard";
import NewsCard from "@/components/NewsCard";
import {RegularText, SemiBoldText} from "@/components/StyledText";
import ForecastCard from "@/components/ForecastCard";
import {useRouter} from "expo-router";
import {useLocation} from "@/context/LocationContext";
import {fetchCurrentLocationData} from "@/api/weather";

const DashboardScreen = () => {

    const router = useRouter();
    const {location} = useLocation();
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [currentLocationData, setCurrentLocationData] = useState<ForecastData | undefined>(undefined);
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

    useEffect(() => {
        if (location) {
            fetchCurrentLocationData(location)
                .then((data) => {
                    if (data !== null){
                        console.log(data)
                        setWeatherData(
                            prevWeatherData => [...prevWeatherData, {location: data.location, current: data.current}]
                        );
                        setCurrentLocationData(data);
                    }else {
                        Alert.alert('Something went wrong', 'Please check your internet connection');
                    }
                })
        }
    }, []);

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
                                        pathname: `locations/${data.location.name}`,
                                        params: {
                                            location: data.location.name,
                                            country: data.location.country
                                        }
                                    })}
                            />
                        ))}
                    </ScrollView>
                </View>
                <View className='mt-6'>
                    <SemiBoldText className='text-2xl mb-4'>Forecast</SemiBoldText>
                    {currentLocationData ?
                        <ForecastCard data={currentLocationData}/>
                        :
                        <RegularText>Loading...</RegularText>
                    }
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
