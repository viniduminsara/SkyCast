import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from 'react-native';
import {
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold
} from "@expo-google-fonts/poppins";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {LocationProvider} from "@/context/LocationContext";
import {NewsProvider} from "@/context/NewsContext";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'Poppins-ExtraLight': Poppins_200ExtraLight,
        'Poppins-Regular': Poppins_400Regular,
        'Poppins-SemiBold': Poppins_600SemiBold,
        'Poppins-Bold': Poppins_700Bold,
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav/>;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();


    return (
        <SafeAreaProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <LocationProvider>
                    <NewsProvider>
                        <Stack screenOptions={{animation: 'ios', headerShown: false}}>
                            <Stack.Screen name="index"/>
                            <Stack.Screen name="permission"/>
                            <Stack.Screen name="(auth)"/>
                            <Stack.Screen name="(app)"/>
                        </Stack>
                    </NewsProvider>
                </LocationProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
