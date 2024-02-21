import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { AppointmentNavigatorProps } from "./TabNavigator";
import AppointmentDetailScreen from "../screens/AppointmentScreen/AppointmentDetailScreen";

export type AppointmentNavigatorParamList = {
  AppointmentDetail: undefined;
};

export type AppointmentDetailProps = NativeStackScreenProps<
  AppointmentNavigatorParamList,
  "AppointmentDetail"
>;

const AppointmentStackNavigator =
  createNativeStackNavigator<AppointmentNavigatorParamList>();

export default function AppointmentNavigator({
  navigation,
  route,
}: AppointmentNavigatorProps) {
  return (
    <AppointmentStackNavigator.Navigator initialRouteName="AppointmentDetail">
      <AppointmentStackNavigator.Screen
        name="AppointmentDetail"
        component={AppointmentDetailScreen}
        options={{
          headerShown: false,
          title: "zzz",
        }}
      />
    </AppointmentStackNavigator.Navigator>
  );
}
