import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import GasolineSvg from "../../assets/gasoline.svg";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

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

interface CarCardProps extends RectButtonProps {
  data: CarDTO;
}

export function CarCard({ data, ...rest }: CarCardProps) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Model>{data.name}</Model>

        <RentalDetails>
          <Pricing>
            <Period>{data.rent.period}</Period>
            <Price>R$ {data.rent.price}</Price>
          </Pricing>

          <Type>
            <MotorIcon />
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
