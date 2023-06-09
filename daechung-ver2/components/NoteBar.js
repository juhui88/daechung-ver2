import Link from "next/link";
import React, { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { useRouter } from "next/router";
import { cls } from "@/libs/utils";
import axios from "axios";
import { headers } from "next/dist/client/components/headers";

const NoteBar = ({ title, cateId, content, files }) => {
  const router = useRouter();
  const [menuClick, setMenuClick] = useState(false);
  const onClickBack = () => {
    if (content !== "" || Array.from(files).length !== 0) {
      const formData = new FormData();
      formData.append("content", content);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append(`file${i}`, file);
      }

      axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/temp-note/cate-id/${cateId}`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
        transformRequest: (data, headers) => {
          return data;
        },
      })
        .then((res) => {
          console.log("임시저장", res);
          alert("임시저장되었습니다");
        })
        .catch((err) => console.log(err));
    }
    router.back();
  };
  const onClickMenu = () => {
    setMenuClick((prev) => !prev);
  };
  return (
    <div className=" fixed top-0 m-auto w-full sm:w-[640px]">
      <div className="py-5 text-xl flex justify-between w-full items-center relative bg-mainColor">
        <span onClick={onClickBack} className="cursor-pointer">
          <BsChevronLeft />
        </span>
        <span className="font-bold">{title}</span>
        <span
          onClick={onClickMenu}
          className={cls(
            "mr-5 cursor-pointer",
            cateId === null ? "opacity-0" : ""
          )}
        >
          <BiMenu />
        </span>

        {menuClick ? (
          <Link
            href={`${cateId}/files`}
            className=" bg-white absolute top-14 right-0 sm:-right-10 shadow-lg cursor-pointer"
          >
            <span className="px-14 py-1  text-lg">서랍장</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default NoteBar;
