import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const kakaoCallback = () => {
  let code;
  const router = useRouter();

  useEffect(() => {
    code = new URL(window.location.href).searchParams.get("code");
    function getToken() {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/kakaoCallback?code=${code}`
        )
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          router.push("/main");
        })
        .catch((err) => console.log(err));
    }
    getToken();
  }, []);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      로그인 중입니다...
    </div>
  );
};

export default kakaoCallback;
