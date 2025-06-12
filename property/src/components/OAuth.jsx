import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data)
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("counld not sign in google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="text-white  bg-red-700 p-3 rounded-lg uppercase hover:opacity-85"
    >
      Continue with google
    </button>
  );
};

export default OAuth;
