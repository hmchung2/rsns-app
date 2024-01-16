import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../shared/shared.types.ts";
import { useForm, Controller } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout.tsx";
import { logUserIn } from "../apollo.tsx";
import AuthButton from "../components/auth/AuthButton.tsx";
import { TextInput } from "../components/auth/AuthShared.ts";
import styled from "styled-components/native";
import { LoginMutation, useLoginMutation } from "../generated/graphql.ts";



type LoginNavigationProps = NativeStackScreenProps<RootStackParamList, "LogIn">;

interface LoginFormData {
    username: string;
    password: string;
}


const Contaienr = styled.View`
  width: 100%;
  padding: 0 20px;
`;



const LogIn = ({route : {params}} : LoginNavigationProps)=>{

    const { register,
        handleSubmit,
        setValue,
        getValues,
        watch } = useForm<LoginFormData>({
        defaultValues: {
            password: params?.password,
            username: params?.username,
        },
    });

  const onCompleted = async (data : LoginMutation) => {
    const {
      login: { ok, token, error },
    } = data;
    if (ok && token) {
      await logUserIn(token);
    }
  };

  const onValid = () => {
    if (!loading) {
      const { username, password } = getValues();
      logInMutation({ variables: {username, password}});
    }
  };

  const [logInMutation, { loading, error }] = useLoginMutation( {
    onCompleted,
  });

  const passwordRef : MutableRefObject<null> = useRef(null);
  const onNext = (nextOne : RefObject<HTMLInputElement>) : void => {
    nextOne.current?.focus();
  };

  useEffect(() => {
    register("username", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);


  return (
    <AuthLayout logoMarginTop={150}>
        <TextInput
          value={watch("username")}
          placeholder="Username"
          returnKeyType="next"
          autoCapitalize="none"
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onSubmitEditing={() => onNext(passwordRef)}
          onChangeText={(text: string) => setValue("username", text)}
        />
        <TextInput
          value={watch("password")}
          ref={passwordRef}
          placeholder="Password"
          secureTextEntry
          returnKeyType="done"
          lastOne={true}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onSubmitEditing={handleSubmit(onValid)}
          onChangeText={(text : string) => setValue("password", text)}
        />
        <AuthButton
          text="Log In"
          loading={loading}
          disabled={!watch("username") || !watch("password")}
          onPress={handleSubmit(onValid)}
        />
    </AuthLayout>)
}


export default LogIn;



