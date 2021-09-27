import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { CarCard } from "../../components/CarCard";

import { Container, Header, TotalCars, CarList } from "./styles";

export function Home() {
  const cars = [
    {
      brand: "Audi",
      model: "RS 5 Coupe",
      rent: {
        period: "Ao dia",
        price: 120,
      },
      thumbnail:
        "https://www.webmotors.com.br/imagens/prod/348415/AUDI_RS5_2.9_V6_TFSI_GASOLINA_SPORTBACK_QUATTRO_STRONIC_34841515593745747.png",
    },
    {
      brand: "Porsche",
      model: "Panamera",
      rent: {
        period: "Ao dia",
        price: 340,
      },
      thumbnail:
        "https://www.webmotors.com.br/imagens/prod/348415/AUDI_RS5_2.9_V6_TFSI_GASOLINA_SPORTBACK_QUATTRO_STRONIC_34841515593745747.png",
    },
  ];

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

      <CarList
        data={cars}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <CarCard data={item} />}
      ></CarList>
    </Container>
  );
}
