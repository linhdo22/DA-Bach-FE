import { GENDER, ROLES } from "./constant";

export const roleMapping = {
  [ROLES.ADMIN]: "Admin",
  [ROLES.CUSTOMER]: "Customer",
  [ROLES.DOCTOR]: "Doctor",
};

export const genderMapping = {
  [GENDER.MALE]: "Male",
  [GENDER.FEMALE]: "Female",
};
