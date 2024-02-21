import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { LandingPageScreenProps } from "../../Navigator/TabNavigator";
import { SafeAreaView } from "react-native";
import { useAppSelector } from "../../hooks";
import { userInfoSelector } from "../../store";
import { appColor } from "../../theme";

export default function LandingPageScreen({
  navigation,
  route,
}: LandingPageScreenProps) {
  const user = useAppSelector(userInfoSelector);
  const { setLogin } = route.params;
  const handlePressPatientRecord = () => {
    if (user) {
      navigation.navigate("MedicalRecordNavigator");
    } else {
      navigation.navigate("AuthenticationNavigator", { setLogin });
    }
  };
  const handlePressNews = () => {
    navigation.navigate("NewsNavigator");
  };
  const handlePressAppointment = () => {
    if (user) {
      navigation.navigate("AppointmentNavigator");
    } else {
      navigation.navigate("AuthenticationNavigator", { setLogin });
    }
  };
  const handlePressClinic = () => {
    navigation.navigate("ClinicNavigator");
  };
  return (
    <SafeAreaView>
      <Box minH="50%" maxH="50%" justifyContent="center" alignSelf="center">
        <Image
          source={require("../../assets/images/common/logo.png")}
          borderRadius={100}
          size="200"
          alt="logo_img"
        />
        <Heading
          fontSize={30}
          fontFamily="heading"
          fontWeight="bold"
          color="primary.300"
          alignSelf="center"
        >
          CLINUS
        </Heading>
        <Button>DAT LICH KHAM</Button>
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
