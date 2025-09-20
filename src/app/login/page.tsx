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
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { mutateLogin } from "./services/query";
import { LoginDTO } from "./types/login";
import { useRouter } from "next/navigation";
import { setToken } from "@/utils/auth/localToken";

const validationScema = Yup.object<LoginDTO>({
  emailOrUsername: Yup.string().required("Email/Username is required"),
  password: Yup.string().min(8).required("Password required"),
});

function Page() {
  const mutationLogin = useMutation({
    mutationKey: ["login"],
    mutationFn: mutateLogin,
  });

  const router = useRouter();

  return (
    <LayoutMobile>
      <GradientBackground>
        <MobileLayout className="flex flex-col py-8 px-4">
          <Back />
          <div className="stack-col h-full justify-center">
            <Formik
              initialValues={{
                emailOrUsername: "",
                password: "",
              }}
              validationSchema={validationScema}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  let isEmail = false;
                  try {
                    await Yup.string().email().validate(values.emailOrUsername);
                    isEmail = true;
                  } catch {
                    isEmail = false;
                  }

                  const payload: LoginDTO = {
                    ...values,
                    email: isEmail ? values.emailOrUsername : "",
                    username: !isEmail ? values.emailOrUsername : "",
                  };

                  const res = await mutationLogin.mutateAsync(payload);
                  toast.success(res.message);
                  setToken(res.access_token);
                  router.replace("/profile");
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
                  <h1 className="text-3xl px-4 mb-2">Login</h1>
                  <Input
                    name="emailOrUsername"
                    placeholder="Enter Email/Username"
                  />
                  <Input
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                  />
                  <Button
                    className="mt-4"
                    type="submit"
                    disabled={!(isValid && dirty) || isSubmitting}
                  >
                    {isSubmitting ? "Attemp to login..." : "Login"}
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
