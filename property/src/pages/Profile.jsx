import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
const Profile = () => {
  const fileRef=useRef(null)
  const {currentUser}=useSelector((state)=>state.user)

  const handleFileUpload=async(e)=>{
const file=e.target.file
if(!file) return

const data=new FormData()
data.append('file',file)
data.append("upload_present",'mern property')
data.append('cloud_name','dkbyjjnw5')

const res=await fetch ('https://res.cloudinary.com/demo/dkbyjjnw5/image/upload',{
  method:'POST',
  body:data
})

const uploadImageURL=await res.josn
console.log(uploadImageURL)

console.log(file)
  }

    
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form action="" className='flex flex-col gap-4'>
        <input type='file' onChange={handleFileUpload} ref={fileRef} hidden accept='images/*'/>
        <img onClick={()=>{fileRef.current.click()}} src={currentUser.avatar} alt='image' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <input type='text' id='username' placeholder='username' className='border p-3 rounded-lg'/>
        
        <input type='email' id='email' placeholder='email' className='border p-3 rounded-lg'/>
       
        <input type='password' id='password' placeholder='password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account </span>

        <span className='text-red-700 cursor-pointer'>Sign Out </span>
      </div>
    </div>
  )
}

export default Profile