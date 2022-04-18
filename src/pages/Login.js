import { Link } from "react-router-dom" 
const Login = ()=>{
     return (
        <div className="pt-24 sm:pt-0  flex justify-between align-middle">  
          <div className="self-center flex-1"> 
               <h2 className="text-xl font-mono font-bold text-center py-9 text-white">Welcome To Chat Hive</h2>
               <form className="flex flex-col justify-center align-middle space-y-10">
                  <input placeholder="Enter Email" type="email" className="self-center w-2/5 outline-none p-2 rounded-md" />
                  <input placeholder="Enter Password" type="password" className="self-center w-2/5 outline-none p-2 rounded-md"/>
                  <button className="bg-violet-500 hover:bg-violet-600 self-center w-2/5 cursor-pointer text-white p-2 rounded-md">Login</button>
               </form>

               <p className="text-center text-white pt-4">Already have an Account ? <span className="text-violet-500"><Link to="/">Sign Up</Link></span></p>
          </div>
          <img src="/img/invite5.jpg" className="max-h-screen object-cover flex-1 hidden md:block"/>
        </div>
    )
}

export default Login 