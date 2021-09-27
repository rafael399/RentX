import React from "react";
import { SvgProps } from "react-native-svg";
import { RFValue } from "react-native-responsive-fontsize";

import { Container, Name } from "./styles";

interface AccessoryProps {
  name: string;
  icon: React.FC<SvgProps>;
}

export function Accessory({ name, icon: Icon }: AccessoryProps) {
  return (
    <Container>
      <Icon width={RFValue(32)} height={RFValue(32)} />
      <Name>{name}</Name>
    </Container>
  );
}
