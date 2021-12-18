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
  value?: string;
}

export function PasswordInput({
  iconName,
  style = {},
  value,
  ...rest
}: PasswordInputProps) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme();

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!value);
  }, [value]);

  const handlePasswordVisibilityClick = useCallback(() => {
    setIsPasswordHidden((oldState) => !oldState);
  }, []);

  return (
    <Container style={style} isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>

      <InputText
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        secureTextEntry={isPasswordHidden}
        {...rest}
      />

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
