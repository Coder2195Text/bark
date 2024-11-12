import { date, object, string } from "yup";

// alphanumeric, underscore, 3-20 characters, cannot start or end with underscore
export const usernameSchema = string()
  .required("Username is required")
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username cannot be more than 20 characters")
  .matches(
    /^[a-zA-Z0-9](?:[a-zA-Z0-9_]{1,18}[a-zA-Z0-9])?$/g,
    "Username must be alphanumeric or underscores, but cannot start or end with an underscore."
  );

export const checkUsernameSchema = object({
  username: usernameSchema,
});

export const createUserSchema = object({
  username: usernameSchema,
  profilePic: string().url("Profile picture must be a valid URL"),
  bio: string().max(160, "Bio cannot be more than 160 characters"),
  banner: string().url("Banner must be a valid URL"),
  name: string()
    .min(1, "Name must be at least 1 character")
    .max(150, "Name cannot be more than 150 characters")
    .required("Name is required"),
  birthday: date()
    .max(new Date(), "Birthday cannot be in the future")
    .required("Birthday is required"),
});
