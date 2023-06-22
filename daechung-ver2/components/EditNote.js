import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { changeState, editState } from "./atom";
import axios from "axios";

const EditNote = ({ editNoteId, editNoteContent }) => {
  const { register, handleSubmit, reset } = useForm();
  const editBtnRef = useRef();
  const [change, setChange] = useRecoilState(changeState);
  const [edit, setEdit] = useRecoilState(editState);

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

  const onValidEdit = (data) => {
    console.log(data);
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/notes/note-id/${editNoteId}`, {
        content: data.editNoteContent,
      })
      .then((res) => {
        console.log("수정", res);
        setEdit(false);
        setChange((prev) => !prev);
      })
      .catch((err) => console.log(err));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onValidEdit)}>
      <textarea
        onKeyDown={handleEditKeyDown}
        className="w-full"
        autoFocus
        {...register("editNoteContent", {
          value: editNoteContent,
        })}
      />
      <button ref={editBtnRef} type="submit" className="hidden">
        수정
      </button>
    </form>
  );
};

export default EditNote;
