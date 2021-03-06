import React, { useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { format } from "date-fns";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getPlatformDate } from "../../utils/getPlatformDate";

import api from "../../service/api";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { CarDTO } from "../../dtos/CarDTO";
import { ScheduleByCarDTO } from "../../dtos/ScheduleDTO";
import { NavigationProps } from "../../types/NavigationProps";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Model,
  RentalDetails,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuote,
  RentalPriceTotal,
} from "./styles";

interface ScheduleDetailsParams {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriodProps {
  startFormatted: string;
  endFormatted: string;
}

export function ScheduleDetails() {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
    {} as RentalPeriodProps
  );

  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { car, dates } = route.params as ScheduleDetailsParams;

  async function handleRentNow() {
    try {
      setLoading(true);

      const response: { data: ScheduleByCarDTO } = await api.get(
        `/schedules_bycars/${car.id}`
      );

      const matchingDates = response.data.unavailable_dates.some((date) =>
        dates.includes(date)
      );
      if (matchingDates)
        return Alert.alert(
          "Data indispon??vel",
          "Uma das datas selecionadas est?? indispon??vel"
        );

      const unavailable_dates = [...response.data.unavailable_dates, ...dates];

      await api.post("/schedules_byuser", {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyy"),
        endDate: format(
          getPlatformDate(new Date(dates[dates.length - 1])),
          "dd/MM/yyy"
        ),
      });

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      });

      navigation.navigate("SchedulingComplete");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyy"),
      endFormatted: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyy"
      ),
    });
  }, []);

  const totalPrice = useMemo(() => {
    return dates.length * car.rent.price;
  }, [dates, car.rent.price]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuote>
              R$ {`${car.rent.price} x${dates.length}`} di??rias
            </RentalPriceQuote>
            <RentalPriceTotal>R$ {totalPrice}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleRentNow}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
