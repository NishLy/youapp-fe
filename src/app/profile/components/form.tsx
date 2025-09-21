import Input from "@/components/input";
import { Form, Formik } from "formik";
import React from "react";
import IProfile from "../types/profile";
import Select from "@/components/select";

type Props = {};

const intialValues: IProfile = {
  email: "",
  username: "",
};

function FormUpdate({}: Props) {
  return (
    <Formik initialValues={intialValues} onSubmit={(values) => {}}>
      <Form className="stack-col gap-y-3">
        <div className="flex justify-between gap-8 items-center">
          <span className="text-nowrap text-white/40 text-sm">
            Display Name :
          </span>
          <Input
            name="displayName"
            className="border-2 border-white/40 px-2 py-2 text-sm w-56 bg-white/10"
            placeholder="Enter Name"
            inputClassName="text-right text-sm"
          />
        </div>
        <div className="flex justify-between gap-8 items-center">
          <span className="text-nowrap text-white/40 text-sm">Gender :</span>
          <Select
            name="birthday"
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
