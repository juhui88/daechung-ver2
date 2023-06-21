import Image from "next/image";
import tw from "tailwind-styled-components";
import Calendar from "@/components/Calendar";
import profile from "../public/대충이 프로필 사진.png";
import pin from "../public/핀.png";
import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { changeState, selectDayState } from "@/components/atom";
import Link from "next/link";
import { useRouter } from "next/router";

const Profile = tw.div`
  flex
  items-center
  my-4
  space-x-2
  cursor-pointer
`;
const CateItem = tw.div`
  bg-[#F0F0F0]
  py-2
  px-6
  rounded-bl-2xl
  rounded-se-2xl 
  mb-4
`;
export default function Main() {
  const [name, setName] = useState();
  const [selectedDay, setSelectedDay] = useRecoilState(selectDayState);
  const [dayCates, setDayCates] = useState([]);
  const [change, setChange] = useRecoilState(changeState);
  const router = useRouter();
  const onClickLogout = () => {
    window.localStorage.removeItem("token");
    router.push("/");
  };
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`)
      .then((res) => {
        setName(res.data.user.name);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/notes/date?year=${selectedDay.format(
          "YYYY"
        )}&month=${selectedDay.format("MM")}&day=${selectedDay.format("DD")}`
      )
      .then((res) => {
        console.log(res);
        setDayCates(res.data.cates);
      })
      .catch((err) => console.log(err));
  }, [selectedDay, change, setChange]);
  return (
    <Layout>
      <div className="min-h-screen p-5 sm:py-10 mb-32 sm:mb-12 ">
        <div className="flex justify-between items-center mx-10">
          <Profile>
            <Image
              src={profile}
              alt="profileImage"
              className="w-16 rounded-full border-[1px]"
            />
            <span className="font-bold">{name}</span>
          </Profile>
          <div
            onClick={onClickLogout}
            className="border px-10 py-3 rounded-3xl bg-bgColor font-bold text-gray-700 cursor-pointer"
          >
            로그아웃
          </div>
        </div>

        <div className="relative flex flex-col items-center mt-3 mb-5 ">
          <Image
            src={pin}
            alt="pin"
            className="w-5 absolute -top-3 rotate-[30deg]"
          />
          <span className="bg-mainColor p-1 px-6 rounded-xl">Calendar</span>
          <div className="w-full">
            <Calendar />
          </div>
        </div>
        <div className="space-y-2 mb-12">
          {dayCates.map((dC) => (
            <Link href={`/notes/${String(dC.id)}`}>
              <CateItem>{dC.name}</CateItem>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
