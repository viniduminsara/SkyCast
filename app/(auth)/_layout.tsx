import {Stack} from "expo-router";

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="sign-up" options={{ title: 'Sign up'}} />
            <Stack.Screen name="sign-in" options={{ title: 'Sign in'}} />
        </Stack>
    )
}

export default AuthLayout
