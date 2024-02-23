import { Center, AlertDialog, Button, Text, useToast } from "native-base";
import React from "react";
import { useNavigation } from '@react-navigation/native';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const ChooseClinicDialog = ({ isOpen, onClose }: IProps) => {
  const cancelRef = React.useRef(null);
  const navigation = useNavigation();

  const handleAccept = async () => {
    // Chuyển sang screen phòng khám
    navigation.navigate("ClinicNavigator" as never);
    onClose();
  };
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content borderRadius={20}>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            <Text fontWeight={"bold"} fontSize={16}>
              Chọn phòng khám
            </Text>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <Text>
              Vui lòng chọn phòng khám trước khi đặt lịch!
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                ref={cancelRef}
                backgroundColor="#fff"
                borderColor="secondary.300"
                borderWidth={1}
                _text={{
                  color: "secondary.300",
                }}
                _pressed={{
                  backgroundColor: "secondary.100",
                }}
                onPress={() => {
                  onClose();
                }}
              >
                Hủy
              </Button>
              <Button onPress={handleAccept}>Đồng ý</Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default ChooseClinicDialog;
