import { Box, Text } from "native-base";
import { AppointmentDetailProps } from "../../Navigator/AppointmentNavigator";

export default function AppointmentDetailScreen({
  navigation,
  route,
}: AppointmentDetailProps) {
  return (
    <Box>
      <Text>Appointment Detail Screen</Text>
    </Box>
  );
}
