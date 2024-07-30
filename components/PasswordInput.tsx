import {TextInput, TouchableOpacity, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import {useState} from "react";

interface PasswordInputProps {
    value: string;
    changeHandler: (text: string) => void;
}

const PasswordInput = (props: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(true);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View className='flex flex-row items-center justify-between w-full border border-primary px-4 py-2 rounded-xl'>
            <TextInput
                placeholder="Password"
                placeholderTextColor="#7CA9FF"
                value={props.value}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={showPassword}
                onChangeText={props.changeHandler}
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
    )
}

export default PasswordInput;
