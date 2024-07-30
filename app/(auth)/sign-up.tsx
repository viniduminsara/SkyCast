import {SafeAreaView, Text} from "@/components/Themed";
import {useState} from "react";
import {Alert, Image, TextInput, TouchableOpacity, View} from "react-native";
import {BoldText, LightText, RegularText, SemiBoldText} from "@/components/StyledText";
import {AntDesign, Entypo} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import StyledTextInput from "@/components/StyledTextInput";
import PasswordInput from "@/components/PasswordInput";
import auth from '@react-native-firebase/auth';

const SignupScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();

    const handleSignUp = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('User account created & signed in!');

                userCredential.user.updateProfile({ displayName: name })
                    .then(() => {
                        router.replace('/(app)')
                    })
            })
            .then(() => {
                console.log('User profile updated with display name!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('Email Already in Use', 'This email address is already in use!');
                    return;
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Invalid Email', 'This email address is invalid!');
                    return;
                }

                if (error.code === 'auth/weak-password') {
                    Alert.alert('Weak Password', 'Password should be at least 6 characters.');
                    return;
                }

                console.error(error);
            });
    }

    return (
        <SafeAreaView className='flex-1 justify-center items-center px-8'>
            <View className='flex justify-center items-center mb-10'>
                <Image source={require('../../assets/images/icon-new.png')} className='w-16 h-16 rounded-xl mb-8'/>
                <BoldText className='text-2xl mb-4'>Welcome to Skycast</BoldText>
                <LightText className='text-lg text-center'>Let's create new account to get started with skycast</LightText>
            </View>
            <View className='flex w-full mb-8'>
                <StyledTextInput placeholder='Name' value={name} changeHandler={(text) => setName(text)}/>
                <StyledTextInput placeholder='Email' value={email} changeHandler={(text) => setEmail(text)}/>
                <PasswordInput value={password} changeHandler={(text) => setPassword(text)}/>
            </View>
            <TouchableOpacity className='flex w-full justify-center items-center py-3 bg-primary rounded-xl mb-8' onPress={handleSignUp}>
                <SemiBoldText className='text-white'>Sign up</SemiBoldText>
            </TouchableOpacity>
            <LightText className='text-center mb-8'>Or continue with</LightText>
            <View className='flex flex-row w-full justify-center items-center gap-x-8'>
                <Entypo name="facebook" size={36} color="#7CA9FF" />
                <AntDesign name="google" size={36} color="#7CA9FF" />
                <AntDesign name="instagram" size={36} color="#7CA9FF" />
            </View>
            <View className='absolute bottom-8'>
                <View className='flex w-full flex-row justify-between items-center'>
                    <RegularText>Already have an account?</RegularText>
                    <TouchableOpacity onPress={() => router.replace('/sign-in')}>
                        <SemiBoldText className='text-primary'>Sign in</SemiBoldText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignupScreen;
