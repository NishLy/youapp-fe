"use client";

import Back from "@/components/buttons/back";
import Card from "@/components/card";
import LayoutMobile from "@/components/layout-mobile";
import MobileLayout from "@/components/MobileLayout";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { queryProfile } from "./services/query";
import FormUpdate from "./components/form";

type Props = {};

function Page({}: Props) {
  const queryData = useQuery({
    queryKey: ["profile"],
    queryFn: queryProfile,
  });

  const [isEditingAbout, setIsEditingAbout] = useState(false);

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
                <Card
                  title="About"
                  actionButton={
                    !isEditingAbout ? (
                      <FaEdit onClick={() => setIsEditingAbout(true)} />
                    ) : (
                      <button className="text-sm text-brand-golden">
                        Save & Update
                      </button>
                    )
                  }
                  className="bg-brand-card"
                  placeholderText="Add in your your to help others know you
better"
                >
                  {isEditingAbout && <FormUpdate />}
                </Card>
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
