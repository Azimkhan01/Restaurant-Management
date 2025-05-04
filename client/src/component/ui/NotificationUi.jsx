import React, { useEffect, useState } from 'react'
import { GoBellFill } from "react-icons/go";
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";
import { toast } from 'react-toastify';

function NotificationUi({setIsMessage,setIsNotification,setIsProfile,isNotification}) {

      const [log, setLog] = useState([]);
      const [reset, setReset] = useState({
        limit: 3,
        skip: 0,
      });
      const [isloadingN,setIsLoadingN] = useState(false)
    
      const [disable,setDisable] = useState({Nleft:true,Nright:false})
      useEffect(() => {
        setIsLoadingN(true)
        fetch(`/api/show-log?limit=${reset.limit}&skip=${reset.skip}`)
          .then((res) => 
            {
              if(res.headers.get("length")==0)
                {
                  
                  setDisable(prev => ({
                    ...prev,
                    Nright: true
                  }));
              setIsLoadingN(false)
    
                }
              return res.json()
            })
          .then((r) => {
            if (r.flag) {
              // console.log(r)
              
                setDisable(prev => ({
                  ...prev,
                  Nright: false
                }));
                setLog(r.data);
              
            } else return toast(r.message);
    
              setIsLoadingN(false)
          });
      }, [reset, isNotification]);
    
      function paginateLeft() {
        if (reset.skip === 3) {
          setDisable(prev => ({
            ...prev,
            Nleft: true
          }));
        } else {
          setDisable(prev => ({
            ...prev,
            Nright: false
          }));
          setReset(prev => ({
            limit: prev.limit,
            skip: prev.skip - 3
          }));
        }
      }
      
      function paginateRight() {
        if (reset.skip >= 3) {
          setDisable(prev => ({
            ...prev,
            Nleft: false
          }));
        }
        setReset(prev => ({
          limit: prev.limit,
          skip: prev.skip + 3  // Was +1, changed to +3 for consistent pagination
        }));
      }

  return (
    <div className="relative">
                  <button
                    onClick={() => {
                      setIsProfile(false);
                      setIsMessage(false);
                      setIsNotification(!isNotification);
                    }}
                  >
                    <GoBellFill className="text-2xl text-[gray] hover:text-orange-400 transition-all ease-in-out duration-200" />
                  </button>
                  <div
                    className={`shadow ${
                      isNotification
                        ? "flex translate-y-0"
                        : "opacity-0 -translate-y-[150%]"
                    }  transition-all ease-in-out duration-400 z-20  flex-col absolute top-10 -right-10 md:right-10 bg-orange-500 rounded-b-4xl rounded-t-4xl h-100 w-60`}
                  >
                    <div className="flex justify-center items-center p-5">
                      <h1 className=" text-lg md:text-2xl font-semibold text-white">
                        Notification
                      </h1>
                    </div>
                    <div className="bg-white overflow-x-scroll scroll-container">
                      <div  className="flex flex-col gap-2 p-2 rounded-b-2xl">
                        {
                          isloadingN
                          ?
                              Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="shadow flex flex-col p-2 gap-2 animate-pulse bg-white rounded">
                              <div className="h-4 bg-gray-300 rounded w-1/3" />
                              <div className="h-3 bg-gray-200 rounded w-2/3" />
                              <div className="h-4 bg-gray-300 rounded w-1/4" />
                              </div>
                          ))
                          : (log?.length > 0)
                            ?
                            log.map((d, i) => {
                              // console.log(d);
                              return <div className="shadow flex flex-col p-1 gap-1" key={i}>
                                <h1 className="text-sm font-semibold">{d.by}</h1>
                                <p className="text-xs" >{d.message}</p>
                                <p className="text-sm font-semibold " >{(d.createdAt).replace("T"," ").split(".")[0]}</p>
                              </div>;
                            })
                            :
                              <div>
                                <p>There is not Log yet..</p>
                              </div>
                        }
                      </div>
                      <div className="flex p-2 justify-between items-center text-xl">
                        <button onClick={paginateLeft} disabled={disable.Nleft}>
                          <FaCaretSquareLeft className={`${disable.Nleft ? 'text-orange-300' :'text-orange-500'}`} />
                        </button>
                        <button  onClick={paginateRight}>
                          <FaCaretSquareRight className={`${disable.Nright ? 'text-orange-300' :'text-orange-500'}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
  )
}

export default NotificationUi
