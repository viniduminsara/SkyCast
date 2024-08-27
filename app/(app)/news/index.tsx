import {FlatList, NativeModules, Platform} from "react-native";
import {SemiBoldText} from "@/components/StyledText";
import CustomHeader from "@/components/CustomHeader";
import React from "react";
import {useNews} from "@/context/NewsContext";
import NewsCard from "@/components/NewsCard";
import {SafeAreaView} from "@/components/Themed";
const {StatusBarManager} = NativeModules;

const NewsScreen = () => {
    const {weatherNews} = useNews();

    return (
        <SafeAreaView className='w-full h-full' style={{paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,}}>
            <CustomHeader title='News'/>
            <FlatList
                data={weatherNews}
                renderItem={({ item }) => (
                    <NewsCard data={item} />
                )}
                className='px-4'
            />
        </SafeAreaView>
    )
}

export default NewsScreen;
