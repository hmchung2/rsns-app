import React from 'react';
import styled from 'styled-components/native';
// import { Ionicons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/Ionicons';

interface AvatarImgProps {
  avatarPath: string | undefined;
}

const AvatarImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin: 10px 10px 1px 10px;
`;

const IconContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: grey;
  margin: 10px 10px 1px 10px;
  justify-content: center;
  align-items: center;
`;

export default function AvatarImg({avatarPath}: AvatarImgProps) {
  return avatarPath ? (
    <AvatarImage source={{uri: avatarPath}} />
  ) : (
    <IconContainer>
      <Icon name="person" size={32} color="#ffffff" />
    </IconContainer>
  );
}
