import Image from "next/image";
import React from "react";
import check from "../../public/home/check.png";
import point1 from "../../public/home/points/1.png";
import point2 from "../../public/home/points/2.png";
import point3 from "../../public/home/points/3.png";
import point4 from "../../public/home/points/4.png";
import tw from "tailwind-styled-components";

export const PointText = tw.span`
  text-lg sm:text-3xl font-bold
`;
const pointInfo = [
  {
    id: 1,
    title: "바로 사용할 수 있는 쉬운 사용법",
    content: "직관적인 템플릿으로 누구나 바로 사용할 수 있어요",
    src: point1,
  },
  {
    id: 2,
    title: "나를 돌아볼 수 있는 포트폴리오",
    content:
      "노트를 많이 작성하면 포트폴리오에서 내가 요즘 자주 쓰는 항목을 한눈에 파알할 수 있어요",
    src: point2,
  },
  {
    id: 3,
    title: "항목 별 간편 정리",
    content: "기록하고 싶은 활동을 항목으로 자유롭게 정리해보세요",
    src: point3,
  },
  {
    id: 4,
    title: "언제 어디서나 기록",
    content: "컴퓨터뿐만 아니라 모바일에서도 이용할 수 있어요",
    src: point4,
  },
];

const Point = () => {
  return (
    <div className="space-y-10">
      {pointInfo.map((p) => (
        <div>
          <div className="flex items-center space-x-2">
            <Image src={check} alt={p.id} className="w-10" />
            <PointText>
              Point {p.id} : {p.title}
            </PointText>
          </div>
          <div className="mx-12 flex items-center space-x-3">
            <Image src={p.src} alt={p.id} className="w-20" />
            <div className="flex-1">{p.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Point;
