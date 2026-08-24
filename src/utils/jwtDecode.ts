import UserType from "@/schemas/UserType";
import { ROLES } from "@/constants/roles";
import { jwtDecode } from "jwt-decode";
import { notFound } from "next/navigation";

export default function decodeJwt(jwt: string): UserType {
  try {
    const decoded = jwtDecode<UserType>(jwt);
    return {
      ...decoded,
      role: decoded.role || ROLES.USER,
    };
  } catch (error) {
    console.log("Error decoding jwt token:", error);
    return notFound();
  }
}
