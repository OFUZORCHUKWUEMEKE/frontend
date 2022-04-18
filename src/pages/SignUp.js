import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import {useToast} from '@chakra-ui/react'
import {useHistory} from 'react-router-dom'
const SignUp = ()=>{
   const [show ,setShow] = useState(false)
   const [name,setName] =useState('')
   const [email,setEmail] =useState('')
   const [password,setPassword] = useState('')
   const [pic,setPic] = useState()
   const [loading,setLoading] = useState(false)
   const [image,setImage] = useState()
   const history = useHistory()
   const toast = useToast()


   const uploadImage = async () =>{
      const data = new FormData()
      data.append('file',image)
      data.append('upload_preset','wgp6gwof')
      try{
          setLoading(true)
          let res =await fetch('https://api.cloudinary.com/v1_1/dgwm7s0yy/image/upload',{method:'post',body:data}) 
          const urlData = await res.json()
          setLoading(false)
          return urlData.url
      }catch(error){
          toast({
             title:'Error while Uploading the Image',
             status:'error',
             duration:5000,
             isClosable:true,
             position:'bottom',
          })
      }
   
   }


   const validateImg = (e)=>{
      const file = e.target.files[0] 
      if(file.size >= 1048576){ 
          return alert("max file size is 1mb") 
      }else{
          setImage(file)
          console.log(pic)
      }
 }
    const handleSubmit = async(e)=>{    
       e.preventDefault()        
     const pics = await uploadImage()
     console.log(name,email,password)
     setPic(pics)
       setLoading(true)
       if(!name || !email || !password  ){
          toast({
             title:'Please Fill all the fields',
             status:'warning',
             duration:5000,
             isClosable:true,
             position:'bottom',
          })
          setLoading(false)
          return;
       }
       if(!pic) {
         toast({
            title:'Please upload an Image',
            status:'warning',
            duration:5000,
            isClosable:true,
            position:'bottom',
         })
       }
       try {
          const config = {
             headers:{
                "Content-type":"application/json"
             }
          }
          const {data} = await axios.post("http://localhost:5000/api/users",{name,email,password,pic},config)  
          toast({
            title:'Registration Successful',
            status:'success',
            duration:5000,
            isClosable:true,
            position:'bottom',
          })
          localStorage.setItem('userInfo',JSON.stringify(data))
          setLoading(false);
          console.log(data)
          history.push('/login')
       } catch (error) {
         setLoading(false);
         toast({
            title:'Error',
            description:'an error occured', 
            status:'success',
            duration:5000,
            isClosable:true,
            position:'bottom',
          })
       }
    }

     return (
        <div className="pt-24 sm:pt-0  flex justify-between align-middle">
          <img src="/img/invite6.jpg" className="max-h-screen object-cover flex-1 hidden md:block"/>  
          <div className="self-center flex-1"> 
               <h2 className="text-xl font-mono font-bold text-center py-9 text-white">Welcome To Chat Hive</h2>
               <form onSubmit={handleSubmit} className="flex flex-col justify-center align-middle space-y-10">
                  <input placeholder="Enter Username" type="text" onChange={(e)=>setName(e.target.value)} className="self-center w-2/5 outline-none p-2 rounded-md"/>
                  <input placeholder="Enter Email" type="email" onChange={(e)=>setEmail(e.target.value)} className="self-center w-2/5 outline-none p-2 rounded-md" />
                  <input placeholder="Enter Password" type="password" onChange={(e)=>setPassword(e.target.value)} className="self-center w-2/5 outline-none p-2 rounded-md"/>
                  <label className="block self-center"> 
                     <span className="sr-only">Choose Profile Photo</span> 
                    <input type="file" accept="image/*" onChange={validateImg} className="block w-full text-sm text-slate-500 file:mr4 file:py-2 file:px-4 file:rounded-full cursor-pointer file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
                  </label>                
                  <button className={loading ? `bg-violet-300 hover:bg-violet-600 self-center w-2/5 cursor-pointer text-white p-2 rounded-md`:`bg-violet-500 self-center w-2/5 cursor-pointer text-white p-2 rounded-md`} isLoading={loading}>Sign In</button>
               </form>
               <p className="text-center text-white pt-4">Already have an Account ? <span className="text-violet-500"><Link to="/login">Login</Link></span></p>
          </div>
        </div>
    )
}

export default SignUp 