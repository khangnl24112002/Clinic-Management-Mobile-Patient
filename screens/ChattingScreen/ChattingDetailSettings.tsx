import { View, Text } from "react-native";
import React from "react";
import { ChattingDetailSettingsScreenProps } from "../../Navigator/ChattingNavigator";
import { Button } from "native-base";

const ChattingDetailSettings: React.FC<ChattingDetailSettingsScreenProps> = ({
  route,
}) => {
  // Call API to get group detail
  const { groupId } = route.params;
  return (
    <View>
      <Text>Thong tin Nhom Chat {groupId}</Text>
      <Button>Them thanh vien</Button>
      <Button>Roi nhom</Button>
    </View>
  );
};

export default ChattingDetailSettings;
