import * as React from "react";
import { DoctorNavigatorProps } from "./StackNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppointmentScreen from "../screens/DoctorScreen/AppointmentScreen/AppointmentScreen";
import ProfileNavigator from "./ProfileNavigator";
import { appColor } from "../theme";
import CustomDrawer from "../components/CustomDrawer/CustomDrawer";
import { Ionicons } from "@expo/vector-icons";
import ChattingNavigator from "./ChattingNavigator";

export type DoctorNavigatorDrawerParamList = {
  // undefined: the route doesn't have params
  ProfileNavigator: undefined;
  Appointment: undefined;
  ChattingNavigator: undefined;
};
export type ProfileNavigatorProps = NativeStackScreenProps<
  DoctorNavigatorDrawerParamList,
  "ProfileNavigator"
>;

const DoctorNavigatorDrawer =
  createDrawerNavigator<DoctorNavigatorDrawerParamList>();

export default function DoctorScreen({
  navigation,
  route,
}: DoctorNavigatorProps) {
  const { setLogout } = route.params;
  return (
    <DoctorNavigatorDrawer.Navigator
      initialRouteName="ProfileNavigator"
      screenOptions={{
        headerStyle: {
          backgroundColor: appColor.background,
        },
        headerTintColor: appColor.title,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        drawerStyle: {
          backgroundColor: appColor.background,
        },
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: appColor.primary,
        drawerInactiveTintColor: appColor.primary,
      }}
      drawerContent={(props) => <CustomDrawer {...props} logOut={setLogout} />}
    >
      <DoctorNavigatorDrawer.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          title: "Tài khoản",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
      <DoctorNavigatorDrawer.Screen
        name="ChattingNavigator"
        options={{
          title: "Nhắn tin",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
        component={ChattingNavigator}
      />
      <DoctorNavigatorDrawer.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{
          title: "Lich hen",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </DoctorNavigatorDrawer.Navigator>
  );
}
