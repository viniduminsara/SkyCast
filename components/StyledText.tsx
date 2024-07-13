import { Text, TextProps } from './Themed';

export function PoppinsText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins-Regular' }]} />;
}
