import Input from "@/components/input";
import { Form, Formik } from "formik";
import React from "react";
import Select from "@/components/select";
import { useAtom } from "jotai";
import ProfileAtom from "../state/profile";
import { useMutation } from "@tanstack/react-query";
import { mutateUpdateProfile } from "../services/query";
import toast from "react-hot-toast";

function FormUpdate() {
  const [profileState] = useAtom(ProfileAtom);

  const mutateUpdate = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: mutateUpdateProfile,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (data) => {
      toast.success(data.message);
    },
  });

  return (
    <Formik
      initialValues={profileState}
      onSubmit={(values) => {
        mutateUpdate.mutateAsync(values);
      }}
    >
      <Form className="stack-col gap-y-3">
        <div className="flex justify-between gap-8 items-center">
          <span className="text-nowrap text-white/40 text-sm">
            Display Name :
          </span>
          <Input
            name="name"
            className="border-2 border-white/40 px-2 py-2 text-sm w-56 bg-white/10"
            placeholder="Enter Name"
            inputClassName="text-right text-sm"
          />
        </div>
        <div className="flex justify-between gap-8 items-center">
          <span className="text-nowrap text-white/40 text-sm">Gender :</span>
          <Select
            name="gender"
            className="border-2 border-white/40 px-2 py-2 text-sm w-56 bg-white/10"
            placeholder="Select gender"
            selectClassName="text-sm text-right "
            options={[
              {
                value: "male",
                label: "Male",
              },
              {
                value: "female",
                label: "Female",
              },
            ]}
          />
        </div>
        <div className="flex justify-between gap-8 items-center">
          <span className="text-nowrap text-white/40 text-sm">Birthday :</span>
          <Input
            name="birthday"
            className="border-2 border-white/40 px-2 py-2 text-sm w-56 bg-white/10"
            placeholder="DD MM YYYY"
            inputClassName="text-right text-sm"
            type="date"
          />
        </div>
        <div className="flex justify-between gap-8 items-center">
          <span className="text-nowrap text-white/40 text-sm">Horoscope :</span>
          <Input
            name="horoscope"
            className="border-2 border-white/40 px-2 py-2 text-sm w-56 bg-white/10"
            placeholder="-- --"
            inputClassName="text-right text-sm"
            type="text"
            disabled
          />
        </div>
        <div className="flex justify-between gap-8 items-center">
          <span className="text-nowrap text-white/40 text-sm">Zodiac :</span>
          <Input
            name="zodiac"
            className="border-2 border-white/40 px-2 py-2 text-sm w-56 bg-white/10"
            placeholder="-- --"
            inputClassName="text-right text-sm"
            type="number"
            disabled
          />
        </div>
        <div className="flex justify-between gap-8 items-center">
          <span className="text-nowrap text-white/40 text-sm">Height :</span>
          <Input
            name="height"
            className="border-2 border-white/40 px-2 py-2 text-sm w-56 bg-white/10"
            placeholder="Add Height"
            inputClassName="text-right text-sm"
            type="number"
          />
        </div>
        <div className="flex justify-between gap-8 items-center">
          <span className="text-nowrap text-white/40 text-sm">Weight :</span>
          <Input
            name="weight"
            className="border-2 border-white/40 px-2 py-2 text-sm w-56 bg-white/10"
            placeholder="Add Weight"
            inputClassName="text-right text-sm"
            type="number"
          />
        </div>
      </Form>
    </Formik>
  );
}

export default FormUpdate;
