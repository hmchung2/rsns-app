import React, { useRef, useState, useEffect, useContext, RefObject } from "react";
import { Text, View } from "react-native";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../components/auth/AuthLayout";
import { TextInput } from "../../components/auth/AuthShared";
import { gql, useLazyQuery } from "@apollo/client";
import StepBar from "./StepBar";
import { SignUpAppContext } from "./SignUpContext";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  CreateAccountStackParamList
} from "../../shared/shared.types.ts";
import { useValidCreateAccountLazyQuery, ValidCreateAccountQuery } from "../../generated/graphql.ts";



type StepOneProps = NativeStackScreenProps<CreateAccountStackParamList , "StepOne">;

export default function StepOne({ navigation } :StepOneProps) {
  const onNext = (nextOne : React.MutableRefObject<any>) => {
    nextOne?.current?.focus();
  };

  const { username, setUsername } = useContext(SignUpAppContext);
  const { reservedUsername, setReservedUsername } = useContext(SignUpAppContext); // prettier-ignore
  const { password, setPassword } = useContext(SignUpAppContext);
  const { repassword, setRepassword } = useContext(SignUpAppContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [validated, setValidated] = useState(false);

  const handleInputChange = (
    setFunction : React.Dispatch<React.SetStateAction<string>>,
    value : string,
    ) : void => {
    setFunction(value);
    setValidated(false);
  };



  const shouldNavigates = (nextPage: any , navigation :  NativeStackNavigationProp<CreateAccountStackParamList> ): void => {
    type Keys = keyof CreateAccountStackParamList;
    const validPages: Keys[] = ["StepTwo", "StepThree", "StepFour", "ConditionStep"];
    if (nextPage && validPages.includes(nextPage as Keys)) {
      navigation.navigate(nextPage);
    }
  };

  const [executeQuery, { loading }] = useValidCreateAccountLazyQuery( {
    onCompleted: (data: ValidCreateAccountQuery)  => {
      if (data?.validCreateAccount?.ok) {
        console.log(data);
        setReservedUsername(username);
        setValidated(true);
        setErrorMsg("");
        shouldNavigates(data.validCreateAccount.nextPage , navigation);
      } else {
        setErrorMsg("Username already exists");
        setReservedUsername("");
        setValidated(false);
      }
    },
    onError: (error) => {
      console.log(error);
      setErrorMsg("Network issue");
    },
  });

  const handleNext = async (nextPage : keyof CreateAccountStackParamList) => {
    if (validated) {
      navigation.navigate(nextPage);
      return true;
    }

    if (username === "") {
      setErrorMsg("Please write username");
      onNext(usernameRef);
      return false;
    }
    if (password === "") {
      setErrorMsg("Please write password");
      onNext(passwordRef);
      return false;
    }
    if (repassword === "") {
      setErrorMsg("Please rewrite password");
      onNext(repasswordRef);
      return false;
    }
    if (password !== repassword) {
      setErrorMsg("Passwords not matched. Please write your password again");
      onNext(passwordRef);
      return false;
    }
    await executeQuery({
      variables: { username, nextPage },
    });
  };

  const usernameRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();

  const HeaderBar = () => (
    <StepBar
      currentStep={1}
      onBeforeNavigate={handleNext} // temp onBeforeNavigate={handleNext}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: HeaderBar,
    });
  }, []);

  useEffect(() => {
    // console.log("username : ", username);
  }, []);

  // const [activeInput , setActiveInput]
  //   = useState<'username' | 'password' | 'repassword'>('username');


  return (
    <AuthLayout>
      <View style={{ marginBottom: 50 }}>
        <TextInput
          ref={usernameRef}
          placeholder="User Name"
          returnKeyType="next"
          onSubmitEditing={() => onNext(passwordRef)}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onChangeText={(text : string ) => handleInputChange(setUsername, text)}
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          returnKeyType="next"
          onSubmitEditing={() => onNext(repasswordRef)}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onChangeText={(text : string) => handleInputChange(setPassword, text)}
          secureTextEntry
        />
        <TextInput
          ref={repasswordRef}
          placeholder="Enter your password again"
          returnKeyType="done"
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onChangeText={(text : string) => handleInputChange(setRepassword, text)}
          lastOne={true}
          secureTextEntry
        />
        {errorMsg !== "" && (
          <Text style={{ color: "red", marginBottom: 10 }}>{errorMsg}</Text>
        )}
      </View>
      <View style={{ marginBottom: 150, width: "85%", alignSelf: "center" }}>
        <AuthButton
          text="Next"
          disabled={false}
          loading={loading}
          onPress={async () => handleNext("StepTwo")}
        />
      </View>
    </AuthLayout>
  );
}
