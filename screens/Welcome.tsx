import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import {colors} from "../styles/colors.ts";
import { RootStackParamList } from "../shared/shared.types.ts";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type EnterNavigationProps = NativeStackScreenProps<RootStackParamList, "Welcome">;

const LoginLink = styled.Text`
  color: ${colors.green};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

const Welcome = ({ navigation } : EnterNavigationProps) =>{
  const goToCreateAccount = () : void => navigation.navigate("CreateAccount");
  const goToLogIn = () : void => navigation.navigate("LogIn");

  return (
    <View style={{ flex: 1 , backgroundColor : 'black'}}>
      <View style={{ flex: 1 }}></View>
      <AuthLayout>
        <AuthButton
          loading={false}
          text="Create New Account"
          disabled={false}
          onPress={goToCreateAccount}
        />
        <TouchableOpacity onPress={goToLogIn}>
          <LoginLink>Log In</LoginLink>
        </TouchableOpacity>
      </AuthLayout>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

export default Welcome;
