import {SafeAreaView, Text} from "@/components/Themed";
import {BoldText, LightText, RegularText, SemiBoldText} from "@/components/StyledText";
import {Alert, Image, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {Entypo, AntDesign} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import StyledTextInput from "@/components/StyledTextInput";
import PasswordInput from "@/components/PasswordInput";
import auth from "@react-native-firebase/auth";
import {GoogleSignin} from "@react-native-google-signin/google-signin";

const SignInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    GoogleSignin.configure({
        webClientId: '191231634753-uoq0oc0i32h8n6do7ped45qtur8mkpsc.apps.googleusercontent.com',
    });

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.signOut();

            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const { idToken } = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            auth().signInWithCredential(googleCredential)
                .then((userCredential) => {
                    console.log(userCredential.user);
                    router.replace('/(app)')
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignIn = () => {
        if (email && password) {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log('User signed in successfully!');

                    // You can access the signed-in user's information here
                    const user = userCredential.user;
                    console.log('User display name:', user.displayName);

                    router.replace('/(app)')
                })
                .catch(error => {
                    if (error.code === 'auth/user-not-found') {
                        Alert.alert('No user found with this email address!');
                        return;
                    }

                    if (error.code === 'auth/wrong-password') {
                        Alert.alert('Incorrect password!');
                        return;
                    }

                    if (error.code === 'auth/invalid-email') {
                        Alert.alert('That email address is invalid!');
                        return;
                    }

                    if (error.code === 'auth/invalid-credential') {
                        Alert.alert('Invalid credentials!', 'Please enter the correct email and password.');
                        return;
                    }

                    console.error(error);
                });
        }else {
            Alert.alert('Invalid Inputs', 'Please enter email and password correctly.')
        }
    };

    return (
        <SafeAreaView className='flex-1 justify-center items-center px-8'>
            <View className='flex justify-center items-center mb-10'>
                <Image source={require('../../assets/images/icon-new.png')} className='w-16 h-16 rounded-xl mb-8'/>
                <BoldText className='text-2xl mb-4'>Welcome Back</BoldText>
                <LightText className='text-lg text-center'>Let's sign your account to get started with skycast</LightText>
            </View>
            <View className='flex w-full gap-y-3 mb-8'>
                <StyledTextInput placeholder='Email' value={email} changeHandler={(text) => setEmail(text)}/>
                <PasswordInput value={password} changeHandler={(text) => setPassword(text)}/>
            </View>
            <TouchableOpacity className='flex w-full justify-center items-center py-3 bg-primary rounded-xl mb-8' onPress={handleSignIn}>
                <SemiBoldText className='text-white'>Sign in</SemiBoldText>
            </TouchableOpacity>
            <LightText className='text-center mb-8'>Or continue with</LightText>
            <View className='flex flex-row w-full justify-center items-center gap-x-8'>
                <TouchableOpacity onPress={handleGoogleSignIn}>
                    <AntDesign name="google" size={36} color="#7CA9FF" />
                </TouchableOpacity>
            </View>
            <View className='absolute bottom-8'>
                <View className='flex w-full flex-row justify-between items-center'>
                    <RegularText>Didn't have an account?</RegularText>
                    <TouchableOpacity onPress={() => router.replace('/sign-up')}>
                        <SemiBoldText className='text-primary'>Sign up</SemiBoldText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignInScreen;
