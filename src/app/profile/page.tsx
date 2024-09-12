import ChangePasswordForm from "@/components/Form/ChangePasswordForm";
import ProfileForm from "@/components/Form/ProfileForm";
import UserCourses from "@/components/UserCourses";
import UserType from "@/schemas/UserType";
import { cookieKey } from "@/stores/authStore";
import { Box } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const token = cookies().get(cookieKey)?.value;
  const { isAdmin }: UserType = jwtDecode(token!);
  if (!token) return redirect("/auth/login");
  return (
    <Box className="space-y-20 mb-28">
      {!isAdmin && <UserCourses />}
      <ProfileForm isAdmin={isAdmin} key={1} />
      <ChangePasswordForm key={2} />
    </Box>
  );
}

export const dynamic = "force-dynamic";

export default ProfilePage;
