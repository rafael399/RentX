import React from "react";

import GasolineSvg from "../../assets/gasoline.svg";

import {
  Container,
  Details,
  Brand,
  Model,
  RentalDetails,
  Pricing,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

interface CarData {
  brand: string;
  model: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface CarCardProps {
  data: CarData;
}

export function CarCard({ data }: CarCardProps) {
  return (
    <Container>
      <Details>
        <Brand>{data.brand}</Brand>
        <Model>{data.model}</Model>

        <RentalDetails>
          <Pricing>
            <Period>{data.rent.period}</Period>
            <Price>R$ {data.rent.price}</Price>
          </Pricing>

          <Type>
            <GasolineSvg />
          </Type>
        </RentalDetails>
      </Details>

      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        // resizeMode="contain"
      />
    </Container>
  );
}
