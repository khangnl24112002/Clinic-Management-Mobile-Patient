import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ClinicNavigatorProps } from "./TabNavigator";
import ClinicListScreen from "../screens/ClinicScreen/ClinicListScreen";
import ClinicDetailScreen from "../screens/ClinicScreen/ClinicDetailScreen";

export type ClinicNavigatorParamList = {
  ClinicList: undefined;
  ClinicDetail: {
    clinicId: string;
  };
};

export type ClinicDetailProps = NativeStackScreenProps<
  ClinicNavigatorParamList,
  "ClinicDetail"
>;

export type ClinicListProps = NativeStackScreenProps<
  ClinicNavigatorParamList,
  "ClinicList"
>;

const ClinicStackNavigator =
  createNativeStackNavigator<ClinicNavigatorParamList>();

export default function ClinicNavigator({
  navigation,
  route,
}: ClinicNavigatorProps) {
  return (
    <ClinicStackNavigator.Navigator initialRouteName="ClinicList">
      <ClinicStackNavigator.Screen
        name="ClinicList"
        component={ClinicListScreen}
        options={{
          headerShown: false,
          title: "Phòng khám",
        }}
      />
      <ClinicStackNavigator.Screen
        name="ClinicDetail"
        component={ClinicDetailScreen}
        options={{
          headerShown: false,
          title: "Phòng khám",
        }}
      />
    </ClinicStackNavigator.Navigator>
  );
}
