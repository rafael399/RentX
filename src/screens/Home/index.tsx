import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, StyleSheet, BackHandler } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

import api from "../../service/api";

import Logo from "../../assets/logo.svg";
import { CarCard } from "../../components/CarCard";
import { LoadAnimation } from "../../components/LoadAnimation";

import { CarDTO } from "../../dtos/CarDTO";
import { NavigationProps } from "../../types/NavigationProps";

import { Container, Header, TotalCars, CarList } from "./styles";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([] as CarDTO[]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();

  const buttonPositionY = useSharedValue(0);
  const buttonPositionX = useSharedValue(0);

  const myRentalsButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: buttonPositionX.value },
        { translateY: buttonPositionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = buttonPositionX.value;
      ctx.positionY = buttonPositionY.value;
    },
    onActive(event, ctx: any) {
      buttonPositionX.value = ctx.positionX + event.translationX;
      buttonPositionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      buttonPositionX.value = withSpring(0);
      buttonPositionY.value = withSpring(0);
    },
  });

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (err) {
        console.error("Erro: ", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleMyRentalsButtonClick() {
    navigation.navigate("MyRentals");
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Logo height={RFValue(12)} width={RFValue(108)} />

        {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item: CarDTO) => String(item.id)}
          renderItem={({ item }) => (
            <CarCard data={item} onPress={() => handleCarDetails(item)} />
          )}
        ></CarList>
      )}

      {!loading && (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[styles.myRentalsButtonView, myRentalsButtonAnimatedStyle]}
          >
            <ButtonAnimated
              onPress={handleMyRentalsButtonClick}
              style={[
                styles.myRentalsButton,
                { backgroundColor: theme.colors.main },
              ]}
            >
              <Ionicons
                name="ios-car-sport"
                size={RFValue(32)}
                color={theme.colors.shape}
              />
            </ButtonAnimated>
          </Animated.View>
        </PanGestureHandler>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  myRentalsButtonView: {
    position: "absolute",
    bottom: RFValue(13),
    right: RFValue(22),
  },
  myRentalsButton: {
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(30),

    justifyContent: "center",
    alignItems: "center",
  },
});
