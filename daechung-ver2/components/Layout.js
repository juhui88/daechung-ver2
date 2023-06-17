import React, { useEffect, useState } from "react";
import Bar from "./Bar";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import { cls } from "@/libs/utils";

const Layout = ({ children }) => {
  const router = useRouter();
  const [width, setWidth] = useState(false);

  return (
    <div className="h-full">
      <div
        className={cls(
          " sm:w-[640px] flex-1 mx-auto  border-l border-r  ",
          router.pathname === "/" ? "" : "mb-[52px]"
        )}
      >
        {children}
      </div>

      <div>
        {isMobile ? (
          router.pathname === "/main" ||
          router.pathname === "/notes" ||
          router.pathname === "/portfolio" ? (
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
