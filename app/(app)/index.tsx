import {View, ScrollView, ActivityIndicator, TouchableOpacity} from "react-native";
import {SafeAreaView, useThemeColor} from "@/components/Themed";
import React from "react";
import WeatherCard from "@/components/WeatherCard";
import NewsCard from "@/components/NewsCard";
import {RegularText, SemiBoldText} from "@/components/StyledText";
import ForecastCard from "@/components/ForecastCard";
import {useRouter} from "expo-router";
import {useLocation} from "@/context/LocationContext";
import auth from "@react-native-firebase/auth";
import {LinearGradient} from "expo-linear-gradient";
import {Feather, FontAwesome6} from "@expo/vector-icons";
import {useNews} from "@/context/NewsContext";

const DashboardScreen = () => {

    const router = useRouter();
    const {weatherData, currentLocationData, location} = useLocation();
    const {weatherNews} = useNews();
    const bgColor = useThemeColor({}, 'cardColor');
    const color = useThemeColor({}, 'text');
    const user = auth().currentUser;

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
                <View className=''>
                    <SemiBoldText className='text-2xl mt-6 mb-3'>Forecast</SemiBoldText>
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
                <View className=''>
                    <TouchableOpacity className='flex-row justify-between pr-4 mt-6 mb-3' onPress={() => router.push('/news')}>
                        <SemiBoldText className='text-2xl'>News</SemiBoldText>
                        <FontAwesome6 name="arrow-right" size={24} color={color} />
                    </TouchableOpacity>

                    {weatherNews.length !== 0 ?
                        <NewsCard data={weatherNews[0]}/>

                        :

                        ''
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DashboardScreen;
