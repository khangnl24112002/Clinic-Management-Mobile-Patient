import {
  Box,
  Button,
  HStack,
  Heading,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import { SubscriptionHistoryScreenProps } from "../../Navigator/SubscriptionNavigator";
import { appColor } from "../../theme";
import React from "react";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
export default function SubscriptionHistoryScreen({
  navigation,
  route,
}: SubscriptionHistoryScreenProps) {
  return (
    <VStack space={5}>
      <Box
        width="90%"
        backgroundColor="secondary.300"
        alignSelf="center"
        p={5}
        borderRadius={20}
        minHeight="1/5"
        height="1/4"
      >
        <VStack justifyContent="space-between" height="100%">
          <HStack justifyContent="space-between">
            <Fontisto
              name="shopping-package"
              size={25}
              color={appColor.white}
            />
            <Text color={appColor.white}>25.000đ/tháng</Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Heading color={appColor.white}>Gói Premium</Heading>
              <Text color={appColor.white}>Hạn dùng: 2/9/2024</Text>
            </VStack>
            <Pressable
              onPress={() => {
                navigation.navigate("SubscriptionDetail", {
                  subscriptionId: 1,
                });
              }}
            >
              <FontAwesome
                name="arrow-circle-right"
                size={35}
                color={appColor.white}
              />
            </Pressable>
          </HStack>
        </VStack>
      </Box>
      <Box width="90%" alignSelf="center">
        <Heading>Lịch sử mua gói</Heading>
      </Box>
      <ScrollView
        width="90%"
        alignSelf="center"
        minH="1/2"
        maxH="1/2"
        backgroundColor={appColor.white}
        borderRadius={20}
      >
        <VStack space={5} width="90%" alignSelf="center" my={5}>
          <Box backgroundColor="#DAD9FF" borderRadius={10} p={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <VStack>
                <Text fontSize={20}>Gói Premium</Text>
                <Text>10/02/2023, 12:24:45</Text>
              </VStack>
              <Text>250.000đ</Text>
            </HStack>
          </Box>
          <Box backgroundColor="#DAD9FF" borderRadius={10} p={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <VStack>
                <Text fontSize={20}>Gói Premium</Text>
                <Text>10/02/2023, 12:24:45</Text>
              </VStack>
              <Text>250.000đ</Text>
            </HStack>
          </Box>
          <Box backgroundColor="#DAD9FF" borderRadius={10} p={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <VStack>
                <Text fontSize={20}>Gói Premium</Text>
                <Text>10/02/2023, 12:24:45</Text>
              </VStack>
              <Text>250.000đ</Text>
            </HStack>
          </Box>
          <Box backgroundColor="#DAD9FF" borderRadius={10} p={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <VStack>
                <Text fontSize={20}>Gói Premium</Text>
                <Text>10/02/2023, 12:24:45</Text>
              </VStack>
              <Text>250.000đ</Text>
            </HStack>
          </Box>
          <Box backgroundColor="#DAD9FF" borderRadius={10} p={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <VStack>
                <Text fontSize={20}>Gói Premium</Text>
                <Text>10/02/2023, 12:24:45</Text>
              </VStack>
              <Text>250.000đ</Text>
            </HStack>
          </Box>
        </VStack>
      </ScrollView>
      <Button
        mt={6}
        width="90%"
        alignSelf="center"
        onPress={() => {
          navigation.goBack();
        }}
      >
        Quay lại
      </Button>
    </VStack>
  );
}
