import React, { useEffect, useReducer, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PiDotsThreeVertical } from "react-icons/pi";
import { BsArrowRightCircleFill } from "react-icons/bs";
import NotificationUi from "./NotificationUi";
import MessagesUi from "./MessagesUi";
function Top({
  logo,
  setIsNavOpen,
  handlerName,
  handlerRole,
  setHandlerName,
  setHandlerRole,
}) {
  const [search, setSearch] = useState("");
  const [isNotification, setIsNotification] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  

  return (
    <div className="w-full flex flex-col md:flex-row justify-end  items-center p-2 bg-[#FAF9F5]">
      <div className=" w-full md:w-5/6 flex  self-end  items-center ">
        <div className="px-2 w-1/2 flex flex-row items-center md:hidden gap-3">
          <button
            onClick={() => {
              setIsNavOpen(true);
            }}
          >
            <BsArrowRightCircleFill className="text-2xl text-orange-600" />
          </button>
          <h1 className="text-3xl font-semibold text-[gray]">{logo}</h1>
        </div>

        <div className=" hidden md:flex gap-1 w-1/6 shadow p-2 rounded-l-2xl rounded-r-2xl">
          <span className="">
            <CiSearch className="text-2xl text-[gray]" />
          </span>
          <input
            type="search"
            placeholder="Search.."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="outline-none text-[gray]  placeholder:text-[gray] "
          />
        </div>
        <div className="flex justify-end w-5/6 items-center gap-3">
          <div className="flex ">
            <NotificationUi setIsMessage={setIsMessage} setIsNotification={setIsNotification} setIsProfile={setIsProfile} isNotification={isNotification} />
            <MessagesUi setIsMessage={setIsMessage} setIsNotification={setIsNotification} setIsProfile={setIsProfile} isMessage={isMessage} />
          </div>
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-black font-semibold">{handlerName}</h1>
              <h1 className="text-gray-500 font-semibold">{handlerRole}</h1>
            </div>
            <div>
              <div>
                <button
                  onClick={() => {
                    setIsNotification(false);
                    setIsMessage(false);
                    setIsProfile(!isProfile);
                  }}
                >
                  <PiDotsThreeVertical className="text-2xl text-[gray] hover:text-orange-400 transition-all ease-in-out duration-200" />
                </button>
                <div
                  className={` ${
                    isProfile ? "flex shadow" : "opacity-0 -translate-y-[150%] "
                  } transition-all ease-initial duration-400  flex-col absolute top-15 right-10 md:right-10 bg-white  h-40 w-60`}
                >
                  <button className="text-left text-gray-500 p-2">
                    Profile
                  </button>
                  <button className="text-left text-gray-500 p-2">
                    Privacy Setting
                  </button>
                  <button className="text-left text-gray-500 p-2 border-t-1  ">
                    Logout
                  </button>
                  <div className="bg-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Top;
