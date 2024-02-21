import { Box, Text } from "native-base";
import { LandingPageScreenProps } from "../../Navigator/TabNavigator";

export default function LandingPageScreen({
  navigation,
  route,
}: LandingPageScreenProps) {
  return (
    <Box>
      <Text>Landing Page Screen</Text>
    </Box>
  );
}
