import React from "react";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Login from "../screens/AuthenticationScreen/Login/LoginScreen";
import { AuthenticationNavigatorProps } from "./TabNavigator";
import { IUserInfo } from "../types";
import RegisterScreen from "../screens/AuthenticationScreen/Register/RegisterScreen";
import ValidateNotification from "../screens/AuthenticationScreen/ValidateNotification/ValidateNotification";

export type AuthenticationStackParamList = {
  Login: {
    setLogin: (user: IUserInfo | null, token: string | null) => void | any;
  };
  Register: {
    setLogin: (user: IUserInfo | null, token: string | null) => void | any;
  };
  ValidateNotification: {
    setLogin: (user: IUserInfo | null, token: string | null) => void | any;
    email: string;
  };
};

export type LoginScreenProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  "Login"
>;

export type RegisterScreenProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  "Register"
>;

export type ValidateNotificationProps = NativeStackScreenProps<
  AuthenticationStackParamList,
  "ValidateNotification"
>;

const AuthenticationStackNavigator =
  createNativeStackNavigator<AuthenticationStackParamList>();

export default function AuthenticationNavigator({
  navigation,
  route,
}: AuthenticationNavigatorProps) {
  const { setLogin } = route.params;
  return (
    <AuthenticationStackNavigator.Navigator initialRouteName="Login">
      <AuthenticationStackNavigator.Screen
        name="Login"
        component={Login}
        initialParams={{ setLogin: setLogin }}
        options={{ headerShown: false }}
      />
      <AuthenticationStackNavigator.Screen
        name="Register"
        component={RegisterScreen}
        initialParams={{ setLogin: setLogin }}
        options={{ headerShown: false }}
      />
      <AuthenticationStackNavigator.Screen
        name="ValidateNotification"
        component={ValidateNotification}
        initialParams={{ setLogin: setLogin }}
        options={{ headerShown: false }}
      />
    </AuthenticationStackNavigator.Navigator>
  );
}
