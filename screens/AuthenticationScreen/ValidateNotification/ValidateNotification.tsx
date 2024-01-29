import { Text, Button, View, Box } from "native-base";
import { ValidateNotificationProps } from "../../../Navigator/StackNavigator";

const ValidateNotification: React.FC<ValidateNotificationProps> = ({
  navigation,
  route,
}: ValidateNotificationProps) => {
  const { setLogin } = route.params;
  return (
    <Box safeArea>
      <View>
        <Text>Một tin nhắn xác thực đã được gửi đến email của bạn.</Text>
        <Text>Vui lòng xác thực tài khoản trước khi đăng nhập</Text>
        <Button
          onPress={() => {
            navigation.navigate("Login", { setLogin });
          }}
        >
          Quay lại trang đăng nhập
        </Button>
      </View>
    </Box>
  );
};

export default ValidateNotification;
