import {View, ScrollView, Alert, ActivityIndicator} from "react-native";
import {SafeAreaView, useThemeColor} from "@/components/Themed";
import React, {useEffect, useState} from "react";
import WeatherCard from "@/components/WeatherCard";
import NewsCard from "@/components/NewsCard";
import {RegularText, SemiBoldText} from "@/components/StyledText";
import ForecastCard from "@/components/ForecastCard";
import {useRouter} from "expo-router";
import {useLocation} from "@/context/LocationContext";
import auth from "@react-native-firebase/auth";
import {LinearGradient} from "expo-linear-gradient";
import {Feather} from "@expo/vector-icons";
import {fetchNewsData} from "@/api/news";

const DashboardScreen = () => {

    const router = useRouter();
    const {weatherData, currentLocationData, location} = useLocation();
    const [news, setNews] = useState<NewsArticle[]>([]);
    const bgColor = useThemeColor({}, 'cardColor');
    const user = auth().currentUser;

    useEffect(() => {
        fetchNewsData()
            .then((data) => {
                if (data.results) {
                    // console.log('news : ', data.results)
                    setNews(data.results)
                }
            })
    }, []);

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
                <SemiBoldText className='text-4xl'>Hi There {user?.displayName?.split(' ')[0]}</SemiBoldText>
                <RegularText className='text-xl mb-4'>{getGreeting()}</RegularText>
                <View className='h-auto'>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
                        {location ?
                            currentLocationData ?
                            <WeatherCard
                                data={{location: currentLocationData.location, current: currentLocationData.current}}
                                handler={() =>
                                    router.push({
                                        pathname: `locations/${currentLocationData.location.name}`,
                                        params: {
                                            location: currentLocationData.location.name,
                                            country: currentLocationData.location.country
                                        }
                                    })}
                                currentLocation={true}
                            />

                            :

                            <LinearGradient
                                colors={['#3C6FD1', '#7CA9FF']} start={{ x: 0.3, y: 0.2 }}
                                className='w-80 h-48 px-4 py-4 rounded-2xl flex justify-center items-center mr-4'
                            >
                                <ActivityIndicator color='white' size='large'/>
                            </LinearGradient>

                            : ''
                        }
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
                    {location ?
                        currentLocationData ?
                        <ForecastCard data={currentLocationData}/>
                        :
                        <RegularText>Loading...</RegularText>

                        :

                        <View className="w-full h-28 p-4 flex justify-center items-center rounded-2xl shadow-md" style={{backgroundColor: bgColor}}>
                            <View className='flex-row items-center gap-x-2'>
                                <Feather name="info" size={24} color="orange"/>
                                <RegularText>Please enable location permission</RegularText>
                            </View>
                        </View>
                    }
                </View>
                <View className='mt-6'>
                    <SemiBoldText className='text-2xl mb-4'>News</SemiBoldText>
                    {news.map((value, index) => {
                        console.log(value)
                        return (
                            <NewsCard data={value} key={index}/>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DashboardScreen;
