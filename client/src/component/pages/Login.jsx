import React,{useActionState} from 'react'
import { Link , useNavigate } from 'react-router-dom'

function Login() {

    const [error,submitAction,isPending] = useActionState(saveUser,undefined)
    const navigate = useNavigate()
    function saveUser (prev,formData)
    {
        const email = formData.get('email')
        const password = formData.get('password')
        if(!email.trim())
            return {error:"Email is required."}
        if(!password.trim())
            return {error:"Password is required"}

        fetch('/api/login',{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({email,password}) ,
          credentials:'include'
        })
        .then(res=>res.json())
        .then((data)=>{
          if(data.flag)
          {
            navigate('/')
          }
        })
        .catch((error)=>{
          console.log(error)
        })
        
        
    }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action={submitAction}>
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div className="mt-2">
          <input type="email" name="email" id="email"  required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
          <div className="text-sm">
            <Link to="/forgot-password" className="font-semibold text-orange-400 hover:text-indigo-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input type="password" name="password" id="password" autocomplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <button type="submit" disabled={isPending} className={` ${isPending ? " bg-orange-400 " : "bg-orange-500" } flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Sign in</button>
      </div>
    </form>
    {}
    {error?.error && <p className='text-red-500'>{error.error}</p>}
    {error?.message && <p className='text-green-500'>{error.message}</p>}
  </div>
</div>
  )
}

export default Login
