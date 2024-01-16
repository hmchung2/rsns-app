import React, { useEffect, useState } from "react";
import { Appearance, ColorSchemeName, SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client, { colorModeVar, isLoggedInVar, tokenVar } from "./apollo.tsx";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styles/themes.ts";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import LoggedInNav from "./navigators/LoggedInNav.tsx";
import LoggedOutNav from "./navigators/LoggedOutNav.tsx";




function App(): React.JSX.Element | null {

  const [ready, setReady] = useState<boolean>(false);
  const colorMode: "light" | "dark" = useReactiveVar(colorModeVar);
  const isLoggedIn : boolean = useReactiveVar(isLoggedInVar);

  const preload = async () : Promise<Boolean> => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
      return true;
    }
    return false;
  };


  useEffect(() => {
    preload().then((loggedIn)=>{
      if(!loggedIn){
        console.log("not logged in")
      }
      const colorSchemeName: ColorSchemeName = Appearance.getColorScheme();
      colorModeVar(colorSchemeName === "light" ? "light" : "dark");
      setReady(true);
    }).catch((error)=> console.log(error));
  }, []);

  useEffect(() => {
    Appearance.addChangeListener(({colorScheme})=>{
      if(colorScheme === "dark"){
        colorModeVar("dark")
      } else{
        colorModeVar("light")
      }
    })
  }, [colorMode]);


  if (!ready) {
    // return error page here
    return null;
  }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colorMode === "dark" ? '#000000' : '#FFFFFF',
    },
  };


  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={colorMode === "light" ? lightTheme : darkTheme }>
        <NavigationContainer theme={ MyTheme }>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}


export default App;
