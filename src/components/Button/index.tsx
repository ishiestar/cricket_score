import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

interface IButtonProps {
  title: string;
  onPress: () => void;
}

const Button: FC<IButtonProps> = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.btnTxt}>{title}</Text>
  </TouchableOpacity>
);

export default Button;
