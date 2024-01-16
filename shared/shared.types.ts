import MessagesNav from "../navigators/MessagesNav.tsx";

export type RootStackParamList = {
  Welcome : any;
  CreateAccount : any;
  LogIn : { username: string; password: string } | undefined;
  MessagesNav : any;
  TabNav  : any;
  EachRoom: any;
}

export type CreateAccountStackParamList = {
  StepOne : any;
  StepTwo : any;
  StepThree: any;
  StepFour : any;
  ConditionStep : any;
}

