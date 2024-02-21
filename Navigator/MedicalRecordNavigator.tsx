import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { MedicalRecordNavigatorProps } from "./TabNavigator";
import MedicalRecordDetailScreen from "../screens/MedicalRecordSeeen/MedicalRecordDetailScreen";

export type MedicalRecordNavigatorParamList = {
  MedicalRecordDetail: undefined;
};

export type MedicalRecordDetailProps = NativeStackScreenProps<
  MedicalRecordNavigatorParamList,
  "MedicalRecordDetail"
>;

const MedicalRecordStackNavigator =
  createNativeStackNavigator<MedicalRecordNavigatorParamList>();

export default function MedicalRecordNavigator({
  navigation,
  route,
}: MedicalRecordNavigatorProps) {
  return (
    <MedicalRecordStackNavigator.Navigator initialRouteName="MedicalRecordDetail">
      <MedicalRecordStackNavigator.Screen
        name="MedicalRecordDetail"
        component={MedicalRecordDetailScreen}
        options={{
          headerShown: false,
          title: "Ho so benh an",
        }}
      />
    </MedicalRecordStackNavigator.Navigator>
  );
}
