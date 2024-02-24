import {
  Box,
  Button,
  Heading,
  Text,
  useToast,
  Image,
  ScrollView,
  HStack,
} from "native-base";

import { NewsDetailScreenProps } from "../../Navigator/NewsNavigator";
import React, { useEffect, useState } from "react";
import { appColor } from "../../theme";
import { newsServiceApi } from "../../services/news.service";
import { INews } from "../../types/news.type";
import ToastAlert from "../../components/Toast/Toast";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import HTMLView from "react-native-htmlview";
import dayjs from "dayjs";
import { Entypo } from "@expo/vector-icons";
import { helpers } from "../../utils/helper";

export default function NewsDetailScreen({
  navigation,
  route,
}: NewsDetailScreenProps) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [news, setNews] = useState<INews | null>(null);
  const { newsId } = route.params;
  const getNewsDetail = async () => {
    const response = await newsServiceApi.getNewsDetail(newsId);
    if (response.data) {
      setNews(response.data);
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
    setIsLoading(true);
    getNewsDetail();
    setIsLoading(false);
  }, [newsId]);
  return (
    <Box maxW="90%" minW="90%" mt="5%" maxH="95%" minH="95%" alignSelf="center">
      <Box
        alignSelf="center"
        backgroundColor={appColor.white}
        borderRadius={20}
        width="full"
        height="full"
        p={5}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {!news && (
            <LoadingSpinner
              showLoading={isLoading}
              setShowLoading={setIsLoading}
            />
          )}
          {news && (
            <Box>
              {helpers.checkImage(news.logo) && (
                <Image
                  size="2xl"
                  w="full"
                  alt={news.clinicId}
                  source={{ uri: news.logo }}
                  borderRadius={20}
                  alignSelf="center"
                  mb={2}
                />
              )}
              <Heading>{news.title}</Heading>
              <Box borderTopColor="#EDEDF2" borderTopWidth={1} py={3} mt={2}>
                <HStack
                  mb={2}
                  space={2}
                  alignItems="flex-end"
                  justifyContent="flex-end"
                >
                  <Entypo name="calendar" size={24} color="black" />
                  <Text fontStyle="italic">
                    {dayjs(news.updatedAt).format("DD/MM/YYYY HH:mm:ss")}
                  </Text>
                </HStack>
                <HTMLView value={news.content} />
              </Box>
            </Box>
          )}
        </ScrollView>
      </Box>
    </Box>
  );
}
