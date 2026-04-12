import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("username is required")
      .min(1, "min length 3 chars")
      .max(10, "max length 10 chars"),
    email: zod.email("invalid email").nonempty("email is required"),
    password: zod.string().regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
      `password must contain 1 number (0-9)
password must contain 1 uppercase letters
password must contain 1 lowercase letters
password must contain 1 non-alpha numeric number
password is 8-16 characters with no space
`,
    ),
    rePassword: zod.string().nonempty("rePassword is required"),
    dateOfBirth: zod.string().nonempty("date is required"),
    gender: zod.enum(["male", "female"], "gender must be male or female"),
  })
  .refine(
    (obj) => {
      return obj.password === obj.rePassword;
    },
    { path: ["rePassword"], error: "password & rePassword not matched !" },
  );
