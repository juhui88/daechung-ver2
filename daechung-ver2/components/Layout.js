import React, { useEffect, useState } from "react";
import Bar from "./Bar";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import { cls } from "@/libs/utils";

const Layout = ({ children }) => {
  const router = useRouter();
  const [width, setWidth] = useState(false);
  console.log(router.pathname);
  return (
    <div className="w-screen flex flex-col h-screen">
      <div
        className={cls(
          " sm:w-[640px] flex-grow mx-auto  border-l border-r mb-[52px] ",
          router.pathname === "/" ? "w-screen" : "w-full"
        )}
      >
        {children}
      </div>

      <div>
        {isMobile ? (
          router.pathname === "/main" ||
          router.pathname === "/notes" ||
          router.pathname === "/porfolio" ? (
            <Bar />
          ) : null
        ) : router.pathname === "/login" || router.pathname === "/" ? null : (
          <Bar />
        )}
      </div>
    </div>
  );
};

export default Layout;
