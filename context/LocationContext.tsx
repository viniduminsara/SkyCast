import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import * as Location from 'expo-location';
import {LocationObject} from "expo-location";
import {Alert} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {fetchCurrentLocationData, fetchLocationWeatherData} from "@/api/weather";
import {useRouter} from "expo-router";

interface LocationContextType {
    location: LocationObject | null;
    updateLocation: (location: LocationObject | null) => void,
    updateUser: (user: FirebaseAuthTypes.User) => void;
    userLocations: string[];
    currentLocationData: ForecastData | undefined;
    weatherData: WeatherData[];
    addLocation: (newLocation: string) => void;
    removeLocation: (location: string) => void;
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
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(auth().currentUser);
    const router = useRouter();

    const getUserLocations = async () => {
        const locationSnapshot = await firestore()
            .collection("users")
            .where("userId", "==", user?.uid)
            .limit(1)
            .get();

        setUserLocations([...locationSnapshot.docs[0].data().locations]);
        console.log('user locations: ',locationSnapshot.docs[0].data().locations);
    }

    useEffect(() => {
        const getLocation = async () => {
            try {
                const { status } = await Location.getForegroundPermissionsAsync();

                if (status === 'granted') {
                    const location = await Location.getCurrentPositionAsync({});
                    setLocation(location);

                    if (user) {
                        router.replace('/(app)');
                    } else {
                        router.replace('/(auth)/sign-in');
                    }
                } else if (status === 'denied' || status === 'undetermined') {
                    router.replace('/permission');
                }
            } catch (e) {
                router.replace('/permission');
            }
        };
        getLocation();
    }, []);

    useEffect(() => {
        getUserLocations()
            .then(() => console.log('User locations fetched.'))
            .catch((error) => console.log('Error fetching user locations:', error));
    }, [user]);

    useEffect(() => {
        if (location) {
            fetchCurrentLocationData(location)
                .then((data) => {
                    if (data !== null){
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

    const updateUser = (user: FirebaseAuthTypes.User) => {
        setUser(user);
    }

    const updateLocation = (location: LocationObject | null) => {
        setLocation(location);
    }

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
        <LocationContext.Provider value={{ location, updateLocation, updateUser, userLocations, weatherData, currentLocationData, addLocation, removeLocation }}>
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

