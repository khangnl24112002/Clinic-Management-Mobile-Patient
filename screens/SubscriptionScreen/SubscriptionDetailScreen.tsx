import {
  Text,
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  VStack,
  View,
  useToast,
} from "native-base";
import { SubscriptionDetailScreenProps } from "../../Navigator/SubscriptionNavigator";
import { useAppSelector } from "../../hooks";
import { userInfoSelector } from "../../store";
import { appColor } from "../../theme";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { subscriptionService } from "../../services";
import ToastAlert from "../../components/Toast/Toast";

export default function SubscriptionDetailScreen({
  navigation,
  route,
}: SubscriptionDetailScreenProps) {
  const { subscriptionId } = route.params;
  const userInfo = useAppSelector(userInfoSelector);
  const [subscription, setSubscription] = useState<any>(null);
  const toast = useToast();
  // Call API to get subscription detail
  useEffect(() => {
    const getSubscriptionUsing = async () => {
      // Call API to get plan that user is using it
      // (fake data: using plan has id = 1)
      try {
        const response = await subscriptionService.getUserSubscriptionById(
          subscriptionId
        );
        console.log(response);
        // If success, save subscription in state
        if (response.status) {
          setSubscription(response.data);
        } else {
          setSubscription(null);
        }
      } catch (error) {
        toast.show({
          render: () => {
            return (
              <ToastAlert
                title="Lỗi"
                description="Không tồn tại gói này trong danh sách. Vui lòng thử lại sau."
                status="error"
              />
            );
          },
        });
      }
    };
    getSubscriptionUsing();
  }, []);
  return (
    <>
      {subscription ? (
        <Box>
          <Box
            width="90%"
            alignSelf="center"
            alignItems="center"
            borderRadius={20}
            backgroundColor={appColor.white}
            p={5}
            borderColor={appColor.backgroundPrimary}
            borderWidth={2}
            mt={5}
          >
            <Box
              width="full"
              alignItems="center"
              justifyContent="center"
              height="1/5"
            >
              <HStack space={10} alignItems="center" justifyContent="center">
                <Fontisto
                  name="shopping-package"
                  size={50}
                  color={appColor.primary}
                />
                <Heading fontSize={40} color={appColor.primary}>
                  {subscription.planName}
                </Heading>
              </HStack>
            </Box>
            <Box alignItems="flex-start" width="100%" minH="80">
              <VStack space="5">
                <HStack width="full">
                  <Heading size="md">{subscription.description}</Heading>
                </HStack>
                {/**Render list of options in subscription */}
                {subscription.planOptions.map((option: any, index: any) => {
                  return (
                    <HStack
                      key={index}
                      space={2}
                      justifyContent="flex-start"
                      alignItems="center"
                      width="full"
                    >
                      <FontAwesome
                        name="check-circle"
                        size={30}
                        color={appColor.backgroundPrimary}
                      />
                      <Text fontSize={15} color={appColor.textTitle}>
                        {option.optionName}
                      </Text>
                    </HStack>
                  );
                })}
              </VStack>
            </Box>
            <Box width="full" alignItems="center" py={3} mb={3}>
              <Button disabled width="full">
                <Text color={appColor.white}>
                  Hạn dùng: {subscription.duration} day
                </Text>
              </Button>
            </Box>
          </Box>
          <Button
            mt={16}
            width="90%"
            alignSelf="center"
            onPress={() => {
              navigation.goBack();
            }}
          >
            Quay lại
          </Button>
        </Box>
      ) : (
        <Box>
          {/* Put loading spinner here */}
          <Text>Unknown error</Text>
        </Box>
      )}
    </>
  );
}
