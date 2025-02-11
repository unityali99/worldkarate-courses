import ChangePasswordForm from "@/components/Form/ChangePasswordForm";
import ProfileForm from "@/components/Form/ProfileForm";
import UserCourses from "@/components/UserCourses";
import UserType from "@/schemas/UserType";
import { cookieKey } from "@/stores/authStore";
import decodeJwt from "@/utils/jwtDecode";
import { Box } from "@chakra-ui/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const token = cookies().get(cookieKey)?.value;
  if (!token) return redirect("/auth/login");

  const decodedToken = decodeJwt(token);
  const { isAdmin }: UserType = decodedToken;

  return (
    <Box className="space-y-20 mb-28">
      {!isAdmin && <UserCourses />}
      <ProfileForm isAdmin={isAdmin!} key={1} />
      <ChangePasswordForm key={2} />
    </Box>
  );
}

export const dynamic = "force-dynamic";

export default ProfilePage;
