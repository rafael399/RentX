import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { RFPercentage } from "react-native-responsive-fontsize";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";

import { NavigationProps } from "../../types/NavigationProps";

import { Container } from "./styles";

export function Splash() {
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation<NavigationProps>();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 50], // Steps da animação (inicia em 0 e finaliza em 50)
        [1, 0] // Opacidade em cada step
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP // Forçar animação a respeitar os limites passados
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  function startApp() {
    navigation.navigate("Home");
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      {
        duration: 2000,
      },
      () => {
        "worklet";
        runOnJS(startApp)();
      }
    );
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: "absolute" }]}>
        <BrandSvg width={RFPercentage(17.5)} height={RFPercentage(7.5)} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: "absolute" }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
