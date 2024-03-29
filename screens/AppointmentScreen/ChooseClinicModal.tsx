import {
  Box,
  HStack,
  ScrollView,
  Text,
  VStack,
  useToast,
  Image,
  Pressable,
  Avatar,
  Modal,
} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { appColor } from "../../theme";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { clinicService } from "../../services";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { userInfoSelector, updateClinic, ClinicSelector } from "../../store";
import ToastAlert from "../../components/Toast/Toast";
import { IClinicInfo } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
import { helpers } from "../../utils/helper";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  handleNavigate: (clinic: IClinicInfo) => void;
}

// Validate

export default function ClinicServiceModal({ isOpen, onClose, handleNavigate }: IProps) {
  const toast = useToast();
  const navigation = useNavigation<any>();
  const [searchString, setSearchString] = useState<string>("");
  const [debounced] = useDebounce(searchString, 500);
  const [clinicList, setClinicList] = useState<IClinicInfo[]>([]);
  const getClinic = async () => {
    try {
      const response = await clinicService.getAllClinicForPatient(searchString);
      if (response.data) {
        setClinicList(response.data);
      }
    } catch (error) {
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Lỗi"
              description="Có lỗi xảy ra. Vui lòng thử lại sau."
              status="error"
            />
          );
        },
      });
    }
  };
  const [showLoading, setShowLoading] = useState<boolean>(false);
  useFocusEffect(
    useCallback(() => {
      setShowLoading(true);
      getClinic();
      setShowLoading(false);
    }, [])
  );
  useEffect(() => {
    getClinic();
  }, [debounced]);

  const onChangeSearchString = (query: string) => {
    setSearchString(query);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content width="90%">
        <Modal.CloseButton />
        <Modal.Header>
          <Text fontWeight={"bold"}>Mời chọn phòng khám!</Text>
        </Modal.Header>
        <Modal.Body>
          <VStack
            space={5}
            maxW="100%"
            minW="100%"
            mt="5%"
            maxH="95%"
            minH="95%"
            alignSelf="center"
            mb="60%"
          >
            {clinicList.length ? (
              <Box
                alignSelf="center"
                backgroundColor={appColor.white}
                borderRadius={20}
                width="full"
                height="full"
                p={0}
              >
                <Searchbar
                  style={{ height: 40, marginBottom: 15 }}
                  placeholder="Tìm kiếm"
                  onChangeText={onChangeSearchString}
                  value={searchString}
                  inputStyle={{
                    paddingBottom: 20,
                    paddingTop: 5,
                    fontSize: 15,
                    color: appColor.textTitle,
                  }}
                  placeholderTextColor={appColor.textSecondary}
                />
                <ScrollView>
                  <VStack space={5}>
                    {clinicList.map((clinicItem: IClinicInfo, index: any) => {
                      return (
                        <Pressable
                          onPress={() => handleNavigate(clinicItem)}
                          key={index}
                          backgroundColor="#DAD9FF"
                          borderRadius={15}
                          p={3}
                          _pressed={{
                            backgroundColor: "primary.100",
                          }}
                        >
                          <Text
                            fontSize={18}
                            fontWeight="bold"
                            color={appColor.textTitle}
                            alignSelf="center"
                            mb={2}
                          >
                            {clinicItem.name}
                          </Text>
                          <HStack alignItems="center" space={2}>
                            <Avatar
                              bg="gray.200"
                              source={
                                helpers.checkImage(clinicItem.logo)
                                  ? { uri: clinicItem.logo }
                                  : require("../../assets/images/clinics/default_image_clinic.png")
                              }
                              size="lg"
                            />
                            <VStack space={2} maxW="70%">
                              <HStack>
                                <Ionicons
                                  name="location-outline"
                                  size={22}
                                  color={appColor.textSecondary}
                                />
                                <Text ml={1} color={appColor.textSecondary}>
                                  {clinicItem.address}
                                </Text>
                              </HStack>

                              <HStack>
                                <MaterialCommunityIcons
                                  name="email-outline"
                                  size={20}
                                  color={appColor.textSecondary}
                                />
                                <Text ml={1} color={appColor.textSecondary}>
                                  {clinicItem.email}
                                </Text>
                              </HStack>
                              <HStack>
                                <Feather
                                  color={appColor.textSecondary}
                                  name="phone"
                                  size={20}
                                />
                                <Text ml={1} color={appColor.textSecondary}>
                                  {clinicItem.phone}
                                </Text>
                              </HStack>
                            </VStack>
                          </HStack>
                        </Pressable>
                      );
                    })}
                  </VStack>
                </ScrollView>
              </Box>
            ) : (
              <Box
                alignSelf="center"
                backgroundColor={appColor.white}
                borderRadius={20}
                width="full"
                height="full"
                p={5}
              >
                <Text>Hiện tại chưa có phòng khám nào</Text>
              </Box>
            )}
          </VStack>
        </Modal.Body>
        
      </Modal.Content>
    </Modal>
  );
}
