import React, { useCallback, useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import NoteBar from "@/components/NoteBar";
import moment from "moment";
import { useRecoilState } from "recoil";
import { changeState } from "@/components/atom";
import { editState } from "@/components/atom";
import axios from "axios";
import { cls } from "@/libs/utils";
import EditNote from "@/components/EditNote";

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

  const [change, setChange] = useRecoilState(changeState);
  const [edit, setEdit] = useRecoilState(editState);
  const [notes, setNotes] = useState();
  const [cateName, setCateName] = useState();

  const [editNoteId, setEditNoteId] = useState();
  const [editNoteContent, setEditNoteContent] = useState("");
  const [tempNote, setTempNote] = useState();

  const messageEndRef = useRef(null);

  const cateId = router.query.id;

  const onValid = (data) => {
    if (
      (tempNote?.content !== "" || watch("content") === "") &&
      data.content === "" &&
      files.length === 0
    )
      return;
    const formData = new FormData();
    formData.append("content", data.content);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append(`file${i}`, file);
    }

    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/notes/cate-id/${cateId}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      transformRequest: (data, headers) => {
        return data;
      },
    })
      .then((res) => {
        console.log(res);
        setChange((prev) => !prev);
      })
      .catch((err) => console.log(err));
    console.log(tempNote);

    let tempNoteCopy = { ...tempNote };

    tempNoteCopy.content = "";
    tempNoteCopy.__tempFiles__ = [];

    setTempNote(tempNoteCopy);
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

  const onClickEdit = (noteId, noteContent) => {
    setEdit((prev) => !prev);
    setEditNoteId(noteId);
    setEditNoteContent(noteContent);
  };

  const onClickDelete = (noteId) => {
    let input = confirm("삭제하시겠습니까?");
    if (input) {
      axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/notes/note-id/${noteId}`)
        .then((res) => setChange((prev) => !prev))
        .catch((err) => console.log(err));
    }
  };

  const downloadFile = (file) => {
    console.log(file);
    const fileUrl = file.fileUrl;

    axios
      .get(fileUrl, { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.originalName); // 다운로드될 파일의 이름을 설정합니다
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        console.log(res);
      })
      .catch((err) => console.log(err));
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
  }, [change, setChange, edit, setEdit]);

  useEffect(() => {
    // editNoteId가 변경될 때마다 해당 노트의 내용을 가져와서 상태 업데이트
    const note = notes?.find((note) => note.id === editNoteId);
    if (note) {
      setEditNoteContent(note.content);
    }
    register("editNoteContent");
  }, [editNoteId, register]);
  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [notes]);

  return (
    <Layout>
      <div className=" flex flex-col min-h-screen w-full">
        <div className="bg-mainColor flex-grow w-full">
          <NoteBar
            title={cateName}
            cateId={cateId}
            content={watch("content")}
            files={watch("files")}
          />

          <div
            className={cls(
              "space-y-7 mt-32 mb-60 px-3",
              files && Array.from(files).length ? `mb-96` : ""
            )}
          >
            {notes?.map((note, i) => (
              <NoteWrap key={i} className="text-[#545454] text-lg ">
                {edit && note.id === editNoteId ? (
                  <EditNote
                    editNoteId={editNoteId}
                    editNoteContent={editNoteContent}
                  />
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
                    <EditBtn onClick={() => onClickEdit(note.id, note.content)}>
                      수정
                    </EditBtn>
                    <EditBtn onClick={() => onClickDelete(note.id)}>
                      삭제
                    </EditBtn>
                  </div>
                </div>
                {note.__files__?.length === 0 ? null : (
                  <div className="border-t mt-4 space-y-2 cursor-pointer">
                    {note.__files__?.map((f) => (
                      <div>
                        <span onClick={() => downloadFile(f)}>
                          {f.originalName}
                        </span>
                        {/* 다운로드 버튼 추가 */}
                      </div>
                    ))}
                  </div>
                )}
              </NoteWrap>
            ))}
            <div ref={messageEndRef}></div>
          </div>
        </div>

        <div className="fixed bottom-0 sm:bottom-10 sm:w-[640px]">
          <form onSubmit={handleSubmit(onValid)} className="relative ">
            <textarea
              onKeyDown={handleKeyDown}
              placeholder="내용을 입력하세요"
              {...register("content")}
              className="textarea h-32 sm:h-44 w-screen sm:w-full focus:outline-none p-2 placeholder:text-sm break-all normal-nums"
              defaultValue={tempNote?.content}
            >
              {}
            </textarea>
            <label
              htmlFor="files"
              className="bg-gray-500  text-white font-bold px-5 py-1 rounded-t-xl absolute left-1 -top-8 hover:cursor-pointer"
            >
              첨부파일
            </label>
            <input
              id="files"
              {...register("files")}
              type="file"
              name="files"
              accept=".ppt,.pptx,application/vnd.ms-powerpoint,.hwp,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
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
          <div className="-mt-2 mb-4 border-t bg-white">
            {files && Array.from(files).length !== 0
              ? Array.from(files).map((f) => (
                  <div className="border-b">{f.name}</div>
                ))
              : null}
            {tempNote?.__tempFiles__ &&
            Array.from(tempNote?.__tempFiles__).length !== 0
              ? Array.from(tempNote?.__tempFiles__).map((f) => (
                  <div className="border-b">{f.name}</div>
                ))
              : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NoteDetail;
