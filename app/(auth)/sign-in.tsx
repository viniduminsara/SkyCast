import {SafeAreaView, Text} from "@/components/Themed";
import {BoldText, LightText, RegularText, SemiBoldText} from "@/components/StyledText";
import {Image, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {Entypo, AntDesign} from "@expo/vector-icons";
import {useRouter} from "expo-router";

const SignInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const router = useRouter();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <SafeAreaView className='flex-1 justify-center items-center px-8'>
            <View className='flex justify-center items-center mb-10'>
                <Image source={require('../../assets/images/icon-new.png')} className='w-16 h-16 rounded-xl mb-8'/>
                <BoldText className='text-2xl mb-4'>Welcome Back</BoldText>
                <LightText className='text-lg text-center'>Let's sign your account to get started with skycast</LightText>
            </View>
            <View className='flex w-full gap-y-3 mb-8'>
                <View className='flex flex-row items-center justify-between w-full border border-primary px-4 py-2 rounded-xl'>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#7CA9FF"
                        value={email}
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                        className='text-primary'
                    />
                </View>
                <View className='flex flex-row items-center justify-between w-full border border-primary px-4 py-2 rounded-xl'>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#7CA9FF"
                        value={password}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={showPassword}
                        onChangeText={(text) => setPassword(text)}
                        className='text-primary'
                    />
                    <TouchableOpacity onPress={togglePassword}>
                        {showPassword ? (
                            <Entypo name="eye" size={24} color="#7CA9FF" />
                        ) : (
                            <Entypo name="eye-with-line" size={24} color="#7CA9FF" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity className='flex w-full justify-center items-center py-3 bg-primary rounded-xl mb-8'>
                <SemiBoldText className='text-white'>Sign in</SemiBoldText>
            </TouchableOpacity>
            <LightText className='text-center mb-8'>Or continue with</LightText>
            <View className='flex flex-row w-full justify-center items-center gap-x-8'>
                <Entypo name="facebook" size={36} color="#7CA9FF" />
                <AntDesign name="google" size={36} color="#7CA9FF" />
                <AntDesign name="instagram" size={36} color="#7CA9FF" />
            </View>
            <View className='absolute bottom-8'>
                <View className='flex w-full flex-row justify-between items-center'>
                    <RegularText>Didn't have an account?</RegularText>
                    <TouchableOpacity onPress={() => router.push('/sign-up')}>
                        <SemiBoldText className='text-primary'>Sign up</SemiBoldText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignInScreen;
