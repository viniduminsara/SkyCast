import {Drawer} from "expo-router/drawer";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Feather, FontAwesome6, Ionicons} from "@expo/vector-icons";
import {TouchableOpacity, View} from "react-native";
import {SafeAreaView, useThemeColor} from "@/components/Themed";
import CustomDrawerContent from "@/components/CustomDrawer";

const AppLayout = () => {
    const iconColor = useThemeColor({}, 'text');

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={({ navigation }) => ({
                    header: () => (
                        <SafeAreaView className='flex flex-row w-full justify-between items-center pt-10 px-6'>
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
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Home',
                        title: 'overview',
                    }}
                />
                <Drawer.Screen
                    name="settings"
                    options={{
                        drawerLabel: 'Settings',
                        title: 'overview',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    )
}

export default AppLayout;
