import {Drawer} from "expo-router/drawer";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Feather, FontAwesome6, Ionicons} from "@expo/vector-icons";
import {TouchableOpacity, View} from "react-native";
import {SafeAreaView, useThemeColor} from "@/components/Themed";
import CustomDrawerContent from "@/components/CustomDrawer";
import {useEffect, useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {useRouter} from "expo-router";

const AppLayout = () => {
    const iconColor = useThemeColor({}, 'text');
    const router = useRouter();

    auth().onAuthStateChanged((user) => {
        if (!user){
            router.replace('/(auth)/sign-in');
        }
    })

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(props) => <CustomDrawerContent children={undefined} {...props} />}
                screenOptions={({ navigation }) => ({
                    header: () => (
                        <SafeAreaView className='flex flex-row w-full justify-between items-center pt-10 pb-6 px-6'>
                            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                <Feather name="align-left" size={24} color={iconColor}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Feather name="search" size={24} color={iconColor}/>
                            </TouchableOpacity>
                        </SafeAreaView>
                    )
                })}
            >
                <Drawer.Screen name="index"/>
                <Drawer.Screen name="settings" options={{ headerShown: false, drawerStatusBarAnimation: 'fade' }}/>
                <Drawer.Screen name="locations/[name]" options={{ headerShown: false }}/>
                <Drawer.Screen name="locations/add" options={{ headerShown: false }}/>
                <Drawer.Screen name="locations/manage" options={{ headerShown: false }}/>
                <Drawer.Screen name="news/index" options={{ headerShown: false }}/>
            </Drawer>
        </GestureHandlerRootView>
    )
}

export default AppLayout;
