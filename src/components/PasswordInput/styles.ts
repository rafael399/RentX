import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton, TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View`
  height: ${RFValue(56)}px;
  width: ${RFValue(55)}px;

  justify-content: center;
  align-items: center;

  margin-right: ${RFValue(2)}px;

  background: ${({ theme }) => theme.colors.background_secondary};
`;

export const InputText = styled(TextInput)`
  flex: 1;

  background: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 ${RFValue(23)}px;
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)`
  justify-content: center;
  align-items: center;

  padding-right: ${RFValue(16)}px;
  padding-left: ${RFValue(16)}px;

  background: ${({ theme }) => theme.colors.background_secondary};
`;
