import {RegularText} from "@/components/StyledText";
import SwitchSelector, {Option} from "react-native-switch-selector";
import {View} from "react-native";
import React from "react";
import {useThemeColor} from "@/components/Themed";

interface ToggleInputProps {
    title: string;
    options: Option[];
    changeHandler: (value: string | number) => void;
}


const ToggleInput = (props: ToggleInputProps) => {
    const color = useThemeColor({}, 'background');

    return (
        <View className='flex-row justify-between items-center mb-4'>
            <RegularText className='text-lg'>{props.title}</RegularText>
            <SwitchSelector
                initial={0}
                onPress={props.changeHandler}
                textColor="#6B7280"
                selectedColor="#FFFFFF"
                buttonColor="#7CA9FF"
                borderColor={color}
                backgroundColor={color}
                hasPadding
                options={props.options}
                style={{ width: 120}}
            />
        </View>
    )
}

export default ToggleInput;
