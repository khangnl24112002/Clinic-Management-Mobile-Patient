//import liraries
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { appColor } from "../../../theme";
import dayjs from "dayjs";

// create a component
const TimeDelivery = (props: any) => {
  const { sender, time } = props;
  return (
    <View
      style={[
        styles.mainView,
        {
          justifyContent: "flex-end",
        },
      ]}
    >
      <Text
        style={{
          fontFamily: "Poppins-Regular",
          fontSize: 10,
          color: sender ? appColor.background : "#000",
        }}
      >
        {dayjs(time).format("DD/MM/YYYY HH:mm:ss")}
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    marginTop: 1,
  },
});

//make this component available to the app
export default TimeDelivery;
