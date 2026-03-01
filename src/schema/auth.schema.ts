"use client";

import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is Required")
      .min(2, "Min Length 3")
      .max(10, "Max Length 10"),
    email: z.email().nonempty("Email is Required"),
    password: z
      .string()
      .nonempty("Password is Required")
      .min(6, "Min Length is 6"),
    rePassword: z.string().nonempty("RePassword is Required"),
    phone: z
      .string()
      .nonempty("Phone Number is Required")
      .regex(/^01[0125][0-9]{8}$/, "Phone Number Must be Egyptian"),
  })
  .refine((data) => data.password == data.rePassword, {
    path: ["rePassword"],
    error: "Password and rePassword Must Match",
  });

export const loginSchema = z.object({
  email: z.email().nonempty("Email is Required"),
  password: z
    .string()
    .nonempty("Password is Required")
    .min(6, "Min Length is 6"),
});

export const checkoutSchema = z.object({
  shippingAddress: z.object({
  details: z.string().nonempty("Please fillout your Detailed Address").min(3,"Please fill Your Address"),
  city: z.string().nonempty("City is Required"),
  phone: z
    .string()
    .nonempty("Phone Number is Required")
    .regex(/^01[0125][0-9]{8}$/, "Phone Number Must be Egyptian"),
  })
});

export type checkoutSchemaType = z.infer<typeof checkoutSchema>;
export type registerSchemaType = z.infer<typeof registerSchema>;
export type loginSchemaType = z.infer<typeof loginSchema>;
