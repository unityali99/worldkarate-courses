import { UserRole } from "@/constants/roles";

type UserType = {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
};

export default UserType;
