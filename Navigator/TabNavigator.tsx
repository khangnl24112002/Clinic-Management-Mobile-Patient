import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HStack, NativeBaseProvider, Text, useToast } from "native-base";
import { ILoginResponse, IUserInfo } from "../types";
import { useAppDispatch } from "../hooks";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { logout, restoreUserInfo } from "../store";
import ToastAlert from "../components/Toast/Toast";
import firebase from "firebase/compat";
import { firebaseConfig } from "../config/firebase";
import SplashScreen from "../screens/AuthenticationScreen/SplashScreen/SplashScreen";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { appColor, theme } from "../theme";
import { ReactNavigationTheme } from "../config/react-navigation.theme";
import AuthenticationNavigator from "./AuthenticationNavigator";
import ProfileNavigator from "./ProfileNavigator";
import NewsNavigator from "./NewsNavigator";
import MedicalRecordNavigator from "./MedicalRecordNavigator";
import ClinicNavigator from "./ClinicNavigator";
import LandingPageScreen from "../screens/LandingPageScreen/LandingPageScreen";
import AppointmentNavigator from "./AppointmentNavigator";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ChattingNavigator from "./ChattingNavigator";
import NotificationNavigator from "./NotificationNavigator";
import "core-js/stable/atob";
export type RootNativeTabParamList = {
  AuthenticationNavigator: {
    setLogin: (user: IUserInfo | null, token: string | null) => void | any;
  };
  ProfileNavigator: {
    setLogout: () => void;
  };
  NewsNavigator: { screen: any; params: any };
  MedicalRecordNavigator: undefined;
  ClinicNavigator: undefined;
  LandingPageScreen: {
    setLogin: (user: IUserInfo | null, token: string | null) => void | any;
  };
  AppointmentNavigator: undefined;
  ChattingNavigator: { screen: any; params: any };
  NotificationNavigator: undefined;
};

export const navigationRef =
  React.createRef<NavigationContainerRef<RootNativeTabParamList>>();

const RootTab = createBottomTabNavigator<RootNativeTabParamList>();

export type AuthenticationNavigatorProps = BottomTabScreenProps<
  RootNativeTabParamList,
  "AuthenticationNavigator"
>;

export type ProfileNavigatorProps = BottomTabScreenProps<
  RootNativeTabParamList,
  "ProfileNavigator"
>;

export type NewsNavigatorProps = BottomTabScreenProps<
  RootNativeTabParamList,
  "NewsNavigator"
>;

export type MedicalRecordNavigatorProps = BottomTabScreenProps<
  RootNativeTabParamList,
  "MedicalRecordNavigator"
>;

export type ClinicNavigatorProps = BottomTabScreenProps<
  RootNativeTabParamList,
  "ClinicNavigator"
>;

export type LandingPageScreenProps = BottomTabScreenProps<
  RootNativeTabParamList,
  "LandingPageScreen"
>;

export type AppointmentNavigatorProps = BottomTabScreenProps<
  RootNativeTabParamList,
  "AppointmentNavigator"
>;
export type ChattingNavigatorProps = BottomTabScreenProps<
  RootNativeTabParamList,
  "ChattingNavigator"
>;
export type NotificationNavigatorProps = BottomTabScreenProps<
  RootNativeTabParamList,
  "NotificationNavigator"
>;

const TabNavigator = () => {
  const toast = useToast();
  // define userToken for validation
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<IUserInfo | null>(null);

  // Set loading state to render splash screen
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useAppDispatch();

  // Ignore unessessary notifications
  React.useEffect(() => {
    LogBox.ignoreAllLogs(); //Ignore all log notifications
  }, []);

  // Define two function to handle login and logout
  const setLogin = (user: IUserInfo | null, token: string | null) => {
    setUser(user);
    setToken(token);
  };
  const setLogout = () => {
    setUser(null);
    setToken(null);
  };

  // Running before render
  const bootstrapAsync = useCallback(async () => {
    try {
      // await AsyncStorage.removeItem("user");
      // await AsyncStorage.removeItem("token");
      // Restore userInfo and dispatch to the store
      const testData = await AsyncStorage.getItem("user");
      const tokenString = await AsyncStorage.getItem("token");
      if (tokenString && testData) {
        // Check token expired
        const decodeToken = jwtDecode(tokenString);
        const exp = decodeToken.exp ? decodeToken.exp * 1000 : 0;
        const expDate = new Date(exp);
        const currentDate = new Date();
        if (expDate < currentDate) {
          // Token is expired
          console.log("Token is expired!");
          await AsyncStorage.removeItem("user");
          await AsyncStorage.removeItem("token");
          logout();
          setLogout();
        }
        const testDataObject = JSON.parse(testData);
        setLogin(testDataObject, tokenString);
        const UserResponseObject: ILoginResponse = {
          user: testDataObject,
          token: tokenString,
        };
        dispatch(restoreUserInfo(UserResponseObject));
      } else {
        setLogout();
      }
    } catch (e) {
      // Restoring token failed
      console.log(e);
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Lỗi"
              description="Phiên hoạt động của bạn đã hết. Vui lòng đăng xuất ra khỏi ứng dụng và đăng nhập lại."
              status="error"
            />
          );
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // this useEffect function is used to initialize firebase app and firebase cloud message config
  // and bootstrap the app (get token, user from storage and save them to reducer)
  React.useEffect(() => {
    // init firebase app
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // init FCM config
    // bootstrap the app
    bootstrapAsync();
  }, [bootstrapAsync]);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }
  // console.log("USER", user);
  // console.log("TOKEN", token);

  const HandleDeepLinking = () => {
    const handleLink = async (link: any) => {
      console.log("Handle deep link");
      console.log("Link: ", link);
      // assume the data in url is the object like this
      if (link.url === "https://clinus.netlify.app/clinic/quan-ly-goi") {
        const navigation = navigationRef.current;
        if (navigation) {
          // Sửa ở đây
          // navigation.navigate("UserNavigator", {
          //   screen: "ClinicListNavigator",
          //   params: { setLogout },
          // });
        }
      }
      if (link.url === "https://clinus.page.link/verify-account") {
        const navigation = navigationRef.current;
        if (navigation) {
          // Sửa ở đây
          // navigation.navigate("Login", { setLogin });
        }
      }
    };
    useEffect((): any => {
      const unsubscribe = dynamicLinks().onLink(handleLink);
      return () => unsubscribe();
    }, []);
    useEffect(() => {
      dynamicLinks()
        .getInitialLink()
        .then((link: any) => {
          // console.log("Initial link: ", link);
        });
    }, []);
    return null;
  };

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer theme={ReactNavigationTheme} ref={navigationRef}>
        <HandleDeepLinking />
        <RootTab.Navigator
          initialRouteName="LandingPageScreen"
          screenOptions={({ route }) => ({
            headerTitleAlign: "center",
            headerTintColor: appColor.title,
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerStyle: {
              backgroundColor: appColor.white,
            },

            tabBarLabel: ({ focused, color }) => {
              if (focused) {
                switch (route.name) {
                  case "AppointmentNavigator":
                    return (
                      <Text fontSize={10} color={color}>
                        Lịch hẹn
                      </Text>
                    );
                  case "AuthenticationNavigator":
                    return (
                      <Text fontSize={10} color={color}>
                        Tài khoản
                      </Text>
                    );
                  case "ClinicNavigator":
                    return (
                      <Text fontSize={10} color={color}>
                        Phòng khám
                      </Text>
                    );
                  case "LandingPageScreen":
                    return (
                      <Text fontSize={10} color={color}>
                        Trang chủ
                      </Text>
                    );
                  case "MedicalRecordNavigator":
                    return (
                      <Text fontSize={10} color={color}>
                        Hồ sơ
                      </Text>
                    );
                  case "ProfileNavigator":
                    return (
                      <Text fontSize={10} color={color}>
                        Tài khoản
                      </Text>
                    );
                  case "NewsNavigator":
                    return (
                      <Text fontSize={10} color={color}>
                        Tin tức
                      </Text>
                    );
                  case "ChattingNavigator":
                    return (
                      <Text fontSize={10} color={color}>
                        Nhắn tin
                      </Text>
                    );
                  case "NotificationNavigator":
                    return (
                      <Text fontSize={10} color={color}>
                        Thông báo
                      </Text>
                    );
                }
              }
              // Kiểm tra xem tab hiện tại có trong mảng các tab cần hiển thị tiêu đề không
            },
          })}
        >
          <RootTab.Screen
            name="LandingPageScreen"
            component={LandingPageScreen}
            initialParams={{ setLogin: setLogin }}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                return <MaterialIcons name="home" size={size} color={color} />;
              },
            }}
          />

          <RootTab.Screen
            name="NewsNavigator"
            component={NewsNavigator}
            options={{
              headerTitle: "Tin tức",
              tabBarIcon: ({ focused, color, size }) => {
                return (
                  <MaterialCommunityIcons
                    name="newspaper"
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarItemStyle: {
                display: "none",
              },
            }}
          />
          <RootTab.Screen
            name="MedicalRecordNavigator"
            component={MedicalRecordNavigator}
            options={{
              headerTitle: "Hồ sơ bệnh án",
              tabBarIcon: ({ focused, color, size }) => {
                return (
                  <MaterialIcons
                    name="insert-drive-file"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <RootTab.Screen
            name="ClinicNavigator"
            component={ClinicNavigator}
            options={{
              headerTitle: "Phòng khám",
              tabBarIcon: ({ focused, color, size }) => {
                return (
                  <MaterialIcons
                    name="format-list-bulleted"
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarItemStyle: {
                display: "none",
              },
            }}
          />

          <RootTab.Screen
            name="AppointmentNavigator"
            component={AppointmentNavigator}
            options={{
              title: "Lịch hẹn",
              tabBarIcon: ({ focused, color, size }) => {
                return (
                  <MaterialIcons
                    name="calendar-today"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          {!user && (
            <RootTab.Screen
              name="AuthenticationNavigator"
              component={AuthenticationNavigator}
              initialParams={{ setLogin: setLogin }}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                  return (
                    <MaterialIcons
                      name="account-circle"
                      size={size}
                      color={color}
                    />
                  );
                },
              }}
            />
          )}
          {user && (
            <>
              <RootTab.Screen
                name="ChattingNavigator"
                component={ChattingNavigator}
                options={{
                  headerTitle: "Nhắn tin",
                  tabBarIcon: ({ focused, color, size }) => {
                    return (
                      <Ionicons
                        name="chatbubble-ellipses"
                        size={size}
                        color={color}
                      />
                    );
                  },
                }}
              />
              <RootTab.Screen
                name="NotificationNavigator"
                component={NotificationNavigator}
                options={{
                  headerTitle: "Thông báo",
                  tabBarIcon: ({ focused, color, size }) => {
                    return (
                      <MaterialIcons
                        name="notifications"
                        size={size}
                        color={color}
                      />
                    );
                  },
                }}
              />
              <RootTab.Screen
                name="ProfileNavigator"
                component={ProfileNavigator}
                initialParams={{ setLogout }}
                options={{
                  headerTitle: "Tài khoản",
                  tabBarIcon: ({ focused, color, size }) => {
                    return (
                      <MaterialIcons
                        name="account-circle"
                        size={size}
                        color={color}
                      />
                    );
                  },
                }}
              />
            </>
          )}
        </RootTab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default TabNavigator;
