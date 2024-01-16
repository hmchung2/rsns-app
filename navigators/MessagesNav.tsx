import React from 'react';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Rooms from '../screens/Rooms';
import EachRoom from '../screens/EachRoom';
import {createStackNavigator} from '@react-navigation/stack';
// import { Ionicons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from "../styles/colors.ts";
import {useTheme} from 'styled-components';
import { RootStackParamList } from "../shared/shared.types";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
const NativeStack = createStackNavigator();

type MessagesNavProps = NativeStackScreenProps<
  RootStackParamList,
  'MessagesNav'
>;


export default function MessagesNav({navigation}: MessagesNavProps) {
  const theme = useTheme();
  return (
    <NativeStack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: theme.bgColor},
        animationEnabled: false,
      }}>
      <NativeStack.Screen
        name="Rooms"
        component={Rooms}
        options={{
          headerShown: true,
          title: 'Messages',
          headerTintColor: 'grey',
          headerLeft: () => (
            <Icon
              name="close"
              size={24}
              color="grey"
              onPress={() => navigation.navigate('TabNav')}
              style={{marginLeft: 10}}
            />
          ),
          headerStyle: {backgroundColor: colors.green},
        }}
      />
      <NativeStack.Screen
        options={{
          headerShown: true,
          headerTintColor: 'grey',
          headerStyle: {backgroundColor: colors.green},
        }}
        name="EachRoom"
        component={EachRoom}
      />
    </NativeStack.Navigator>
  );
}
