import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { CarDTO } from "../../dtos/CarDTO";
import { NavigationProps } from "../../types/NavigationProps";

import {
  Container,
  Header,
  Details,
  Description,
  Brand,
  Model,
  RentalDetails,
  Period,
  Price,
  Accessories,
  About,
  Footer,
} from "./styles";

interface CarDetailsParams {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const theme = useTheme();
  const { car } = route.params as CarDetailsParams;

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const carSliderStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handlePickDateClick() {
    navigation.navigate("Schedule", { car });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          {
            backgroundColor: theme.colors.background_secondary,
          },
        ]}
      >
        <Header>
          <BackButton onPress={handleGoBack} />
        </Header>

        <Animated.View
          style={[
            carSliderStyleAnimation,
            {
              marginTop: getStatusBarHeight() + RFValue(32),
            },
          ]}
        >
          <ImageSlider imagesUrl={car.photos} />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: RFValue(24),
          paddingTop: getStatusBarHeight() + 160,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Model>{car.name}</Model>
          </Description>

          <RentalDetails>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </RentalDetails>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handlePickDateClick}
        />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});
