import {
  Box,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";

import { NewsScreenProps } from "../../Navigator/NewsNavigator";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { newsServiceApi } from "../../services/news.service";
import { INews } from "../../types/news.type";
import ToastAlert from "../../components/Toast/Toast";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { appColor } from "../../theme";
import { helpers } from "../../utils/helper";
import { useDebounce } from "use-debounce";
import { Searchbar } from "react-native-paper";

export default function NewsScreen({ navigation, route }: NewsScreenProps) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newsList, setNewsList] = useState<INews[] | null>(null);
  const [searchString, setSearchString] = useState<string>("");
  const [debounced] = useDebounce(searchString, 500);
  const [page, setPage] = useState<number>(0);
  const getClinicNews = async (page: number) => {
    const response = await newsServiceApi.getAllNews(
      searchString,
      true,
      4,
      page
    );
    if (response.data) {
      {
        if (newsList !== null) {
          setNewsList([...newsList, ...response.data.data]);
        } else {
          setNewsList(response.data.data);
        }
      }
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
  const onChangeSearchString = (query: string) => {
    setSearchString(query);
  };
  useEffect(() => {
    setIsLoading(true);
    getClinicNews(page);
    setIsLoading(false);
  }, [page, debounced]);
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
        {!newsList && (
          <LoadingSpinner
            showLoading={isLoading}
            setShowLoading={setIsLoading}
          />
        )}
        {newsList && !newsList.length && (
          <Text>Hiện tại không có tin tức nào.</Text>
        )}
        {newsList && newsList.length && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={newsList}
            onEndReached={() => setPage(page + 1)}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => {
              return (
                <Pressable
                  key={item.createdAt}
                  _pressed={{ backgroundColor: "#DAD9FF" }}
                  p={3}
                  borderRadius={20}
                  backgroundColor={appColor.background}
                  alignItems="center"
                  mb={4}
                  onPress={() => {
                    navigation.navigate("NewsDetail", { newsId: item.id });
                  }}
                >
                  <Image
                    minW="full"
                    maxW="full"
                    size="2xl"
                    alignSelf="center"
                    borderRadius={20}
                    source={
                      helpers.checkImage(item.logo)
                        ? { uri: item.logo }
                        : require("../../assets/images/clinics/default_noti.png")
                    }
                    alt={item.clinicId}
                  />
                  <Text mt={2} fontWeight="bold" color={appColor.textTitle}>
                    {item.title}
                  </Text>
                </Pressable>
              );
            }}
          />
        )}
      </Box>
    </Box>
  );
}
