import React from 'react'
import { BiSolidMessage } from "react-icons/bi";

function MessagesUi({setIsMessage,setIsNotification,setIsProfile,isMessage}) {
  return (
    <div className="relative">
              <button
                onClick={() => {
                  setIsProfile(false);
                  setIsNotification(false);
                  setIsMessage(!isMessage);
                }}
              >
                <BiSolidMessage className="text-2xl text-[gray] hover:text-orange-400 transition-all ease-in-out duration-400" />
              </button>
              <div
                className={` ${
                  isMessage
                    ? "flex translate-y-0"
                    : "opacity-100 -translate-y-[150%]"
                } transition-all ease-in-out duration-300 z-20  flex-col absolute top-10 -right-10 md:right-10 bg-orange-500 rounded-b-4xl rounded-t-4xl h-100 w-60`}
              >
                <div className="flex justify-center items-center p-5">
                  <h1 className=" text-lg md:text-2xl font-semibold text-white">
                    Messages
                  </h1>
                </div>
                <div className="bg-white">
                  {/* <p>the notification will come here right</p> */}
                </div>
              </div>
            </div>
  )
}

export default MessagesUi
