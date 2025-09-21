"use client";

import Back from "@/components/buttons/back";
import Card from "@/components/card";
import LayoutMobile from "@/components/layout-mobile";
import MobileLayout from "@/components/MobileLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { mutateUpdateProfile, queryProfile } from "./services/query";
import FormUpdate from "./components/form";
import { useAtom } from "jotai";
import ProfileAtom from "./state/profile";
import toast from "react-hot-toast";
import Input from "@/components/input";
import Select from "@/components/select";
import { Formik, Form } from "formik";

type Props = {};

function Page({}: Props) {
  const [profileState] = useAtom(ProfileAtom);

  const queryData = useQuery({
    queryKey: ["profile"],
    queryFn: queryProfile,
  });

  const [_, setProfileState] = useAtom(ProfileAtom);

  useEffect(() => {
    if (queryData.data?.data) setProfileState(queryData.data.data.data);
  }, [queryData.data, setProfileState]);

  const [isEditingAbout, setIsEditingAbout] = useState(false);

  const mutateUpdate = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: mutateUpdateProfile,
    onSuccess: (data) => {
      toast.success(data.message);
      queryData.refetch();
    },
    onError: (data) => {
      toast.success(data.message);
    },
  });

  console.log(profileState);

  return (
    <LayoutMobile>
      <div className="bg-background h-full w-full">
        <MobileLayout className="flex flex-col py-8 px-4 h-full">
          <Back />
          <div className="stack-col h-full justify-center gap-y-4 ">
            {queryData.isLoading && <span>Loading...</span>}
            {queryData.data && !queryData.isLoading && (
              <>
                {" "}
                <Formik
                  initialValues={profileState}
                  onSubmit={(values) => {
                    mutateUpdate.mutateAsync(values);
                  }}
                  enableReinitialize
                >
                  <Form>
                    <Card
                      title="About"
                      actionButton={
                        !isEditingAbout ? (
                          <FaEdit onClick={() => setIsEditingAbout(true)} />
                        ) : (
                          <button
                            type="submit"
                            className="text-sm text-brand-golden"
                          >
                            Save & Update
                          </button>
                        )
                      }
                      className="bg-brand-card"
                      placeholderText="Add in your your to help others know you
better"
                    >
                      {isEditingAbout && (
                        <div className="stack-col gap-y-3">
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
                            <span className="text-nowrap text-white/40 text-sm">
                              Gender :
                            </span>
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
                            <span className="text-nowrap text-white/40 text-sm">
                              Birthday :
                            </span>
                            <Input
                              name="birthday"
                              className="border-2 border-white/40 px-2 py-2 text-sm w-56 bg-white/10"
                              placeholder="DD MM YYYY"
                              inputClassName="text-right text-sm"
                              type="date"
                            />
                          </div>
                          <div className="flex justify-between gap-8 items-center">
                            <span className="text-nowrap text-white/40 text-sm">
                              Horoscope :
                            </span>
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
                            <span className="text-nowrap text-white/40 text-sm">
                              Zodiac :
                            </span>
                            <Input
                              name="zodiac"
                              className="border-2 border-white/40 px-2 py-2 text-sm w-56 bg-white/10"
                              placeholder="-- --"
                              inputClassName="text-right text-sm"
                              type="text"
                              disabled
                            />
                          </div>
                          <div className="flex justify-between gap-8 items-center">
                            <span className="text-nowrap text-white/40 text-sm">
                              Height :
                            </span>
                            <Input
                              name="height"
                              className="border-2 border-white/40 px-2 py-2 text-sm w-56 bg-white/10"
                              placeholder="Add Height"
                              inputClassName="text-right text-sm"
                              type="number"
                            />
                          </div>
                          <div className="flex justify-between gap-8 items-center">
                            <span className="text-nowrap text-white/40 text-sm">
                              Weight :
                            </span>
                            <Input
                              name="weight"
                              className="border-2 border-white/40 px-2 py-2 text-sm w-56 bg-white/10"
                              placeholder="Add Weight"
                              inputClassName="text-right text-sm"
                              type="number"
                            />
                          </div>
                        </div>
                      )}
                    </Card>
                  </Form>
                </Formik>
                <Card
                  title="Interests"
                  actionButton={<FaEdit />}
                  className="bg-brand-card"
                  placeholderText="Add in your interest to find a better match"
                />
              </>
            )}
          </div>
        </MobileLayout>
      </div>
    </LayoutMobile>
  );
}

export default Page;
