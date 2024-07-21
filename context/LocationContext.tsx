import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import * as Location from 'expo-location';
import {LocationObject} from "expo-location";
import {AppState, AppStateStatus} from "react-native";

interface LocationContextType {
    location: LocationObject | null;
}

interface LocationProviderProps {
    children: ReactNode;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
    const [location, setLocation] = useState<LocationObject | null>(null);

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocation(null);
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };

    useEffect(() => {
        getLocation();

        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            if (nextAppState === 'active') {
                getLocation();
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <LocationContext.Provider value={{ location }}>
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

