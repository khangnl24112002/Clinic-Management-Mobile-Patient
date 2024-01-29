import { Box, HStack, Heading, VStack, Text, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { appColor } from "../../../theme";
import { SUBSCRIPTION_STATUS } from "../../../constants/paymentStatus";

export const StepFiveScreen = (props: any) => {
  const { changePosition, paymentResult } = props;
  const getPaymentStatus = () => {
    const paymentStatus = paymentResult.status;
    if (paymentStatus === SUBSCRIPTION_STATUS.ACTIVE) {
      return "Đã thanh toán";
    } else if (paymentStatus === SUBSCRIPTION_STATUS.CANCEL) {
      return "Đã hủy thanh toán";
    } else if (paymentStatus === SUBSCRIPTION_STATUS.EXPIRED) {
      return "Đã quá hạn";
    } else if (paymentStatus === SUBSCRIPTION_STATUS.INPAYMENT) {
      return "INPAYMENT";
    } else if (paymentStatus === SUBSCRIPTION_STATUS.PENDING) {
      return "PENDING";
    }
  };
  return (
    <Box minH="100%" maxH="100%" justifyContent="center" alignItems="center">
      <VStack
        space={4}
        justifyContent="center"
        alignItems="center"
        borderBottomWidth={3}
        borderBottomColor="#ededed"
        width="full"
      >
        <Ionicons
          name="md-checkmark-circle-outline"
          size={70}
          color={appColor.primary}
        />
        <Heading>Thanh toán thành công!</Heading>
        <Heading fontSize="45">{paymentResult.amount}đ</Heading>
      </VStack>
      <VStack space={5} width="full" mt={5}>
        <HStack justifyContent="space-between">
          <Text>Mã phòng khám</Text>
          <Text>{paymentResult.clinicId}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Mã hóa đơn</Text>
          <Text>{paymentResult.subscribePlanId}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Trạng thái</Text>
          <Text>{getPaymentStatus()}</Text>
        </HStack>
        {/* <HStack justifyContent="space-between">
          <Text>Phương thức</Text>
          <Text>VNPay</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Tên người mua</Text>
          <Text>Nguyễn Nhật Khang</Text>
        </HStack> */}
      </VStack>
      {/* <HStack
        mt="20%"
        width="full"
        justifyContent="space-between"
        alignSelf="center"
      >
        <Button
          borderRadius={20}
          onPress={() => {
            changePosition(false);
          }}
        >
          Quay lại
        </Button>
        <Button
          borderRadius={20}
          onPress={() => {
            changePosition(true);
          }}
        >
          Tiếp tục
        </Button>
      </HStack> */}
    </Box>
  );
};
