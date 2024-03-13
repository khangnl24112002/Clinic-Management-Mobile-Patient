import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteClinic, logout, userInfoSelector } from "../../store";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/auth";
import AddNewPasswordModal from "./AddNewPasswordModal";
import {
  Button,
  View,
  Text,
  Box,
  Avatar,
  Image,
  Stack,
  Icon,
  FormControl,
  HStack,
  VStack,
} from "native-base";
import { UserProfileScreenProps } from "../../Navigator/ProfileNavigator";
import { appColor } from "../../theme";
import { FCMConfig } from "../../config/firebaseCloudMessage";
import dayjs from "dayjs";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import messaging from "@react-native-firebase/messaging";
import { notificationService } from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdateUserInfoScreenModal from "./UpdateProfileScreenModal";

const ProfileScreen = ({ navigation, route }: UserProfileScreenProps) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const { setLogout } = route.params;
  const userInfo = useAppSelector(userInfoSelector);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const handleChangeUserInfo = () => {
    setIsOpenUpdateModal(true);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    // Call API to delete FCM token saved in server
    try {
      const token = await messaging().getToken();
      if (userInfo) {
        const response = await notificationService.deleteFCMToken(
          userInfo.id,
          token
        );
      }
    } catch (error) {
      console.log(error);
    }
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    dispatch(logout());
    dispatch(deleteClinic());
    setLogout();
    setIsLoading(false);
  };

  // useEffect(() => {
  //   FCMConfig(userInfo?.id);
  // }, []);
  return (
    <Box
      bgColor="#fff"
      width="90%"
      alignSelf="center"
      alignItems="center"
      p={5}
      borderBottomRadius={20}
    >
      {userInfo?.isInputPassword ? (
        <></>
      ) : (
        <AddNewPasswordModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <UpdateUserInfoScreenModal
        isOpen={isOpenUpdateModal}
        onClose={() => {
          setIsOpenUpdateModal(false);
        }}
      />
      <Box
        width="full"
        alignItems="center"
        py={3}
        mb={3}
        borderBottomWidth={1}
        borderBottomColor="#EDEDF2"
      >
        <LoadingSpinner showLoading={isLoading} setShowLoading={setIsLoading} />
        <Avatar
          alignSelf="center"
          bg="grey"
          source={
            userInfo?.avatar
              ? { uri: userInfo.avatar }
              : require("../../assets/user.png")
          }
          size="2xl"
          mb={2}
        />

        <Text color={appColor.textTitle} fontWeight="extrabold" fontSize="17">
          {userInfo?.firstName + " " + userInfo?.lastName}
        </Text>
        <Text color={appColor.textSecondary}>{userInfo?.email}</Text>
      </Box>
      <Box alignItems="flex-start" width="100%">
        <VStack space="5">
          <HStack justifyContent="space-between" width="full">
            <Text flex={1} fontWeight="bold" color={appColor.textSecondary}>
              Họ và tên
            </Text>
            <Text flex={2} textAlign="right" color={appColor.textSecondary}>
              {userInfo?.firstName + " " + userInfo?.lastName}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text flex={1} fontWeight="bold" color={appColor.textSecondary}>
              Địa chỉ
            </Text>
            <Text flex={2} textAlign="right" color={appColor.textSecondary}>
              {userInfo?.address ? userInfo.address : "Chưa cập nhật"}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text flex={1} fontWeight="bold" color={appColor.textSecondary}>
              Giới tính
            </Text>
            <Text flex={2} textAlign="right" color={appColor.textSecondary}>
              {userInfo?.gender === 1
                ? "Nam"
                : userInfo?.gender === 0
                ? "Nữ"
                : "Chưa cập nhật"}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text flex={1} fontWeight="bold" color={appColor.textSecondary}>
              Email
            </Text>
            <Text flex={2} textAlign="right" color={appColor.textSecondary}>
              {userInfo?.email}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text flex={1} fontWeight="bold" color={appColor.textSecondary}>
              Ngày sinh
            </Text>
            <Text flex={2} textAlign="right" color={appColor.textSecondary}>
              {userInfo?.phone
                ? dayjs(userInfo?.birthday).format("DD/MM/YYYY")
                : "Chưa cập nhật"}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" width="full">
            <Text flex={1} fontWeight="bold" color={appColor.textSecondary}>
              Số điện thoại
            </Text>
            <Text flex={2} textAlign="right" color={appColor.textSecondary}>
              {userInfo?.phone ? userInfo.phone : "Chưa cập nhật"}
            </Text>
          </HStack>
          <HStack width="full" space={5}>
            <Button flex={1} onPress={handleChangeUserInfo}>
              Cập nhật
            </Button>
            <Button
              backgroundColor="primary.300"
              _pressed={{
                backgroundColor: "primary.400",
              }}
              flex={1}
              onPress={handleLogout}
            >
              Đăng xuất
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileScreen;
