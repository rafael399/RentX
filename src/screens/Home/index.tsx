import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import api from "../../service/api";

import Logo from "../../assets/logo.svg";
import { CarCard } from "../../components/CarCard";
import { Load } from "../../components/Load";

import { CarDTO } from "../../dtos/CarDTO";
import { NavigationProps } from "../../types/NavigationProps";

import {
  Container,
  Header,
  TotalCars,
  CarList,
  MyRentalsButton,
} from "./styles";

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([] as CarDTO[]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();

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

        <TotalCars>Total de 12 carros</TotalCars>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item: CarDTO) => String(item.id)}
          renderItem={({ item }) => (
            <CarCard data={item} onPress={() => handleCarDetails(item)} />
          )}
        ></CarList>
      )}

      <MyRentalsButton onPress={handleMyRentalsButtonClick}>
        <Ionicons
          name="ios-car-sport"
          size={RFValue(32)}
          color={theme.colors.shape}
        />
      </MyRentalsButton>
    </Container>
  );
}
