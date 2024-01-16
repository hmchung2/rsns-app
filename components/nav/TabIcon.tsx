import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface TabIconProps {
  iconName: 'link' | 'heart' | 'map' | 'person' | 'chatbox-ellipses';
  color: string;
  focused: boolean;
}

export default function TabIcon({iconName, color, focused}: TabIconProps) {
  return (
    <Icon
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={22}
    />
  );
}
