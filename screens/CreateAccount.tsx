import React, { useRef, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CreateAccountStackParamList, RootStackParamList } from "../shared/shared.types.ts";
import { Alert, TouchableOpacity, View } from "react-native";
import { SignUpAppContextProvider } from "./SignUp/SignUpContext.tsx";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "styled-components";
import StepOne from "./SignUp/StepOne.tsx";
import StepTwo from "./SignUp/StepTwo.tsx";
import StepThree from "./SignUp/StepThree.tsx";
import StepFour from "./SignUp/StepFour.tsx";
import ConditionStep from "./SignUp/ConditionStep.tsx";

type CreateAccountProps = NativeStackScreenProps<RootStackParamList, "CreateAccount">;

const Stack = createStackNavigator<CreateAccountStackParamList>();

export default function CreateAccount({ navigation }: CreateAccountProps) {

  const theme = useTheme();

  return (
    <SignUpAppContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTintColor: "white",
          headerTitle: "Create Account",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#080402"
          },
          cardStyle: { backgroundColor: theme.bgColor },
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  marginTop: 20,
                  marginLeft: 10,
                  height: 40,
                  width: 40
                }}
                onPress={() => {
                  Alert.alert(
                    "Are you sure?",
                    "Are you sure you want to go back? Any unsaved changes will be lost.",
                    [
                      {
                        text: "Cancel",
                        onPress: () => {
                        }
                      },
                      {
                        text: "OK",
                        onPress: () => navigation.navigate("Welcome")
                      }
                    ]
                  );
                }}
              >
                <Icon
                  name="chevron-left"
                  size={20}
                  style={{ color: "#808080" }}
                />
              </TouchableOpacity>
            );
          }
        }}
      >
        <Stack.Screen name="StepOne" component={StepOne} />
        <Stack.Screen name="StepTwo" component={StepTwo} />
        <Stack.Screen name="StepThree" component={StepThree} />
        <Stack.Screen name="StepFour" component={StepFour} />
        <Stack.Screen name="ConditionStep" component={ConditionStep} />
      </Stack.Navigator>
    </SignUpAppContextProvider>);
}
