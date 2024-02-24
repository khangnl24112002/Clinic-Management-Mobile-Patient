import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";
import { NewsNavigatorProps } from "./TabNavigator";
import NewsScreen from "../screens/NewsScreen/NewsScreen";
import NewsDetailScreen from "../screens/NewsScreen/NewsDetailScreen";

export type NewsStackParamList = {
  News: undefined;
  NewsDetail: {
    newsId: number;
  };
};

export type NewsScreenProps = NativeStackScreenProps<
  NewsStackParamList,
  "News"
>;
export type NewsDetailScreenProps = NativeStackScreenProps<
  NewsStackParamList,
  "NewsDetail"
>;

const NewsStackNavigator = createNativeStackNavigator<NewsStackParamList>();

export default function NewsNavigator({
  navigation,
  route,
}: NewsNavigatorProps) {
  return (
    <NewsStackNavigator.Navigator initialRouteName="News">
      <NewsStackNavigator.Screen
        name="News"
        component={NewsScreen}
        options={{ headerShown: false }}
      />
      <NewsStackNavigator.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{ headerShown: false }}
      />
    </NewsStackNavigator.Navigator>
  );
}
