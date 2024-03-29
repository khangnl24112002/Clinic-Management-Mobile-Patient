import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ClinicNavigatorProps } from "./TabNavigator";
import ClinicListScreen from "../screens/ClinicScreen/ClinicListScreen";
import ClinicDetailScreen from "../screens/ClinicScreen/ClinicDetailScreen";
import DoctorInfoScreen from "../screens/ClinicScreen/DoctorInfoScreen";

export type ClinicNavigatorParamList = {
  ClinicList: undefined;
  ClinicDetail: {
    clinicId: string;
  };
  DoctorInfo: {
    staffId: number;
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

export type DoctorInfoProps = NativeStackScreenProps<
  ClinicNavigatorParamList,
  "DoctorInfo"
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
        }}
      />
      <ClinicStackNavigator.Screen
        name="ClinicDetail"
        component={ClinicDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <ClinicStackNavigator.Screen
        name="DoctorInfo"
        component={DoctorInfoScreen}
        options={{
          headerShown: false,
        }}
      />
    </ClinicStackNavigator.Navigator>
  );
}
