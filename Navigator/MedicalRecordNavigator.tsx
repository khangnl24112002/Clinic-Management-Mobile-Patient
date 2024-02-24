import { useState, useEffect } from "react";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { MedicalRecordNavigatorProps } from "./TabNavigator";
import MedicalRecord from "../screens/MedicalRecordSeeen/MedicalRecord";
import MedicalRecordDetail from "../screens/MedicalRecordSeeen/MedicalRecordDetail";
import { IPatient, IMedicalRecord } from "../types";
import { patientApi } from "../services";
import { useAppSelector } from "../hooks";
import { ClinicSelector, userInfoSelector } from "../store";

export type MedicalRecordNavigatorParamList = {
  MedicalRecord: undefined;
  MedicalRecordDetail: { record: IMedicalRecord };
};

export type MedicalRecordProps = NativeStackScreenProps<
  MedicalRecordNavigatorParamList,
  "MedicalRecord"
>;

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

  const clinic = useAppSelector(ClinicSelector);
  const userInfo = useAppSelector(userInfoSelector);

  return (
    <MedicalRecordStackNavigator.Navigator initialRouteName="MedicalRecord">
      <MedicalRecordStackNavigator.Screen
        name="MedicalRecord"
        component={MedicalRecord}
        options={{
          headerShown: false,
          title: "Hồ sơ bệnh án",
        }}
      />
      <MedicalRecordStackNavigator.Screen
        name="MedicalRecordDetail"
        options={{
          title: "Chi tiết hồ sơ bệnh án",
          headerShown: false,
        }}
        component={MedicalRecordDetail}
      />
    </MedicalRecordStackNavigator.Navigator>
  );
}
