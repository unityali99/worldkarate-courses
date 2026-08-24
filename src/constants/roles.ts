export const ROLES = {
  USER: "USER",
  INSTRUCTOR: "INSTRUCTOR",
  ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES]; // "USER" | "INSTRUCTOR" | "ADMIN"

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface DecodedJwtToken {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
