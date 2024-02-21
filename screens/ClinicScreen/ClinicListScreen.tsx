import { Box, Text } from "native-base";
import { MedicalRecordDetailProps } from "../../Navigator/MedicalRecordNavigator";
import { ClinicListProps } from "../../Navigator/ClinicNavigator";

export default function ClinicListScreen({
  navigation,
  route,
}: ClinicListProps) {
  return (
    <Box>
      <Text>Clinic List Screen</Text>
    </Box>
  );
}
