import UserType from "@/schemas/UserType";
import { jwtDecode } from "jwt-decode";
import { notFound } from "next/navigation";

export default function decodeJwt(jwt: string) {
  try {
    return jwtDecode<UserType>(jwt);
  } catch (error) {
    console.log("Error decoding jwt token:", error);
    return notFound();
  }
}
