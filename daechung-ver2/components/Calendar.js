import axios from "axios";
import { cls } from "../libs/utils";
import moment from "moment";
import "moment/locale/ko";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import grassImg from "../public/잔디.png";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { selectDayState } from "./atom";

const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

export default function CalendarBar() {
  const [date, setDate] = useState(moment());
  const [yearClicked, setYearClicked] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    Number(date.clone().format("YYYY"))
  );

  const [today, setToday] = useState(date.clone().format("YYYY-MM-DD"));
  const [grass, setGrass] = useState([]);
  const [selectedDay, setSelectedDay] = useRecoilState(selectDayState);
  const handleMonth = (num) => {
    num
      ? setDate(date.clone().add(1, "month"))
      : setDate(date.clone().subtract(1, "month"));
  };
  const returnToday = () => setDate(moment());
  const onClickDay = (current) => {
    setSelectedDay(current.clone());
  };
  const buildCalendar = () => {
    const dateStartWeek = date.clone().startOf("month").week();
    // date가 속하는 달의 첫번쨰 주가 이번년도의 몇번째 주인가

    const dateEndWeek =
      date.clone().endOf("month").week() === 1
        ? 53
        : date.clone().endOf("month").week();
    // date가 속하는 달의 마지막 주가 이번년도의 몇번째 주인가
    // 마지막 주가 1이 나오는 경우(12월의 마지막주에서 1월이 과반수일때)엔 53으로 수정해주어야 함

    let calendar = [];

    for (let week = dateStartWeek; week <= dateEndWeek; week++) {
      calendar.push(
        <div
          key={week}
          className="grid grid-cols-7 items-center justify-items-center gap-10 "
        >
          {[
            Array(7)
              .fill(0)
              .map((n, i) => {
                let current = date
                  .clone()
                  .week(week)
                  .startOf("week")
                  .add(i, "day");

                const isMonth = current.format("MM") !== date.format("MM");
                const isToday = current.clone().format(`YYYY-MM-DD`) === today;

                return (
                  <div key={i} className="relative">
                    <span
                      className={cls(
                        "text-center hover:font-extrabold text-lg px-1",
                        isMonth ? "text-gray-200" : "",
                        !isMonth && isToday
                          ? " bg-[#bed0d9] rounded-full px-2 py-1"
                          : "",
                        selectedDay.format("YYYY-MM-DD") ===
                          current.format("YYYY-MM-DD")
                          ? "font-extrabold"
                          : ""
                      )}
                      onClick={() => onClickDay(current)}
                    >
                      {current.format("D")}
                    </span>
                    {grass[current.clone().format("DD")] ? (
                      <Image className="absolute -bottom-2" src={grassImg} />
                    ) : null}
                  </div>
                );
              }),
          ]}
        </div>
      );
    }
    return calendar;
  };

  const onClickYear = () => {
    setYearClicked((prev) => !prev);
  };

  const buildYear = () => {
    let years = [];

    const onClickSelectedYear = (i) => {
      setDate(date.clone().year(i));
      setYearClicked(false);
    };

    for (let i = selectedYear - 2; i < selectedYear + 4; i++) {
      years.push(
        <span
          className={cls(
            i == date.clone().format("YYYY") ? "text-textPoint" : ""
          )}
          onClick={() => onClickSelectedYear(i)}
        >
          {i}
        </span>
      );
    }

    return years;
  };

  const handleSelectedYear = (num) =>
    num
      ? setSelectedYear(selectedYear + 12)
      : setSelectedYear(selectedYear - 12);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/grass?year=${date
          .clone()
          .format("YYYY")}&month=${date.clone().format("MM")}`
      )
      .then((res) => {
        setGrass(res.data.grass);
      })
      .catch((err) => console.log(err));
  }, [date]);
  return (
    <div className="select-none bg-bgColor w-full">
      {yearClicked ? (
        <div
          className="opacity-0 fixed top-0 left-0 bottom-0 z-10 w-screen h-srceen "
          onClick={onClickYear}
        ></div>
      ) : null}
      <div className="mx-auto">
        <div className="relative px-10 pb-5 pt-2 text-sm m-2 ">
          <div className=" flex items-center flex-row space-x-1 ">
            <span className="text-gray-600 text-lg">
              {date.clone().format("YYYY")}
            </span>
            <span className="cursor-pointer" onClick={onClickYear}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>
          <div className="flex justify-center items-center space-x-1  pb-5 ">
            <span onClick={() => handleMonth(0)} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </span>
            <span className="w-20 text-center text-3xl">
              {date.clone().format("MMMM")}
            </span>
            <span onClick={() => handleMonth(1)} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
          </div>
          <div className="grid grid-cols-7 gap-10 justify-items-center items-center pt-3 pb-10">
            {dayOfWeek.map((d, i) => (
              <span key={i} className="text-base font-bold">
                {d}
              </span>
            ))}
          </div>
          <div className="space-y-5 sm:space-y-10">{buildCalendar()}</div>
          {yearClicked ? (
            <div className="absolute shadow-2xl top-8 p-3 z-50 rounded-md bg-white">
              <div className=" grid">{buildYear()}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
