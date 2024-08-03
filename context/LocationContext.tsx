import React, {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import * as Location from 'expo-location';
import {LocationObject} from "expo-location";
import {Alert, AppState, AppStateStatus} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import {fetchCurrentLocationData, fetchLocationWeatherData} from "@/api/weather";

interface LocationContextType {
    location: LocationObject | null;
    userLocations: string[];
    currentLocationData: ForecastData | undefined;
    weatherData: WeatherData[];
    addLocation: (newLocation: string) => {};
    removeLocation: (location: string) => {};
}

interface LocationProviderProps {
    children: ReactNode;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [userLocations, setUserLocations] = useState<string[]>([]);
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [currentLocationData, setCurrentLocationData] = useState<ForecastData | undefined>(undefined);
    // const appState = useRef(AppState.currentState);
    // const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const user = auth().currentUser;

    // useEffect(() => {
    //     const subscription = AppState.addEventListener('change', async (nextAppState) => {
    //         try {
    //             if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
    //                 console.log('App has come to the foreground!');
    //                 let location = await Location.getCurrentPositionAsync({});
    //                 setLocation(location);
    //                 console.log(location)
    //             }
    //         }catch (e){
    //             console.log('Error when getting user location: ', e)
    //         }
    //
    //         appState.current = nextAppState;
    //         setAppStateVisible(appState.current);
    //     });
    //
    //     return () => {
    //         subscription.remove();
    //     };
    // }, []);

    const getUserLocations = async () => {
        const locationSnapshot = await firestore()
            .collection("users")
            .where("userId", "==", user?.uid)
            .limit(1)
            .get();

        setUserLocations(locationSnapshot.docs[0].data().locations);
        console.log('user locations: ',locationSnapshot.docs[0].data().locations);
    }

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation(null);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        };
        getLocation();
    }, []);

    useEffect(() => {
        getUserLocations();
    }, []);

    useEffect(() => {
        if (location) {
            fetchCurrentLocationData(location)
                .then((data) => {
                    if (data !== null){
                        console.log('current location weather data: ', data);
                        setCurrentLocationData(data);
                    }else {
                        Alert.alert('Something went wrong', 'Please check your internet connection');
                    }
                })
        }
    }, [location]);

    useEffect(() => {
        setWeatherData([]);
        userLocations.map(userLocation => {
            if (userLocation) {
                fetchLocationWeatherData(userLocation)
                    .then((data) => {
                        if (data !== null){
                            console.log('user locations data: ', data);
                            setWeatherData(
                                prevWeatherData => [...prevWeatherData, data]
                            );
                        }else {
                            Alert.alert('Something went wrong', 'Please check your internet connection');
                        }
                    })
            }
        })
    }, [userLocations]);

    const addLocation = async (newLocation: string) => {
        try {
            const userQuerySnapshot = await firestore()
                .collection('users')
                .where('userId', '==', user?.uid)
                .get();

            if (!userQuerySnapshot.empty) {
                const userDoc = userQuerySnapshot.docs[0];
                const userDocId = userDoc.id;

                await firestore()
                    .collection('users')
                    .doc(userDocId)
                    .update({
                        locations: firestore.FieldValue.arrayUnion(newLocation),
                    });

                await getUserLocations();
                Alert.alert('Location added successfully!');
            } else {
                console.error('No user found with the given userId');
            }
        } catch (error) {
            console.error('Error adding location: ', error);
        }
    }

    const removeLocation = async (location: string) => {
        try {
            const userQuerySnapshot = await firestore()
                .collection('users')
                .where('userId', '==', user?.uid)
                .get();

            if (!userQuerySnapshot.empty) {
                const userDoc = userQuerySnapshot.docs[0];
                const userDocId = userDoc.id;

                await firestore()
                    .collection('users')
                    .doc(userDocId)
                    .update({
                        locations: firestore.FieldValue.arrayRemove(location),
                    });

                await getUserLocations();
                Alert.alert('Location removed successfully!');
            } else {
                console.error('No user found with the given userId');
            }
        } catch (error) {
            console.error('Error removing location: ', error);
        }
    }



    return (
        <LocationContext.Provider value={{ location, userLocations, weatherData, currentLocationData, addLocation, removeLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};

