import {TextInput, View} from "react-native";

interface StyledTextInputProps {
    placeholder: string;
    value: string;
    changeHandler: (text: string) => void;
}

const StyledTextInput = (props: StyledTextInputProps) => {

    return (
        <View className='flex flex-row items-center justify-between w-full border border-primary px-4 py-2 rounded-xl mb-3'>
            <TextInput
                placeholder={props.placeholder}
                placeholderTextColor="#7CA9FF"
                value={props.value}
                autoCapitalize="none"
                onChangeText={props.changeHandler}
                className='text-primary'
            />
        </View>
    )
}

export default StyledTextInput;
