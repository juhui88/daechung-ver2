import Layout from "@/components/Layout";
import NoteBar from "@/components/NoteBar";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Files = () => {
  const router = useRouter();
  console.log(router.asPath.slice(7, 8));
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/files/${router.asPath.slice(7, 8)}`
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Layout>
      <div className="px-3 bg-mainColor h-full">
        <NoteBar title={"대충이 만들기 > 서랍장"} id={null} />
      </div>
    </Layout>
  );
};

export default Files;
