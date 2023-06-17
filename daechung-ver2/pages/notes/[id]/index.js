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

const NoteDetail = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const files = watch("files");
  const router = useRouter();
  const btnRef = useRef();
  const editBtnRef = useRef();
  const [change, setChange] = useRecoilState(changeState);
  const [notes, setNotes] = useState();
  const [cateName, setCateName] = useState();
  const [editState, setEditState] = useState(false);
  const [editNoteId, setEditNoteId] = useState();
  const [tempNote, setTempNote] = useState();
  const cateId = router.query.id;

  const onValid = (data) => {
    console.log(data.files);
    if (data.content === "" && data.files.length === 0) return;
    const formData = new FormData();
    formData.append("content", data.content);

    for (let i = 0; i < data.files.length; i++) {
      const file = data.files[i];
      formData.append(`file${i}`, file);
      console.log(file);
    }

    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/notes/cate-id/${cateId}`,
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

  const handleEditKeyDown = (e) => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      editBtnRef.current.click();
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

  const onClickEdit = (noteId) => {
    setEditState(true);
    setEditNoteId(noteId);
  };
  const onClickDelete = (noteId) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/notes/note-id/${noteId}`)
      .then((res) => setChange((prev) => !prev))
      .catch((err) => console.log(err));
  };
  const onValidEdit = (data) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/notes/note-id/${editNoteId}`, {
        content: data.noteContent,
      })
      .then((res) => {
        console.log(res);
        setEditState(false);
        setChange((prev) => !prev);
      })
      .catch((err) => console.log(err));
    reset();
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/notes/main/cate-id/${cateId}`)
      .then((res) => {
        console.log(res);
        setNotes(res.data.notes.reverse());
        setCateName(res.data.cate.name);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/temp-note/cate-id/${cateId}`)
      .then((res) => {
        console.log("tempNote", res);
        setTempNote(res.data.tempNote);
      })
      .catch((err) => console.log(err));
  }, [change, setChange]);
  return (
    <Layout>
      <div className=" flex flex-col h-screen w-full">
        <div className="bg-mainColor flex-grow w-full">
          <NoteBar
            title={cateName}
            cateId={cateId}
            content={watch("content")}
          />

          <div className="space-y-7 mt-20 mb-60 px-3 ">
            {notes?.map((note, i) => (
              <NoteWrap key={i} className="text-[#545454] text-lg ">
                {editState && editNoteId === note.id ? (
                  <form onSubmit={handleSubmit(onValidEdit)}>
                    <textarea
                      onKeyDown={handleEditKeyDown}
                      className="w-full"
                      autoFocus
                      {...register("noteContent", { value: note.content })}
                    />
                    <button ref={editBtnRef} type="submit" className="hidden">
                      수정
                    </button>
                  </form>
                ) : (
                  <NoteSpan className="whitespace-pre-line">
                    {note.content}
                  </NoteSpan>
                )}

                <div className="flex justify-between items-center">
                  <NoteSpan className="text-pointColor">
                    {note.createdAt.slice(0, 10)}
                  </NoteSpan>
                  <div className="space-x-3">
                    <EditBtn onClick={() => onClickEdit(note.id)}>수정</EditBtn>
                    <EditBtn onClick={() => onClickDelete(note.id)}>
                      삭제
                    </EditBtn>
                  </div>
                </div>
                {note.__files__?.length === 0 ? null : (
                  <div className="border-t mt-4 space-y-2">
                    {note.__files__?.map((f) => (
                      <div>
                        <span>{}</span>
                        {f.originalName}
                      </div>
                    ))}
                  </div>
                )}
              </NoteWrap>
            ))}
          </div>
        </div>

        <div className="fixed bottom-10 w-[640px]">
          <form onSubmit={handleSubmit(onValid)} className="relative">
            <textarea
              onKeyDown={handleKeyDown}
              placeholder="내용을 입력하세요"
              {...register("content")}
              defaultValue={tempNote?.content}
              className="textarea h-32 sm:h-44 w-full focus:outline-none p-2 placeholder:text-sm break-all normal-nums"
            />
            <label
              htmlFor="files"
              className="bg-gray-500  text-white font-bold px-5 py-1 rounded-t-xl absolute left-1 -top-8"
            >
              첨부파일
            </label>
            <input
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
        </div>
      </div>
    </Layout>
  );
};

export default NoteDetail;
