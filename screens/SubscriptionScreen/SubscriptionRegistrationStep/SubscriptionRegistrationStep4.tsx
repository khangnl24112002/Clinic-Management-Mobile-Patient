import { Box, Button, HStack, Spinner } from "native-base";

export const StepFourScreen = (props: any) => {
  const { changePosition } = props;
  return (
    <Box minH="100%" maxH="100%" justifyContent="center" alignItems="center">
      <Spinner size="lg" />
      <HStack
        mt="50%"
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
      </HStack>
    </Box>
  );
};
