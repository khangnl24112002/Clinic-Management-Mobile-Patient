import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { AppointmentNavigatorProps } from "./TabNavigator";
import CalendarScreen from "../screens/AppointmentScreen/CalendarScreen";
import CreateTaskScreen from "../screens/AppointmentScreen/CreateTaskScreen";
import { IClinicInfo } from "../types";

export type AppointmentNavigatorParamList = {
  AppointmentScreen: undefined;
  BookAppointmentScreen: {clinic: IClinicInfo};
};

export type AppointmentScreenProps = NativeStackScreenProps<
  AppointmentNavigatorParamList,
  "AppointmentScreen"
>;

export type BookAppointmentScreenProps = NativeStackScreenProps<
  AppointmentNavigatorParamList,
  "BookAppointmentScreen"
>;

const AppointmentStackNavigator =
  createNativeStackNavigator<AppointmentNavigatorParamList>();

export default function AppointmentNavigator({
  navigation,
  route,
}: AppointmentNavigatorProps) {
  return (
    <AppointmentStackNavigator.Navigator initialRouteName="AppointmentScreen">
      <AppointmentStackNavigator.Screen
        name="AppointmentScreen"
        component={CalendarScreen}
        options={{
          headerShown: false,
          title: "Lịch hẹn khám",
        }}
      />
      <AppointmentStackNavigator.Screen
        name="BookAppointmentScreen"
        component={CreateTaskScreen}
        options={{
          headerShown: false,
          title: "Đặt lịch hẹn",
        }}
      />
    </AppointmentStackNavigator.Navigator>
  );
}
