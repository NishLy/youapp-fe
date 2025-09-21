"use client";

import Button from "@/components/button";
import Back from "@/components/buttons/back";
import GradientBackground from "@/components/GradientBackground";
import Input from "@/components/input";
import LayoutMobile from "@/components/layout-mobile";
import MobileLayout from "@/components/MobileLayout";
import { Form, Formik } from "formik";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";
import { RegisterDTO } from "./types/register";
import { useMutation } from "@tanstack/react-query";
import { mutateRegister } from "./services/query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const validationScema = Yup.object<RegisterDTO>({
  username: Yup.string()
    .min(3, "Must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8).required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

function Page() {
  const mutationRegister = useMutation({
    mutationKey: ["register"],
    mutationFn: mutateRegister,
  });

  const router = useRouter();

  return (
    <LayoutMobile>
      <GradientBackground>
        <MobileLayout className="flex flex-col py-8 px-4 h-screen">
          <Back />
          <div className="stack-col h-full justify-center">
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationScema}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  const res = await mutationRegister.mutateAsync(values);
                  toast.success(res.message);
                  router.replace("/login");
                } catch (err) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const axiosError = err as AxiosError<any>;

                  if (
                    axiosError.response?.data &&
                    typeof axiosError.response.data === "object"
                  ) {
                    setErrors(axiosError.response.data);
                  } else {
                    toast.error("Something went wrong");
                  }
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isValid, dirty, isSubmitting }) => (
                <Form className="stack-col gap-y-4">
                  <h1 className="text-3xl px-4 mb-2">Register</h1>
                  <Input name="email" placeholder="Enter Email" />
                  <Input name="username" placeholder="Enter Username" />
                  <Input
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                  />
                  <Input
                    name="confirmPassword"
                    placeholder="Enter Confirmation Password"
                    type="password"
                  />

                  <Button
                    className="mt-4"
                    type="submit"
                    disabled={!(isValid && dirty) || isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </Button>
                </Form>
              )}
            </Formik>

            <p className="text-center mt-10">
              Have an account{" "}
              <Link className="text-brand-golden underline" href="/login">
                Login Here
              </Link>
            </p>
          </div>
        </MobileLayout>
      </GradientBackground>
    </LayoutMobile>
  );
}

export default Page;
