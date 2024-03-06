import React, { useEffect } from "react";
import { DoctorInfoProps } from "../../Navigator/ClinicNavigator";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import {
  Avatar,
  Box,
  ScrollView,
  useToast,
  Text,
  HStack,
  VStack,
  Button,
} from "native-base";
import { appColor } from "../../theme";
import { chatService, staffApi } from "../../services";
import ToastAlert from "../../components/Toast/Toast";
import { IClinicStaffDetail, IStaff } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { helpers } from "../../utils/helper";
import { useAppSelector } from "../../hooks";
import { userInfoSelector } from "../../store";
import { navigationRef } from "../../Navigator/TabNavigator";
import HTMLView from "react-native-htmlview";

export default function DoctorInfoScreen({
  navigation,
  route,
}: DoctorInfoProps) {
  const user = useAppSelector(userInfoSelector);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { staffId } = route.params;
  const [doctor, setDoctor] = React.useState<IStaff | null>(null);
  const toast = useToast();
  const handlePressMessage = async () => {
    if (!user) {
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Lỗi"
              description="Bạn phải đăng nhập mới thực hiện được tính năng này."
              status="error"
            />
          );
        },
      });
    } else {
      // Call API to create group chat
      await createGroupChat();
    }
  };
  const createGroupChat = async () => {
    // Call API to create group chat
    const response = await chatService.createGroupChat({
      groupName:
        user?.firstName +
        " " +
        user?.lastName +
        " - " +
        doctor?.users.firstName +
        " " +
        doctor?.users.lastName,
      maxMember: 2,
      type: "one-on-one",
      userList: [doctor?.users.id],
    });
    if (response.data) {
      navigationRef.current?.navigate("ChattingNavigator", {
        screen: "ChattingDetail",
        params: {
          group: response.data,
        },
      });
    } else {
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Lỗi"
              description="Không thể tạo được nhóm chat. Vui lòng thử lại sau."
              status="error"
            />
          );
        },
      });
    }
  };
  const getStaffInfo = async () => {
    // Call API to get staff info
    const response = await staffApi.getStaff(staffId.toString());
    if (response.data) {
      setDoctor(response.data);
    } else {
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
    getStaffInfo();
  }, [staffId]);
  return (
    <ScrollView
      maxW="90%"
      minW="90%"
      minH="95%"
      maxH="95%"
      mt="5%"
      alignSelf="center"
    >
      {!doctor && (
        <LoadingSpinner showLoading={isLoading} setShowLoading={setIsLoading} />
      )}
      {doctor && (
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
                helpers.checkImage(doctor.users.avatar)
                  ? { uri: doctor.users.avatar }
                  : require("../../assets/user.png")
              }
              size="2xl"
              mb={2}
            />

            <Text
              color={appColor.textTitle}
              fontWeight="extrabold"
              fontSize="17"
            >
              {doctor.users.firstName + " " + doctor.users.lastName}
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
                  {doctor?.users.address}
                </Text>
              </HStack>

              <HStack space={2} justifyContent="flex-start" width="full">
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={appColor.textSecondary}
                />
                <Text color={appColor.textSecondary}>
                  {doctor?.users.email}
                </Text>
              </HStack>
              <HStack space={2} justifyContent="flex-start" width="full">
                <Feather
                  color={appColor.textSecondary}
                  name="phone"
                  size={20}
                />
                <Text color={appColor.textSecondary}>
                  {doctor?.users.phone}
                </Text>
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
            <HStack space={2} justifyContent="flex-start" width="full">
              <Text color={appColor.textTitle} fontWeight="bold">
                Chuyên khoa:{" "}
              </Text>
              <Text ml={12} fontWeight="bold" color={appColor.textSecondary}>
                {doctor?.specialize}
              </Text>
            </HStack>
            <HStack mb={2} space={2} justifyContent="flex-start" width="full">
              <Text color={appColor.textTitle} fontWeight="bold">
                Số năm kinh nghiệm:{" "}
              </Text>
              <Text fontWeight="bold" color={appColor.textSecondary}>
                {doctor?.experience}
              </Text>
            </HStack>
            {doctor.description !== "" && doctor.description && (
              <HTMLView value={doctor?.description} />
            )}
            {doctor.description === "" ||
              (!doctor.description && <Text>Chưa có mô tả.</Text>)}
          </Box>
          <HStack justifyContent="space-between" space={4}>
            <Button
              backgroundColor={appColor.white}
              borderWidth={1}
              borderColor="secondary.300"
              _text={{
                color: "secondary.300",
              }}
              _pressed={{
                backgroundColor: "secondary.100",
              }}
              flex={1}
              onPress={() => {
                navigation.goBack();
              }}
            >
              Quay lại
            </Button>
            <Button
              flex={1}
              onPress={() => {
                handlePressMessage();
              }}
            >
              Nhắn tin
            </Button>
          </HStack>
        </Box>
      )}
    </ScrollView>
  );
}
