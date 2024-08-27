import ChangePasswordForm from "@/components/Form/ChangePasswordForm";
import ProfileForm from "@/components/Form/ProfileForm";
import { Box } from "@chakra-ui/react";

function ProfilePage() {
  return (
    <Box className="space-y-10">
      <ProfileForm key={1} />
      <ChangePasswordForm key={2} />
    </Box>
  );
}

export default ProfilePage;
