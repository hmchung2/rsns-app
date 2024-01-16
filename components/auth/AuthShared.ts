import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import React from "react";



type SharedTextInputProps = {
  ref? :  React.MutableRefObject<any>;
  lastOne?: boolean; // Optional prop
};

type CustomTextInputProps = TextInputProps & SharedTextInputProps;

export const TextInput = styled.TextInput<CustomTextInputProps>`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;
  border-radius: 4px;
  color: white;
  margin-bottom: ${(props : CustomTextInputProps) => (props.lastOne ? 15 : 8)}px;
`;
//    ^6.1.6"

