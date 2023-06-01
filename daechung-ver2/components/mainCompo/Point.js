import Image from "next/image";
import React from "react";

const pointInfo = [
  {
    id: 1,
    title: "바로 사용할 수 있는 쉬운 사용법",
    content: "직관적인 템플릿으로 누구나 바로 사용할 수 있어요",
    src: "",
  },
  {
    id: 2,
    title: "나를 돌아볼 수 있는 포트폴리오",
    content:
      "노트를 많이 작성하면 포트폴리오에서 내가 요즘 자주 쓰는 항목을 한눈에 파알할 수 있어요",
    src: "",
  },
  {
    id: 3,
    title: "항목 별 간편 정리",
    content: "기록하고 싶은 활동을 항목으로 자유롭게 정리해보세요",
    src: "",
  },
  {
    id: 4,
    title: "언제 어디서나 기록",
    content: "컴퓨터뿐만 아니라 모바일에서도 이용할 수 있어요",
    src: "",
  },
];

const Point = () => {
  return (
    <div className="space-y-10">
      {pointInfo.map((p) => (
        <div>
          <div>
            <Image src="" alt="" />
            <span className="text-lg sm:text-3xl font-bold">
              Point {p.id} : {p.title}
            </span>
          </div>
          <div>
            <Image src={p.src} alt="" />
            <span>{p.content}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Point;
