import { ROLES, UserRole } from "@/constants/roles";
import UserType from "@/schemas/UserType";

/**
 * Checks if a user is an administrator
 */
export const isAdmin = (user?: Pick<UserType, "role"> | null): boolean => {
  return user?.role === ROLES.ADMIN;
};

/**
 * Checks if a user is an instructor (Sensei)
 */
export const isInstructor = (user?: Pick<UserType, "role"> | null): boolean => {
  return user?.role === ROLES.INSTRUCTOR;
};

/**
 * Checks if a user has staff privileges (Admin or Instructor)
 */
export const isStaff = (user?: Pick<UserType, "role"> | null): boolean => {
  return user?.role === ROLES.ADMIN || user?.role === ROLES.INSTRUCTOR;
};

/**
 * Verifies if user has any of the specified roles
 */
export const hasRole = (
  user: Pick<UserType, "role"> | null | undefined,
  allowedRoles: UserRole[]
): boolean => {
  if (!user || !user.role) return false;
  return allowedRoles.includes(user.role);
};
