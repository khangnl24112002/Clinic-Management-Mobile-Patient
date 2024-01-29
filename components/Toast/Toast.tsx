import { Alert, HStack, VStack, Text, useToast } from "native-base";

{
  /**Toast has some status based on alert component.
Example: 
- success: green
- error: red
- info: blue
- warning: orange
*/
}

// Example how to use toast

{
  /* <Button
  onPress={() => {
    toast.show({
      render: () => {
        return (
          <ToastAlert
            title="Something went wrong"
            description="Thanks for signing up with us."
            status="error"
          />
        );
      },
    });
  }}
  borderRadius={20}
>
  Test Toast
</Button>; */
}

export default function ToastAlert(props: any) {
  const toast = useToast();
  const { id, status, variant, title, description, isClosable, ...rest } =
    props;
  return (
    <Alert
      maxWidth="100%"
      alignSelf="center"
      flexDirection="row"
      variant={variant ? variant : "subtle"}
      {...rest}
      status={status}
      borderRadius={20}
    >
      <VStack space={1} flexShrink={1} w="90%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text
              fontSize="md"
              fontWeight="medium"
              flexShrink={1}
              color={
                variant === "solid"
                  ? "lightText"
                  : variant !== "outline"
                  ? "darkText"
                  : null
              }
            >
              {title}
            </Text>
          </HStack>
        </HStack>
        <Text
          px="6"
          color={
            variant === "solid"
              ? "lightText"
              : variant !== "outline"
              ? "darkText"
              : null
          }
        >
          {description}
        </Text>
      </VStack>
    </Alert>
  );
}
