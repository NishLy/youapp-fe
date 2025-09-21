"use client";

import Back from "@/components/buttons/back";
import Card from "@/components/card";
import LayoutMobile from "@/components/layout-mobile";
import MobileLayout from "@/components/MobileLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { mutateUpdateProfile, queryProfile } from "./services/query";
import { useAtom } from "jotai";
import ProfileAtom from "./state/profile";
import toast from "react-hot-toast";
import Input from "@/components/input";
import Select from "@/components/select";
import { Formik, Form } from "formik";
import { IoIosAdd } from "react-icons/io";
import { string } from "yup";
import Image from "next/image";
import getAge, { formatBirthdayDate } from "@/utils/birthday";

type Props = {};

function Page({}: Props) {
  const [profileState, setProfileState] = useAtom(ProfileAtom);

  const queryData = useQuery({
    queryKey: ["profile"],
    queryFn: queryProfile,
  });

  useEffect(() => {
    if (queryData.data?.data)
      setProfileState({ ...profileState, ...queryData.data.data.data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData.data, setProfileState]);

  const [isEditingAbout, setIsEditingAbout] = useState(false);

  const mutateUpdate = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: mutateUpdateProfile,
    onSuccess: (data) => {
      toast.success(data.message);
      queryData.refetch();
      setIsEditingAbout(false);
    },
    onError: (data) => {
      toast.success(data.message);
    },
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const [imgData, setImgData] = useState<null | string>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgData(url);
    }
  };

  return (
    <LayoutMobile>
      <div className="bg-background h-full w-full">
        <MobileLayout className="flex flex-col py-8 px-4 h-full">
          <Back />
          <div className="stack-col h-full justify-center gap-y-4 mt-4 ">
            {queryData.isLoading && <span>Loading...</span>}
            {queryData.data && !queryData.isLoading && (
              <>
                <div className="rounded-lg min-h-56 bg-brand-card-light relative stack-col justify-end overflow-hidden mb-2">
                  {imgData && (
                    <Image
                      src={imgData}
                      alt=""
                      width={1000}
                      height={1000}
                      className="absolute h-full object-cover overflow-hidden -z-0"
                    />
                  )}
                  <div className="stack-col p-4 relative z-10 gap-1">
                    <h1 className="text-lg font-bold text-white">
                      @{profileState.username},{" "}
                      {profileState.birthday && getAge(profileState.birthday)}
                    </h1>
                    {profileState.gender && (
                      <span className="capitalize text-sm">
                        {profileState.gender}
                      </span>
                    )}

                    {profileState.horoscope && profileState.zodiac && (
                      <div className="flex gap-4">
                        <div className="flex gap-2 bg-background font-bold px-3 py-1 rounded-2xl">
                          <div></div>
                          <span>{profileState.zodiac}</span>
                        </div>
                        <div className="flex gap-2 bg-background font-bold px-3 py-1 rounded-2xl">
                          <div></div>
                          <span>{profileState.horoscope}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>{" "}
                <Formik
                  initialValues={profileState}
                  onSubmit={(values) => {
                    mutateUpdate.mutateAsync(values);
                    setProfileState({ ...profileState, gender: values.gender });
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
                          <div className="flex gap-4 items-center">
                            <div className="h-16 w-16 bg-brand-card-light rounded-xl  flex justify-center items-center overflow-hidden relative">
                              <input
                                ref={fileRef}
                                type="file"
                                accept="image/*" // restrict to images only
                                hidden
                                onChange={handleFileChange}
                              />
                              {imgData && (
                                <Image
                                  src={imgData}
                                  alt=""
                                  width={100}
                                  height={100}
                                  className="absolute h-full object-cover overflow-hidden"
                                />
                              )}
                              {!imgData && <IoIosAdd className="w-8 h-8" />}
                            </div>
                            <button
                              type="button"
                              onClick={() => fileRef.current?.click()}
                              className="text-nowrap text-white/40 text-sm"
                            >
                              Add Image
                            </button>
                          </div>
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
                      {!isEditingAbout && (
                        <div className="stack-col gap-y-2 w-full">
                          <div className="flex items-center gap-1 w-full">
                            <span className="text-nowrap text-white/40 text-sm">
                              Birthday :
                            </span>
                            <span className="text-sm">
                              {" "}
                              {profileState.birthday && (
                                <>
                                  {formatBirthdayDate(profileState.birthday)}{" "}
                                  (Age {getAge(profileState.birthday)})
                                </>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 w-full">
                            <span className="text-nowrap text-white/40 text-sm">
                              Horoscope :
                            </span>
                            <span className="text-sm">
                              {" "}
                              {profileState.horoscope}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 w-full">
                            <span className="text-nowrap text-white/40 text-sm">
                              Zodiac :
                            </span>
                            <span className="text-sm">
                              {" "}
                              {profileState.zodiac}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 w-full">
                            <span className="text-nowrap text-white/40 text-sm">
                              Weight :
                            </span>
                            <span className="text-sm">
                              {" "}
                              {profileState.weight} kg
                            </span>
                          </div>
                          <div className="flex items-center gap-1 w-full">
                            <span className="text-nowrap text-white/40 text-sm">
                              Height :
                            </span>
                            <span className="text-sm">
                              {profileState.height} cm
                            </span>
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
