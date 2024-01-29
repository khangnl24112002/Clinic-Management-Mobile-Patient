import React from "react";
import { NotificationNavigatorProps } from "./UserNavigator";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import NotificationListScreen from "../screens/NotificationScreen/NotificationListScreen";

export type NotificationStackParamList = {
  NotificationList: undefined;
};

export type NotificationListScreenProps = NativeStackScreenProps<
  NotificationStackParamList,
  "NotificationList"
>;

const NotificationStackNavigator =
  createNativeStackNavigator<NotificationStackParamList>();

export default function NotificationNavigator({
  navigation,
  route,
}: NotificationNavigatorProps) {
  return (
    <NotificationStackNavigator.Navigator initialRouteName="NotificationList">
      <NotificationStackNavigator.Screen
        name="NotificationList"
        component={NotificationListScreen}
        options={{ headerShown: false }}
      />
    </NotificationStackNavigator.Navigator>
  );
}
