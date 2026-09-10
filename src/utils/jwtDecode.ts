import UserType from "@/schemas/UserType";
import { ROLES } from "@/constants/roles";
import { jwtDecode } from "jwt-decode";

export default function decodeJwt(jwt: string): UserType | null {
  try {
    const decoded = jwtDecode<UserType>(jwt);
    return {
      ...decoded,
      role: decoded.role || ROLES.USER,
    };
  } catch (error) {
    console.error("Error decoding jwt token:", error);
    return null;
  }
}
