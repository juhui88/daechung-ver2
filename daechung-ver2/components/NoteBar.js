import Link from "next/link";
import React, { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { useRouter } from "next/router";
import { cls } from "@/libs/utils";

const NoteBar = ({ title, id }) => {
  const router = useRouter();
  const [menuClick, setMenuClick] = useState(false);
  const onClickBack = () => {
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
          className={cls("mr-5 cursor-pointer", id === null ? "opacity-0" : "")}
        >
          <BiMenu />
        </span>

        {menuClick ? (
          <Link
            href={`${id}/files`}
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
