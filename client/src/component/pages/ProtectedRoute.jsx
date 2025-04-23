import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 loading state
    const navigate = useNavigate()
  useEffect(() => {
    fetch("/api/verify-login", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.flag) {
            // localStorage.clear()
            localStorage.setItem("user",JSON.stringify(data.user))
          setIsAuthenticate(true);
        } else {
          setIsAuthenticate(false);
        }
        setLoading(false); // 👈 stop loading after response
      })
      .catch(err => {
        console.error("Auth check failed:", err);
        setIsAuthenticate(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <div className='border-4  border-dashed rounded-full animate-spin border-orange-500 h-20 w-20 flex justify-center items-center'>
          <div className='h-5 w-5 bg-orange-300 rounded-full'></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticate ? (
        children
      ) : (
            navigate('/login')        
      )}
    </>
  );
}

export default ProtectedRoute;
