import React, { useEffect, useState } from "react";
import { StatusBar, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import api from "../../service/api";

import { Load } from "../../components/Load";
import { CarCard } from "../../components/CarCard";
import { BackButton } from "../../components/BackButton";

import { NavigationProps } from "../../types/NavigationProps";
import { CarDTO } from "../../dtos/CarDTO";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  RentalCardFooter,
  RentalCardFooterTitle,
  RentalCardFooterPeriod,
  RentalCardFooterDate,
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";

interface IMyRental {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyRentals() {
  const [rentals, setRentals] = useState<IMyRental[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchRentals() {
      try {
        const response = await api.get("/schedules_byuser?user_id=1");
        setRentals(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRentals();
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />

        <Title>Seus agendamentos {"\n"}estão aqui.</Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{rentals.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={rentals}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <CarCard data={item.car} />
                <RentalCardFooter>
                  <RentalCardFooterTitle>Período</RentalCardFooterTitle>
                  <RentalCardFooterPeriod>
                    <RentalCardFooterDate>
                      {item.startDate}
                    </RentalCardFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={RFValue(20)}
                      color={theme.colors.title}
                      style={{ marginHorizontal: RFValue(10) }}
                    />
                    <RentalCardFooterDate>{item.endDate}</RentalCardFooterDate>
                  </RentalCardFooterPeriod>
                </RentalCardFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
