import {SafeAreaView, useThemeColor} from "@/components/Themed";
import {Keyboard, NativeModules, Platform, TextInput, TouchableOpacity, useColorScheme, View} from "react-native";
import {AntDesign, Entypo, FontAwesome6, MaterialCommunityIcons} from "@expo/vector-icons";
import {LightText, RegularText, SemiBoldText} from "@/components/StyledText";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useRouter} from "expo-router";
import MapView, {Marker} from "react-native-maps";
import {darkMapStyle, lightMapStyle} from "@/constants/MapStyles";
import {debounce} from "lodash";
import {fetchSearchData} from "@/api/weather";
import BottomSheet, {BottomSheetModal} from "@gorhom/bottom-sheet";
const {StatusBarManager} = NativeModules;

const AddLocationsScreen = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const color = useThemeColor({}, 'text');
    const bgColor = useThemeColor({}, 'cardColor');
    const [searchResults, setSearchResults] = useState<WeatherLocation[]>([]);
    const [searchedLocation, setSearchedLocation] = useState<WeatherLocation | undefined>(undefined);
    const handleTextDebounce = useCallback(debounce(handleSearchInput, 600), []);
    const mapRef = useRef<MapView>(null);
    const snapShots = useMemo(() => ['10%','22%'], []);
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (!searchedLocation) return;

        mapRef.current?.animateCamera({
            center:{
                longitude: searchedLocation.lon,
                latitude: searchedLocation.lat,
            },
            zoom: 3
        })
    }, [searchedLocation]);

    function handleLocationSelect(result: WeatherLocation) {
        setSearchedLocation(result);
        setSearchResults([]);
        Keyboard.dismiss();
        bottomSheetRef.current?.snapToIndex(1)
    }

    function handleSearchInput(value: string) {
        if (value.length > 2) {
            fetchSearchData(value)
                .then(data => setSearchResults(data))
        } else if (value.length === 0) {
            setSearchResults([]);
        }
    }

    return (
        <SafeAreaView className='w-full h-full'
                      style={{paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,}}>
            <View className='flex flex-row justify-between items-center py-6 px-8'>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome6 name="chevron-left" size={24} color={color}/>
                </TouchableOpacity>
                <SemiBoldText className='text-lg'>Add Locations</SemiBoldText>
                <MaterialCommunityIcons name="dots-horizontal" size={24} color={color}/>
            </View>
            <View className=''>
                <View className='flex flex-row justify-around items-center rounded-full shadow px-4 py-2 mx-4 mb-4'
                      style={{backgroundColor: bgColor}}>
                    <AntDesign name="search1" size={24} color="#A098AE" className='w-6 h-6'/>
                    <TextInput
                        placeholder="Search"
                        className='flex-1 pl-4 text-lg'
                        placeholderTextColor={color}
                        style={{color: color, fontFamily: 'Poppins-ExtraLight'}}
                        onChangeText={handleTextDebounce}
                    />
                </View>
                <View className='absolute w-full rounded-2xl top-16 z-10' style={{backgroundColor: bgColor}}>
                    {
                        searchResults.map((result, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    className={`flex-row items-center p-3 px-4 mb-1`}
                                    onPress={() => handleLocationSelect(result)}
                                >
                                    <MaterialCommunityIcons name="map-marker" size={24} color={color}/>
                                    <RegularText className='text-lg ml-3'>{result.name}, {result.country}</RegularText>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
                <MapView
                    ref={mapRef}
                    customMapStyle={colorScheme === 'dark' ? darkMapStyle : lightMapStyle}
                    className='w-full h-full'
                >
                    {searchedLocation && (
                        <Marker
                            coordinate={{
                                latitude: searchedLocation.lat,
                                longitude: searchedLocation.lon,
                            }}
                            title={`${searchedLocation.name}, ${searchedLocation.country}`}
                        />
                    )}
                </MapView>
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapShots}
                index={-1}
                enablePanDownToClose={true}
                backgroundStyle={{backgroundColor: bgColor}}
                handleIndicatorStyle={{backgroundColor: bgColor}}
            >
                <View className='px-6' style={{backgroundColor: bgColor}}>
                    <View className='flex-row justify-between items-center border-b-2 border-b-gray-400 pb-5'>
                        <View className='flex-row justify-center items-center gap-x-2'>
                            <MaterialCommunityIcons name="map-marker" size={30} color={color}/>
                            <View className='gap-y-1'>
                                <SemiBoldText className='text-xl'>{searchedLocation?.name}</SemiBoldText>
                                <LightText className='text-sm'>{searchedLocation?.region}, {searchedLocation?.country}</LightText>
                            </View>
                        </View>
                        <TouchableOpacity className='px-3 py-1.5 bg-primary rounded-xl flex-row items-center'>
                            <Entypo name="plus" size={24} color="white" />
                            <RegularText className='text-lg text-white'>Add</RegularText>
                        </TouchableOpacity>
                    </View>
                    <View className='py-4 gap-y-1.5'>
                        <LightText className='text-sm'>Longitude and latitude</LightText>
                        <SemiBoldText className='text-lg'>{searchedLocation?.lon}, {searchedLocation?.lat}</SemiBoldText>
                    </View>
                </View>
            </BottomSheet>
        </SafeAreaView>
    )
}

export default AddLocationsScreen;
