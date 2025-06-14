import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";

import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showlistingerror, setShowListingError] = useState(false);
  const fileRef = useRef(null);
  const [userListing,setUserListing]=useState([])

  const { currentUser, loading, error } = useSelector((state) => state.user);
  // console.log(currentUser);

  const handleShowListings =async () => {
    
    try {
      // console.log('inside')
      setShowListingError(false)
      const res=await fetch(`http://localhost:3000/api/user/listings/${currentUser._id}`,
       { credentials: "include",
      }  )
      
      const data=await res.json();
      // console.log('data',data)
      if(data.success===false){
        setShowListingError(true)
        return
      }
      setUserListing(data)
    } catch (error) {
      setShowListingError(true)
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.file;
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_present", "mern property");
    data.append("cloud_name", "dkbyjjnw5");

    const res = await fetch(
      "https://res.cloudinary.com/demo/dkbyjjnw5/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadImageURL = await res.josn;
    // console.log(uploadImageURL)

    // console.log(file)
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `http://localhost:3000/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success == false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          onChange={handleFileUpload}
          ref={fileRef}
          hidden
          accept="images/*"
        />
        <img
          onClick={() => {
            fileRef.current.click();
          }}
          src={currentUser.avatar}
          alt="image"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <input
          type="text"
          id="username"
          onChange={handleChange}
          defaultValue={currentUser.username}
          placeholder="username"
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          id="email"
          onChange={handleChange}
          defaultValue={currentUser.email}
          placeholder="email"
          className="border p-3 rounded-lg"
        />

        <input
          type="password"
          onChange={handleChange}
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90"
          to={"/create-listing"}
        >
          create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account{" "}
        </span>

        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out{" "}
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>

      <p className="text-green-700 mt-5">
        {updateSuccess ? "user is updated successfully" : ""}
      </p>
      <button onClick={handleShowListings} className="text-green-700 w-full ">
        Show listings
      </button>
      <p className="text-red-700 mt-5">{showlistingerror ? "somethoign went wrong" : ''}

      </p>
      {userListing && userListing.length>0 &&

      <div className="flex flex-col gap-4">
        <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
      {userListing.map((listings)=>(
        <div key={listings._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
          <Link to={`/listing/${listings._id}`}>
          <img src={listings.imageUrls[0]}
          alt="listing cover"
          className="h-16 w-16 object-contain"/>
          </Link>
          <Link className="text-slate-700 font-semibold flex-1 hover:underline truncate" to={`/listing/${listings._id}`}>
          <p >{listings.name}</p></Link>
          <div className="flex flex-col items-center">
            <button className="text-red-700"> Delete</button>
            <button className="text-green-700">Edit</button>
          </div>
        </div>
      ))}
      </div>}
    </div>
  );
};

export default Profile;
