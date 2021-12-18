import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
  color?: string;
}

interface TitleProps {
  light: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  padding: ${RFValue(19)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, color }) => color || theme.colors.main};
  margin-bottom: ${RFValue(8)}px;
`;

export const Title = styled.Text<TitleProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
`;
