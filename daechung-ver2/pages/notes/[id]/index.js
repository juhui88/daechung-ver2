import React, { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import NoteBar from "@/components/NoteBar";
import moment from "moment";
import { useRecoilState } from "recoil";
import { changeState } from "@/components/atom";
import axios from "axios";

const NoteWrap = tw.div`
    bg-bgColor
    px-10
    py-4
    rounded-l-2xl
    rounded-tr-2xl
`;

const EditBtn = tw.button`
    border-[1px]
    border-pointColor
    text-pointColor
    rounded-lg 
    px-2
    text-sm
    sm:text-lg
`;

const NoteSpan = tw.span`
    text-sm
    sm:text-lg
`;
const 임시 = [
  {
    content:
      "오늘은 아이와 be 동사의 의문문과 부정문 진도를 나갔습니다. 아이가 의문문 만드는 것을 조금 어려워하여 보충 자료로 다시 연습해보았습니다.",
    날짜: "2023-05-22",
    files: [],
  },
];
const NoteDetail = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [files, setFiles] = useState();
  const router = useRouter();
  const btnRef = useRef();
  const [change, setChange] = useRecoilState(changeState);
  const [notes, setNotes] = useState();
  const [cateName, setCateName] = useState();
  const id = router.query.id;

  const onValid = (data) => {
    if (data.content === "" && data.files.length === 0) return;
    const formData = new FormData();
    formData.append("content", data.content);
    console.log(formData);
    if (Array.from(data.files).length !== 0) {
      Array.from(data.files).map((f) => formData.append("file", f));
    }
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/notes/cate-id/${id}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        console.log(res);
        setChange((prev) => !prev);
      })
      .catch((err) => console.log(err));
    reset();
  };
  const insertFiles = (e) => {
    console.log(e);
  };
  const handleKeyDown = (e) => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      btnRef.current.click();
    } else if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      textarea.value = value.substring(0, start) + "\n" + value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 1;
    }
  };

  const onChangeFile = (e) => {
    watch(files);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/notes/main/cate-id/${id}`)
      .then((res) => {
        console.log(res);
        setNotes(res.data.notes);
        setCateName(res.data.cate.name);
      })
      .catch((err) => console.log(err));
  }, [change, setChange]);
  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <div className="bg-mainColor px-3 flex-grow">
          <NoteBar title={cateName} id={router.query.id} />
          <div className="space-y-7 mb-20">
            {notes?.map((note, i) => (
              <NoteWrap key={i} className="text-[#545454] text-lg ">
                <NoteSpan>{note.content}</NoteSpan>
                <div className="flex justify-between items-center">
                  <NoteSpan className="text-pointColor">
                    {note.createdAt.slice(0, 10)}
                  </NoteSpan>
                  <div className="space-x-3">
                    <EditBtn>수정</EditBtn>
                    <EditBtn>삭제</EditBtn>
                  </div>
                  {note.__files__?.length === 0 ? null : (
                    <div className="border-t mt-3 h-20"></div>
                  )}
                </div>
              </NoteWrap>
            ))}
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(onValid)} className="relative">
            <textarea
              onKeyDown={handleKeyDown}
              placeholder="내용을 입력하세요"
              {...register("content")}
              className="textarea h-44 w-full focus:outline-none p-2 placeholder:text-sm break-all normal-nums"
            />
            <label
              htmlFor="files"
              className="bg-gray-500  text-white font-bold px-5 py-1 rounded-t-xl absolute left-1 -top-8"
            >
              첨부파일
            </label>
            <input
              onChange={(e) => onChangeFile(e)}
              id="files"
              {...register("files")}
              type="file"
              className="hidden"
              multiple
            />
            <button
              ref={btnRef}
              className="bg-gray-500 text-white font-bold px-5 py-1 absolute right-1 rounded-t-xl -top-8"
            >
              입력
            </button>
          </form>
          <div></div>
        </div>
      </div>
    </Layout>
  );
};

export default NoteDetail;
