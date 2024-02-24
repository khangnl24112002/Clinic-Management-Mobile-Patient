import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useToast,
  Image,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ClinicDetailProps } from "../../Navigator/ClinicNavigator";
import { appColor } from "../../theme";
import { IClinicInfo, IClinicService, IStaff } from "../../types";
import { clinicService, clinicServiceApi, staffApi } from "../../services";
import ToastAlert from "../../components/Toast/Toast";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HTMLView from "react-native-htmlview";
import { newsServiceApi } from "../../services/news.service";
import { INews, INewsResponse } from "../../types/news.type";
const { format } = require("number-currency-format");
import { helpers } from "../../utils/helper";
export default function ClinicDetailScreen({
  navigation,
  route,
}: ClinicDetailProps) {
  const { clinicId } = route.params;
  const toast = useToast();
  const [clinicInfo, setClinicInfo] = useState<IClinicInfo | null>(null);
  const [doctors, setDoctors] = useState<IStaff[] | null>(null);
  const [services, setServices] = useState<IClinicService[] | null>(null);
  const [newsList, setNewsList] = useState<INews[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getClinicInfo = async () => {
    const response = await clinicService.getClinicByClinicId(clinicId);
    if (response.data) {
      setClinicInfo(response.data);
    } else {
      // Thông báo lỗi
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Lỗi"
              description="Lấy thông tin thất bại. Vui lòng thử lại sau."
              status="error"
            />
          );
        },
      });
    }
  };
  const getClinicDoctors = async () => {
    const response = await staffApi.getStaffsByClinic({ clinicId: clinicId });
    const staffs = response.data;
    if (staffs && staffs.length >= 0) {
      let filterDoctors: IStaff[] = [];
      for (let i = 0; i < staffs.length; i++) {
        if (
          staffs[i].role.permissions.findIndex(
            (permission) => permission.id === 2
          ) !== -1
        ) {
          filterDoctors.push(staffs[i]);
        }
      }
      setDoctors(filterDoctors);
    } else {
      // Thông báo lỗi
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Lỗi"
              description="Lấy thông tin thất bại. Vui lòng thử lại sau."
              status="error"
            />
          );
        },
      });
    }
  };
  const getClinicServices = async () => {
    const response = await clinicServiceApi.getClinicServices(clinicId, false);
    if (response.data) {
      setServices(response.data);
    } else {
      // Thông báo lỗi
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Lỗi"
              description="Lấy thông tin thất bại. Vui lòng thử lại sau."
              status="error"
            />
          );
        },
      });
    }
  };
  const getClinicNews = async () => {
    const response = await newsServiceApi.getNews(clinicId, true, 4, 0);
    if (response.data) {
      setNewsList(response.data.data);
    } else {
      // Thông báo lỗi
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Lỗi"
              description="Lấy thông tin thất bại. Vui lòng thử lại sau."
              status="error"
            />
          );
        },
      });
    }
  };
  useEffect(() => {
    // Get clinic detail info
    setIsLoading(true);
    getClinicDoctors();
    getClinicInfo();
    getClinicServices();
    getClinicNews();
    setIsLoading(false);
  }, []);

  return (
    <ScrollView maxW="90%" minW="90%" mt="5%" alignSelf="center">
      {!clinicInfo && (
        <LoadingSpinner showLoading={isLoading} setShowLoading={setIsLoading} />
      )}
      {clinicInfo && (
        <Box
          alignSelf="center"
          backgroundColor={appColor.white}
          borderRadius={20}
          width="full"
          height="full"
          p={5}
        >
          <Box
            width="full"
            alignItems="center"
            py={3}
            mb={3}
            borderBottomWidth={1}
            borderBottomColor="#EDEDF2"
          >
            <Avatar
              alignSelf="center"
              bg="gray.200"
              source={
                clinicInfo?.logo
                  ? { uri: clinicInfo.logo }
                  : require("../../assets/images/clinics/default_image_clinic.png")
              }
              size="2xl"
              mb={2}
            />

            <Text
              color={appColor.textTitle}
              fontWeight="extrabold"
              fontSize="17"
            >
              {clinicInfo?.name}
            </Text>
          </Box>
          <Box borderBottomWidth={1} borderBottomColor="#EDEDF2" mb={3} pb={3}>
            <VStack space="5">
              <HStack space={2} justifyContent="flex-start" width="full">
                <Ionicons
                  name="location-outline"
                  size={22}
                  color={appColor.textSecondary}
                />
                <Text color={appColor.textSecondary}>
                  {clinicInfo?.address}
                </Text>
              </HStack>

              <HStack space={2} justifyContent="flex-start" width="full">
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={appColor.textSecondary}
                />
                <Text color={appColor.textSecondary}>{clinicInfo?.email}</Text>
              </HStack>
              <HStack space={2} justifyContent="flex-start" width="full">
                <Feather
                  color={appColor.textSecondary}
                  name="phone"
                  size={20}
                />
                <Text color={appColor.textSecondary}>{clinicInfo?.phone}</Text>
              </HStack>
            </VStack>
          </Box>
          <Box borderBottomWidth={1} borderBottomColor="#EDEDF2" mb={3} pb={3}>
            <Text
              mb={2}
              fontWeight="bold"
              fontSize={17}
              color={appColor.textTitle}
            >
              Mô tả
            </Text>
            {clinicInfo.description !== "" &&
              clinicInfo.description !== null && (
                <HTMLView value={clinicInfo.description} />
              )}
          </Box>
          <Box borderBottomWidth={1} borderBottomColor="#EDEDF2" mb={3} pb={3}>
            <Text
              mb={2}
              fontWeight="bold"
              fontSize={17}
              color={appColor.textTitle}
            >
              Đội ngũ bác sĩ
            </Text>
            <VStack space={2}>
              {doctors &&
                doctors.map((doctor: IStaff, index: any) => {
                  return (
                    <Pressable
                      _pressed={{
                        backgroundColor: appColor.background,
                      }}
                      borderRadius={20}
                      p={3}
                    >
                      <HStack alignItems="center" space={2}>
                        <Avatar
                          alignSelf="center"
                          bg="gray.200"
                          source={
                            doctor?.users?.avatar
                              ? { uri: doctor?.users?.avatar }
                              : require("../../assets/images/clinics/default_doctor.png")
                          }
                          size="lg"
                        />
                        <VStack>
                          <HStack>
                            <Text
                              mr={2}
                              color={appColor.textSecondary}
                              fontWeight="bold"
                            >
                              Bác sĩ:
                            </Text>
                            <Text color={appColor.textSecondary}>
                              {doctor?.users?.firstName +
                                " " +
                                doctor?.users?.lastName}
                            </Text>
                          </HStack>
                          <HStack>
                            <Text
                              mr={4}
                              color={appColor.textSecondary}
                              fontWeight="bold"
                            >
                              Khoa:
                            </Text>
                            <Text color={appColor.textSecondary}>
                              {doctor.specialize}
                            </Text>
                          </HStack>
                        </VStack>
                      </HStack>
                    </Pressable>
                  );
                })}
              {(!doctors || doctors.length <= 0) && (
                <Text>Phòng khám chưa có bác sĩ.</Text>
              )}
            </VStack>
          </Box>
          <Box borderBottomWidth={1} borderBottomColor="#EDEDF2" mb={3} pb={3}>
            <Text
              mb={2}
              fontWeight="bold"
              fontSize={17}
              color={appColor.textTitle}
            >
              Bảng giá dịch vụ
            </Text>
            <VStack>
              {services &&
                services.map((service: IClinicService) => {
                  return (
                    <Pressable
                      _pressed={{ backgroundColor: appColor.background }}
                      p={3}
                      borderRadius={20}
                    >
                      <VStack>
                        <Text fontWeight="bold" fontSize={15}>
                          {service.serviceName}
                        </Text>
                        <HStack>
                          <Text
                            fontWeight="bold"
                            color={appColor.textSecondary}
                            mr={2}
                          >
                            Mô tả:{" "}
                          </Text>
                          <Text color={appColor.textSecondary}>
                            {service.description}
                          </Text>
                        </HStack>
                        <HStack>
                          <Text
                            fontWeight="bold"
                            color={appColor.textSecondary}
                            mr={6}
                          >
                            Giá:{" "}
                          </Text>
                          <Text color={appColor.textSecondary}>
                            {format(service.price, {
                              decimalsDigits: 0,
                              decimalSeparator: "",
                            })}
                            đ
                          </Text>
                        </HStack>
                      </VStack>
                    </Pressable>
                  );
                })}
              {(!services || services.length == 0) && (
                <Text>Phòng khám chưa có dịch vụ.</Text>
              )}
            </VStack>
          </Box>
          <Box borderBottomWidth={1} borderBottomColor="#EDEDF2" mb={3} pb={3}>
            <Text
              mb={2}
              fontWeight="bold"
              fontSize={17}
              color={appColor.textTitle}
            >
              Tin tức, thông báo
            </Text>
            <VStack>
              {newsList &&
                newsList.map((newItem: INews) => {
                  return (
                    <Pressable
                      _pressed={{ backgroundColor: appColor.background }}
                      p={3}
                      borderRadius={20}
                    >
                      <VStack>
                        <Box>
                          <HStack w="full" space={3}>
                            <Image
                              borderRadius={10}
                              size={20}
                              source={
                                helpers.checkImage(newItem.logo)
                                  ? { uri: newItem.logo }
                                  : require("../../assets/images/clinics/default_noti.png")
                              }
                              alt="Alternate Text"
                            />
                            <VStack w="70%">
                              <Text>{newItem.title}</Text>
                            </VStack>
                          </HStack>
                        </Box>
                      </VStack>
                    </Pressable>
                  );
                })}
              {(!newsList || newsList.length == 0) && (
                <Text>Phòng khám chưa có tin tức.</Text>
              )}
            </VStack>
          </Box>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
          >
            Quay lại
          </Button>
        </Box>
      )}
    </ScrollView>
  );
}
