import Bar from "@/components/Bar";
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

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const 임시 = [
  {
    id: 0,
    title: "대충이 만들기1",
    content:
      "오늘은 대충이 버전2를 만들었다 css를 한꺼번에 다시 만들어야 해서 좀 힘들었지만 그래도 공부하느니 이거 하는게 재밌다 허허 아닌가? 공부시러 제발 으ㅡㅡ으우ㅜㅜ",
  },
  {
    id: 1,
    title: "대충이 만들기2",
    content:
      "오늘은 대충이 버전2를 만들었다 css를 한꺼번에 다시 만들어야 해서 좀 힘들었지만 그래도 공부하느니 이거 하는게 재밌다 허허 아닌가? 공부시러 제발 으ㅡㅡ으우ㅜㅜ",
  },
  {
    id: 2,
    title: "대충이 만들기3",
    content:
      "오늘은 대충이 버전2를 만들었다 css를 한꺼번에 다시 만들어야 해서 좀 힘들었지만 그래도 공부하느니 이거 하는게 재밌다 허허 아닌가? 공부시러 제발 으ㅡㅡ으우ㅜㅜ",
  },
];
const EditBtn = tw.button`
    border-[1.5px]
    border-pointColor
    rounded-lg
    px-2
    hover:shadow-lg
`;

const Notes = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [addState, setAddState] = useState(false);
  const [change, setChange] = useRecoilState(changeState);

  const [noteData, setNoteData] = useState();

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

  const onClickEdit = () => {};
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
      <div className="mb-12 relative h-screen w-full">
        <div className="border-b px-6  py-8 sm:py-10">
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
          <Link key={i} href={`/notes/${String(n.cate.id)}`}>
            <div className="px-6 py-3 sm:py-6 border-b bg-bgColor cursor-pointer">
              {/* 노트들 묶음 */}
              <div className="flex justify-between pb-5">
                <span className="font-bold">{n.cate.name}</span>
                <div className="text-pointColor space-x-3 font-bold">
                  <EditBtn>수정</EditBtn>
                  <EditBtn>삭제</EditBtn>
                </div>
              </div>
              <div className="h-12 overflow-hidden whitespace-normal text-ellipsis break-keep  content">
                {n?.note}
              </div>
            </div>
          </Link>
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
