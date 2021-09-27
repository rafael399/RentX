import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface ImageIndexProps {
  active?: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: ${RFValue(24)}px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
  width: ${RFValue(6)}px;
  height: ${RFValue(6)}px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};

  margin-left: ${RFValue(8)}px;
  border-radius: ${RFValue(3)}px;
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get("window").width};
  height: ${RFValue(132)}px;

  justify-content: center;
  align-items: center;
`;

export const CarImage = styled.Image`
  width: ${RFValue(280)}px;
  height: ${RFValue(132)}px;
`;
