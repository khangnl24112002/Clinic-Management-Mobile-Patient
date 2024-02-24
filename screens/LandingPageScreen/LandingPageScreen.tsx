import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from "native-base";
import { useState, useEffect } from "react";
import { LandingPageScreenProps } from "../../Navigator/TabNavigator";
import { Dimensions, SafeAreaView } from "react-native";
import { appColor } from "../../theme";
import { IPatient, IMedicalRecord } from "../../types";
import { patientApi } from "../../services";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ClinicSelector, setPatient, userInfoSelector } from "../../store";
import Carousel from "react-native-reanimated-carousel";
import { ActivityIndicator } from "react-native-paper";
import ChooseClinicModal from "../AppointmentScreen/ChooseClinicModal";

export default function LandingPageScreen({
  navigation,
  route,
}: LandingPageScreenProps) {
  const dispatch = useAppDispatch();
  const clinic = useAppSelector(ClinicSelector);
  const userInfo = useAppSelector(userInfoSelector);

  const [patientInfo, setPatientInfo] = useState<IPatient>();

  const getPatientInfo = async () => {
    try {
      const response = await patientApi.getPatients({
        clinicId: clinic?.id,
        userId: userInfo?.id,
      });
      console.log("response: ", response);
      if (response.status && response.data) {
        setPatientInfo(response.data[0]);
        dispatch(setPatient(response.data[0]));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPatientInfo();
  }, [clinic?.id]);

  const { setLogin } = route.params;
  const handlePressPatientRecord = () => {
    if (userInfo && patientInfo) {
      navigation.navigate("MedicalRecordNavigator");
    } else {
      navigation.navigate("AuthenticationNavigator", { setLogin });
    }
  };
  const handlePressNews = () => {
    navigation.navigate("NewsNavigator", { screen: "News", params: null });
  };
  const handlePressAppointment = () => {
    if (userInfo) {
      navigation.navigate("AppointmentNavigator");
    } else {
      navigation.navigate("AuthenticationNavigator", { setLogin });
    }
  };
  const handlePressClinic = () => {
    navigation.navigate("ClinicNavigator");
  };
  const carousel = [
    "../../assets/images/carousel/carousel1.jpg",
    "../../assets/images/carousel/carousel2.jpg",
    "../../assets/images/carousel/carousel3.jpg",
    "../../assets/images/carousel/carousel4.jpg",
  ];
  const width = Dimensions.get("window").width;
  return (
    <SafeAreaView>
      <Box minH="50%" maxH="50%" justifyContent="center" alignSelf="center">
        <Carousel
          width={width}
          height={(width * 3) / 4}
          loop
          mode="parallax"
          autoPlay={true}
          data={carousel}
          scrollAnimationDuration={1000}
          // onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={(item) => (
            <View
              style={{
                flex: 1,
              }}
            >
              {/* <Image source={require(item.item)} flex={1} /> */}
              {item.index == 0 && (
                <Image
                  source={require("../../assets/images/carousel/carousel1.jpg")}
                  flex={1}
                />
              )}
              {item.index == 1 && (
                <Image
                  source={require("../../assets/images/carousel/carousel2.jpg")}
                  flex={1}
                />
              )}
              {item.index == 2 && (
                <Image
                  source={require("../../assets/images/carousel/carousel3.jpg")}
                  flex={1}
                />
              )}
              {item.index == 3 && (
                <Image
                  source={require("../../assets/images/carousel/carousel4.jpg")}
                  flex={1}
                />
              )}
            </View>
          )}
        />

        <Button
          p={4}
          _text={{ fontWeight: "bold", fontSize: 18 }}
          alignSelf="center"
          mt={-12}
          onPress={handlePressAppointment}
        >
          ĐẶT LỊCH KHÁM
        </Button>
      </Box>
      <Box minH="50%" maxH="50%" alignSelf="center">
        <VStack w="100%" h="100%" alignItems="center" flex={1}>
          <HStack flex={1}>
            <Pressable
              flex={1}
              p={3}
              alignItems="center"
              justifyContent="center"
              _pressed={{ backgroundColor: "primary.100" }}
              borderWidth={1}
              borderColor="gray.200"
              onPress={handlePressPatientRecord}
            >
              <Image
                source={require("../../assets/images/common/patient_record.png")}
                size="100"
                alt="logo_img"
              />
              <Text fontWeight="bold" color={appColor.textTitle} mt={4}>
                Hồ sơ khám bệnh
              </Text>
            </Pressable>
            <Pressable
              flex={1}
              p={3}
              alignItems="center"
              justifyContent="center"
              _pressed={{ backgroundColor: "primary.100" }}
              borderWidth={1}
              borderColor="gray.200"
              onPress={handlePressNews}
            >
              <Image
                source={require("../../assets/images/common/news.png")}
                size="100"
                alt="logo_img"
              />
              <Text fontWeight="bold" color={appColor.textTitle} mt={4}>
                Tin tức
              </Text>
            </Pressable>
          </HStack>
          <HStack flex={1} w="full" justifyContent="space-evenly">
            <Pressable
              flex={1}
              borderWidth={1}
              p={3}
              alignItems="center"
              justifyContent="center"
              _pressed={{ backgroundColor: "primary.100" }}
              borderColor="gray.200"
              onPress={handlePressAppointment}
            >
              <Image
                source={require("../../assets/images/common/appointment.png")}
                size="100"
                alt="logo_img"
              />
              <Text fontWeight="bold" color={appColor.textTitle} mt={4}>
                Lịch hẹn
              </Text>
            </Pressable>
            <Pressable
              flex={1}
              borderWidth={1}
              p={3}
              alignItems="center"
              justifyContent="center"
              _pressed={{ backgroundColor: "primary.100" }}
              borderColor="gray.200"
              onPress={handlePressClinic}
            >
              <Image
                source={require("../../assets/images/common/clinic.png")}
                size="100"
                alt="logo_img"
              />
              <Text fontWeight="bold" color={appColor.textTitle} mt={4}>
                Phòng khám
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
