import { RFValue } from "react-native-responsive-fontsize";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";

interface FocusProps {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View<FocusProps>`
  height: ${RFValue(56)}px;
  width: ${RFValue(55)}px;

  justify-content: center;
  align-items: center;

  margin-right: ${RFValue(2)}px;

  background: ${({ theme }) => theme.colors.background_secondary};

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `};
`;

export const InputText = styled(TextInput)<FocusProps>`
  flex: 1;

  background: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 ${RFValue(23)}px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `};
`;

export const ChangePasswordVisibilityButton = styled(
  TouchableOpacity
)<FocusProps>`
  justify-content: center;
  align-items: center;
  flex: 1;

  padding-right: ${RFValue(16)}px;
  padding-left: ${RFValue(16)}px;

  background: ${({ theme }) => theme.colors.background_secondary};

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `};
`;
