import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";


const SignUp = () => {
  const [formData, setForamData] = useState({});
  const [error, setError]=useState(null)
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();
  const handleChange = (e) => {
    setForamData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res=await fetch('http://localhost:3000/api/auth/signup',
        {
          method:'Post',
          credentials: "include",
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(formData)
        }
      );
      const data= await res.json();
      console.log('checkdata',data);
      if(data.success === false){
        setError(data.message);
        setLoading(false)
        return;
      }
  
      setLoading(false)
      setError(null)
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
   
   
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign UP</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have a Accuount?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
