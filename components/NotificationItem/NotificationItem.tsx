import React from "react";
import { HStack, Image, Pressable, Text, VStack } from "native-base";
import PropTypes from "prop-types";
type Props = {
  id: string;
  image: string;
  content: string;
  time: string;
  isRead: boolean;
  handleReadNotification: (id: string) => void;
};
const NotificationItem = ({
  image,
  content,
  time,
  isRead,
  id,
  handleReadNotification,
}: Props) => {
  return (
    <Pressable
      onPress={() => {
        handleReadNotification(id);
      }}
    >
      <HStack
        backgroundColor={isRead ? "#DFDEFF" : "secondary.100"}
        p={2}
        pl={3}
        space={3}
        alignItems="center"
        borderRadius={10}
        justifyContent="space-evenly"
      >
        <Image
          size={60}
          borderRadius={100}
          source={{
            //   uri: "https://wallpaperaccess.com/full/317501.jpg",
            uri: image,
          }}
          alt="Alternate Text"
        />
        <VStack width="4/5" maxW="4/5">
          <Text color="#3d3d66" fontSize={14}>
            {content}
          </Text>
          <Text color="#70708c" fontSize={12}>
            {time}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};
export default NotificationItem;
