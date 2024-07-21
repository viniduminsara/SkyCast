declare module 'react-native-switch-selector' {
    import { Component } from 'react';
    import { ViewStyle, TextStyle } from 'react-native';

    export interface Option {
        label: string;
        value: string | number;
        customIcon?: JSX.Element;
        imageIcon?: any; // or the appropriate type for images
    }

    interface SwitchSelectorProps {
        initial?: number;
        onPress(value: string | number): void;
        textColor?: string;
        selectedColor?: string;
        buttonColor?: string;
        borderColor?: string;
        backgroundColor?: string;
        hasPadding?: boolean;
        valuePadding?: number;
        height?: number;
        borderRadius?: number;
        fontSize?: number;
        options: Option[];
        accessibilityLabel?: string;
        style?: ViewStyle;
        textStyle?: TextStyle;
        selectedTextStyle?: TextStyle;
        buttonMargin?: number;
        animationDuration?: number;
    }

    export default class SwitchSelector extends Component<SwitchSelectorProps> {}
}
