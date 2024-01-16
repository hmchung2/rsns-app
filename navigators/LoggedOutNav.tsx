import React, { useRef, useState } from "react";
import Welcome from "../screens/Welcome";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../shared/shared.types.ts";
import LogIn from "../screens/LogIn.tsx";
import { useReactiveVar } from "@apollo/client";
import { colorModeVar } from "../apollo.tsx";
import { useTheme } from "styled-components";
import CreateAccount from "../screens/CreateAccount.tsx";

const RootStack = createStackNavigator<RootStackParamList>();

const LoggedOutNav = ()=>{

  const colorMode: "light" | "dark" = useReactiveVar(colorModeVar);
  console.log(colorMode)
  const theme = useTheme();
  return (
    <RootStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor:  colorMode === "dark" ?  "#fff" : "#000" ,
        headerTransparent : true,
        headerTitle: () => false,
        cardStyle : { backgroundColor : theme.bgColor}
      }}
    >
      <RootStack.Screen name="Welcome" component={Welcome}></RootStack.Screen>
      <RootStack.Screen name="LogIn"  options={{title : "Log In"}}  component={LogIn}></RootStack.Screen>
      <RootStack.Screen name="CreateAccount"  component={CreateAccount}></RootStack.Screen>
    </RootStack.Navigator>
  )
}

export default LoggedOutNav;
