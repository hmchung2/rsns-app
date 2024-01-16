import React from "react";
import { ActivityIndicator, GestureResponderEvent } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../styles/colors.ts";


const Button = styled.TouchableOpacity`
  background-color: ${colors.green};
  padding: 15px 10px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  margin-bottom: 15px;
`;

const ButtonText = styled.Text`
  color: ${colors.darkPurple};
  font-weight: 600;
  text-align: center;
`

type AuthButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  text: string;
  loading?: boolean;
};


export default function AuthButton({ onPress, disabled = false, text, loading } : AuthButtonProps) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}
