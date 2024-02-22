import { Box, Text } from "native-base";

import { NewsDetailScreenProps } from "../../Navigator/NewsNavigator";
import React from "react";

export default function NewsDetailScreen({
  navigation,
  route,
}: NewsDetailScreenProps) {
  return (
    <Box>
      <Text>News Detail</Text>
    </Box>
  );
}
