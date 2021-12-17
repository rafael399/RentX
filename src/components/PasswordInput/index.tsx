import React, { useCallback, useState } from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibilityButton,
} from "./styles";

interface PasswordInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  style?: object;
}

export function PasswordInput({
  iconName,
  style = {},
  ...rest
}: PasswordInputProps) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const theme = useTheme();

  const handlePasswordVisibilityClick = useCallback(() => {
    setIsPasswordHidden((oldState) => !oldState);
  }, []);

  return (
    <Container style={style}>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>

      <InputText secureTextEntry={isPasswordHidden} {...rest} />

      <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityClick}>
        <Feather
          name={isPasswordHidden ? "eye" : "eye-off"}
          size={24}
          color={theme.colors.text_detail}
        />
      </ChangePasswordVisibilityButton>
    </Container>
  );
}
