import { Text, TextProps } from './Themed';

export function LightText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins-ExtraLight' }]} />;
}

export function RegularText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins-Regular' }]} />;
}

export function SemiBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins-SemiBold' }]} />;
}

export function BoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins-Bold' }]} />;
}




