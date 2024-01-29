import { HStack, Heading, Modal, Spinner } from "native-base";
import { appColor } from "../../theme";

export const LoadingSpinner = (props: any) => {
  const { showLoading, setShowLoading } = props;
  return (
    <Modal isOpen={showLoading}>
      <Modal.Content maxWidth="300px" width="60%">
        <Modal.Body>
          <HStack space={2} alignItems="center" justifyContent="center">
            <Spinner
              color={appColor.primary}
              accessibilityLabel="Loading posts"
            />
            <Heading color={appColor.primary} fontSize="md">
              Đang xử lý
            </Heading>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
