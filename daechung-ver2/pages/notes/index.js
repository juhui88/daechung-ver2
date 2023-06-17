import React, { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import tw from "tailwind-styled-components";
import Link from "next/link";
import { ImPlus } from "react-icons/im";
import axios from "axios";
import { useRecoilState } from "recoil";
import { changeState } from "@/components/atom";
import { cls } from "@/libs/utils";

const EditBtn = tw.button`
    border-[1.5px]
    border-pointColor
    rounded-lg
    px-2
    hover:shadow-lg
    z-10
`;

const Notes = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [addState, setAddState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [editCateId, setEditCateId] = useState();
  const [change, setChange] = useRecoilState(changeState);

  const [noteData, setNoteData] = useState([]);

  const onClickAdd = () => {
    setAddState((prev) => !prev);
  };
  const onValidSearch = (data) => {
    console.log(data.search);
    if (data.search === "") alert("검색어를 입력해주세요");
    reset();
  };
  const onValidAdd = (data) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/cates`, {
        cateName: data.title,
      })
      .then((res) => {
        console.log(res);
        setChange((prev) => !prev);
      })
      .catch((err) => console.log(err));
    reset();
    setAddState(false);
  };

  const onClickEdit = (cateId) => {
    setEditState(true);
    setEditCateId(cateId);
  };
  const onValidEdit = (data) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/cates/cate-id/${editCateId}`, {
        cateName: data.cateName,
      })
      .then((res) => {
        setChange((prev) => !prev);
        setEditState(false);
      })
      .catch((err) => console.log(err));
    reset();
  };
  const onClickDelte = (cateId) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/cates/cate-id/${cateId}`)
      .then((res) => {
        console.log(res);
        setChange((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/cates`)
      .then((res) => {
        console.log(res.data.cates);
        setNoteData(res.data.cates.reverse());
      })
      .catch((err) => console.log(err));
  }, [change, setChange]);
  return (
    <Layout>
      <div className={cls("mb-12 relative w-full h-screen")}>
        <div className=" border-b px-6  py-8 sm:py-10">
          <form
            onSubmit={handleSubmit(onValidSearch)}
            className=" relative flex items-center w-11/12"
          >
            <input
              {...register("search")}
              placeholder="검색"
              className="border border-black w-full rounded-full py-1 pl-3"
            />
            <button className="absolute right-2">
              <BsSearch />
            </button>
          </form>
        </div>

        {addState ? (
          <div className="px-6 py-3 sm:py-6 border-b bg-bgColor cursor-pointer h-[152px]">
            <form
              onSubmit={handleSubmit(onValidAdd)}
              className="flex justify-between pb-5"
            >
              <input
                autoFocus
                {...register("title")}
                className="font-bold w-3/4 focus:outline-none border"
              />
            </form>
            <div className="overflow-hidden whitespace-normal text-ellipsis break-keep  content"></div>
          </div>
        ) : null}

        {noteData?.map((n, i) => (
          <div
            key={i}
            className="flex bg-bgColor cursor-pointer px-6 py-3 sm:py-6 border-b"
          >
            <Link
              key={i}
              href={`/notes/${String(n.cate.id)}`}
              className="flex-1"
            >
              {editState && editCateId === n.cate.id ? (
                <form onSubmit={handleSubmit(onValidEdit)}>
                  <input
                    autoFocus
                    {...register("cateName", { value: n.cate.name })}
                  />
                </form>
              ) : (
                <span className="font-bold">{n.cate.name}</span>
              )}

              <div className="h-12 overflow-hidden whitespace-normal text-ellipsis break-keep  content">
                {n.note?.id}
              </div>
            </Link>
            <div className="text-pointColor space-x-3 font-bold">
              <EditBtn onClick={() => onClickEdit(n.cate.id)}>수정</EditBtn>
              <EditBtn onClick={() => onClickDelte(n.cate.id)}>삭제</EditBtn>
            </div>
          </div>
        ))}
        <div
          onClick={onClickAdd}
          className="fixed bottom-20 right-0 sm:right-10 justify-end  bg-pointColor border-8 border-pointColor rounded-full flex items-center pl-2 space-x-1 font-bold shadow-xl "
        >
          <div className="text-white text-lg">추가하기</div>
          <div className="bg-white rounded-full  text-pointColor text-xl font-bold p-2">
            <ImPlus />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notes;
