import {
  Box,
  Button,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  View,
  useToast,
} from "native-base";
import { useState, useEffect } from "react";
import { LandingPageScreenProps } from "../../Navigator/TabNavigator";
import { Dimensions, SafeAreaView } from "react-native";
import { appColor } from "../../theme";
import { IPatient } from "../../types";
import { patientApi } from "../../services";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ClinicSelector, setPatient, userInfoSelector } from "../../store";
import Carousel from "react-native-reanimated-carousel";
import ToastAlert from "../../components/Toast/Toast";
import { FCMConfig } from "../../config/firebaseCloudMessage";

export default function LandingPageScreen({
  navigation,
  route,
}: LandingPageScreenProps) {
  const toast = useToast();
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
    if (userInfo?.id) {
      FCMConfig(userInfo.id);
    }
  }, [clinic?.id]);

  const { setLogin } = route.params;
  const handlePressPatientRecord = () => {
    if (userInfo) {
      navigation.navigate("MedicalRecordNavigator");
    } else {
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Thông báo"
              description="Vui lòng thực hiện đăng nhập để sử dụng tính năng này!"
              status="warning"
            />
          );
        },
      });
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
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Thông báo"
              description="Vui lòng thực hiện đăng nhập để sử dụng tính năng này!"
              status="warning"
            />
          );
        },
      });
      navigation.navigate("AuthenticationNavigator", { setLogin });
    }
  };
  const handlePressClinic = () => {
    navigation.navigate("ClinicNavigator");
  };
  const handlePressChat = () => {
    if (userInfo) {
      navigation.navigate("ChattingNavigator", { params: null, screen: null });
    } else {
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Thông báo"
              description="Vui lòng thực hiện đăng nhập để sử dụng tính năng này!"
              status="warning"
            />
          );
        },
      });
      navigation.navigate("AuthenticationNavigator", { setLogin });
    }
  };
  const handlePressNotification = () => {
    if (userInfo) {
      navigation.navigate("NotificationNavigator");
    } else {
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Thông báo"
              description="Vui lòng thực hiện đăng nhập để sử dụng tính năng này!"
              status="warning"
            />
          );
        },
      });
      navigation.navigate("AuthenticationNavigator", { setLogin });
    }
  };
  const carousel = [
    "../../assets/images/carousel/carousel1.jpg",
    "../../assets/images/carousel/carousel2.jpg",
    "../../assets/images/carousel/carousel3.jpg",
    "../../assets/images/carousel/carousel4.jpg",
  ];
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return (
    <SafeAreaView>
      <Box minH="60%" maxH="60%" justifyContent="center" alignSelf="center">
        <Carousel
          style={{
            marginTop: 20,
          }}
          width={width}
          height={(height * 2) / 4}
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
              {item.index == 0 && (
                <Image
                  source={require("../../assets/images/carousel/carousel1.jpg")}
                  flex={1}
                  borderRadius={20}
                />
              )}
              {item.index == 1 && (
                <Image
                  source={require("../../assets/images/carousel/carousel2.jpg")}
                  flex={1}
                  borderRadius={20}
                />
              )}
              {item.index == 2 && (
                <Image
                  source={require("../../assets/images/carousel/carousel3.jpg")}
                  flex={1}
                  borderRadius={20}
                />
              )}
              {item.index == 3 && (
                <Image
                  source={require("../../assets/images/carousel/carousel4.jpg")}
                  flex={1}
                  borderRadius={20}
                />
              )}
            </View>
          )}
        />
        <Button
          p={4}
          _text={{ fontWeight: "bold", fontSize: 22 }}
          alignSelf="center"
          onPress={handlePressAppointment}
        >
          ĐẶT LỊCH KHÁM
        </Button>
      </Box>
      <Box minH="40%" maxH="40%" alignSelf="center">
        <VStack w="100%" h="100%" alignItems="center" flex={1}>
          <HStack flex={1}>
            <Box alignItems="center" justifyContent="flex-end" flex={1}>
              <Pressable
                _pressed={{ backgroundColor: "primary.50" }}
                onPress={handlePressPatientRecord}
                p={3}
                borderRadius={20}
                backgroundColor="#fff"
                height={100}
                w={100}
              >
                <Box flex={1} alignItems="center" justifyContent="center">
                  <Image
                    source={require("../../assets/images/common/patient_record.png")}
                    size="60"
                    alt="logo_img"
                  />
                  <Text
                    fontSize={12}
                    fontWeight="bold"
                    color={appColor.textTitle}
                    alignSelf="center"
                  >
                    Hồ sơ
                  </Text>
                </Box>
              </Pressable>
            </Box>
            <Box alignItems="center" justifyContent="flex-end" flex={1}>
              <Pressable
                _pressed={{ backgroundColor: "primary.50" }}
                onPress={handlePressAppointment}
                p={3}
                borderRadius={20}
                backgroundColor="#fff"
                height={100}
                w={100}
              >
                <Box flex={1} alignItems="center" justifyContent="center">
                  <Image
                    source={require("../../assets/images/common/appointment.png")}
                    size="60"
                    alt="logo_img"
                  />
                  <Text
                    fontSize={12}
                    fontWeight="bold"
                    color={appColor.textTitle}
                    alignSelf="center"
                  >
                    Lịch hẹn
                  </Text>
                </Box>
              </Pressable>
            </Box>
            <Box alignItems="center" justifyContent="flex-end" flex={1}>
              <Pressable
                _pressed={{ backgroundColor: "primary.50" }}
                onPress={handlePressClinic}
                p={3}
                borderRadius={20}
                backgroundColor="#fff"
                height={100}
                w={100}
              >
                <Box flex={1} alignItems="center" justifyContent="center">
                  <Image
                    source={require("../../assets/images/common/clinic.png")}
                    size="60"
                    alt="logo_img"
                  />
                  <Text
                    fontSize={12}
                    fontWeight="bold"
                    color={appColor.textTitle}
                    alignSelf="center"
                  >
                    Phòng khám
                  </Text>
                </Box>
              </Pressable>
            </Box>
          </HStack>
          <HStack flex={1}>
            <Box alignItems="center" justifyContent="center" flex={1}>
              <Pressable
                _pressed={{ backgroundColor: "primary.50" }}
                onPress={handlePressNews}
                p={3}
                borderRadius={20}
                backgroundColor="#fff"
                height={100}
                w={100}
              >
                <Box flex={1} alignItems="center" justifyContent="center">
                  <Image
                    source={require("../../assets/images/common/news.png")}
                    size="60"
                    alt="logo_img"
                  />
                  <Text
                    fontSize={12}
                    fontWeight="bold"
                    color={appColor.textTitle}
                    alignSelf="center"
                  >
                    Tin tức
                  </Text>
                </Box>
              </Pressable>
            </Box>
            <Box alignItems="center" justifyContent="center" flex={1}>
              <Pressable
                _pressed={{ backgroundColor: "primary.50" }}
                onPress={handlePressChat}
                p={3}
                borderRadius={20}
                backgroundColor="#fff"
                height={100}
                w={100}
              >
                <Box flex={1} alignItems="center" justifyContent="center">
                  <Image
                    source={require("../../assets/images/common/chat.png")}
                    size="60"
                    alt="logo_img"
                  />
                  <Text
                    fontSize={12}
                    fontWeight="bold"
                    color={appColor.textTitle}
                    alignSelf="center"
                  >
                    Nhắn tin
                  </Text>
                </Box>
              </Pressable>
            </Box>
            <Box alignItems="center" justifyContent="center" flex={1}>
              <Pressable
                _pressed={{ backgroundColor: "primary.50" }}
                onPress={handlePressNotification}
                p={3}
                borderRadius={20}
                backgroundColor="#fff"
                height={100}
                w={100}
              >
                <Box flex={1} alignItems="center" justifyContent="center">
                  <Image
                    source={require("../../assets/images/common/notification.png")}
                    size="60"
                    alt="logo_img"
                  />
                  <Text
                    fontSize={12}
                    fontWeight="bold"
                    color={appColor.textTitle}
                    alignSelf="center"
                  >
                    Thông báo
                  </Text>
                </Box>
              </Pressable>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
