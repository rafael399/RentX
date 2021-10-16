import React from "react";
import LottieView from "lottie-react-native";
import { RFValue } from "react-native-responsive-fontsize";

import loadingAnimation from "../../assets/loading_animation.json";

import { Container } from "./styles";

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={loadingAnimation}
        style={{ height: RFValue(150) }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
}
