import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams,useNavigate  } from "react-router-dom";
// import { } from "react-router-dom";

const UpdateListing = () => {
  const [files, setFiles] = useState([]);
  const[error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const {currentUser}=useSelector(state=>state.user)
  const navigate=useNavigate()
//   const userRef=useRef(null)
const params=useParams()
useEffect(()=>{
const fetchListing=async ()=>{
const listingId=params.listingId;
// console.log(listingid)
const res=await fetch(`http://localhost:3000/api/listing/get/${listingId}`)
const data=await res.json();
if(data.success===false){
    console.log(data.message)
    return
}
setFormData(data)
}
fetchListing();
},[])
  const [formData, setFormData] = useState({
    // imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if(e.target.type=== 'number' || e.target.type==='text' || e.target.type==='textarea'){
      setFormData({
        ...formData,
        [e.target.id]:e.target.value
    })  
    }
  };
//   console.log(formData);

const handleSubmit=async(e)=>{
e.preventDefault();
try {
    // if(formData.imageUrls.length<1) return setError('you must uploas atleat one image');
    if(formData.regularPrice<formData.discountedPrice) return setError('discount price must be less then real price')
    setLoading(true);
    // setError(false);
    const res=await fetch(`http://localhost:3000/api/listing/update/${params.listingId}`,{
        method:'POST',
        credentials: "include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            ...formData,
            userRef:currentUser._id
        })
        
    })
    
    console.log(formData)
    const data=await res.json();
    console.log(data._id)
    setLoading(false);
    if(data.success===false){
        setError(data.message);
    }
    navigate(`/listing/${data._id}`);
} catch (error) {
    setError(error.message)
    setLoading(false)
}
}
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">UpdateListing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg "
            id="name"
            maxLength={"62"}
            minLength={"10"}
            required
            onChange={handleChange}
            value={formData.name}
          />

          <textarea
            type="text"
            placeholder="description"
            className="border p-3 rounded-lg "
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg "
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />

              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />

              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />

              <span>Parking spot</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />

              <span>Furnished</span>
            </div>

          <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />

              <span>Offer</span>
            </div>
          </div>
          <div className="flex felx-wrap gap-6">
            <div className=" flex items-center gap-2">
              <input
                className="p-3 border boder-gray-300 rounded-lg"
                type="number"
                id="bedrooms"
                min={"1"}
                max="10"
                required
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>

            <div className=" flex items-center gap-2">
              <input
                className="p-3 border boder-gray-300 rounded-lg"
                type="number"
                id="bathrooms"
                min={"1"}
                max="10"
                required
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>BathRooms</p>
            </div>

            <div className=" flex items-center gap-2">
              <input
                className="p-3 border boder-gray-300 rounded-lg"
                type="number"
                id="regularPrice"
                min={"50"}
                max="100000"
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col item-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            {formData.offer &&(<div className=" flex items-center gap-2">
              <input
                className="p-3 border boder-gray-300 rounded-lg"
                type="number"
                id="discountedPrice"
                min={"0"}
                max="10000"
                required
                onChange={handleChange}
                value={formData.discountedPrice}
              />
              <div className="flex flex-col item-center">
                <p>Discounted Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
        )}
            
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The First image Will be the cover(max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              className="p-3 border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="images/*"
              multiple
            />

            <button
              type="button"
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
            Upload
            </button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
          <button disabled={loading } className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'updating...' : 'update Listing'}
          </button>
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
