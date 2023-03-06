import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [picture, setPicture] = useState(null);
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading]=useState(false)
  const handleShow = () => setShow(!show);
  const navigate = useNavigate()
  const handlePicture = (picture: File | undefined) => {
    setLoading(true)
    if (picture === undefined) {
      toast("Insert Image");
    }
    if (picture?.type === 'image/jpeg' || picture?.type === 'image/png') {
      const data = new FormData();
      data.append("file", picture);
      data.append("upload_preset", "chat_app");
      data.append("cloud_name", "di2tro0se");
      fetch("https://api.cloudinary.com/v1_1/di2tro0se/image/upload", {
        method: "post",
        body:data
      })
        .then((res) => res.json())
        .then((data) => {
          setPicture(data.url.toString());
        
          toast("Success");
          setLoading(false);
        }).catch((err) => {
          console.log(err);
          setLoading(false);
          toast("Image upload failed!");
        }) 
      
    } 
  };
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    if (!name || !email || !confirmPass) {
      toast("Please fill all the filleds")
      setLoading(false);
      return
    } if (password !== confirmPass) {
      toast("Password does not match")
       setLoading(false);
      return
    }
    try {
      const config = {
        headers: {
          "Content-type":"application/json"
        }
      }
      const { data } = await axios.post("/api/register", { name, email, password, picture }, config)
      toast("Registration Successfull");
      localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)
      navigate("/chats") 
    } catch (error) {
      toast("Error")
      setLoading(false)
    }
  };
  return (
    <div className="">
      <ToastContainer />
      <form action="" onSubmit={(e) => handleSubmit(e)} className="space-y-3">
        <div className="flex flex-col">
          <label htmlFor="">Enter Your Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg h-10 bg-teal-100"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Enter Your Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg h-10 bg-teal-100"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Enter Your Password</label>
          <div className="flex flex-col relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg h-10 bg-teal-100 "
              type={show ? "text" : "password"}
              required
            />
            <span
              onClick={handleShow}
              className="absolute right-1 top-2 cursor-pointer"
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Confirm Your Password</label>
          <input
            onChange={(e) => setConfirmPass(e.target.value)}
            className="rounded-lg h-10 bg-teal-100"
            type={show ? "text" : "password"}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Give Your Profile Pic</label>
          <input
            onChange={(e) => handlePicture(e.target.files?.[0])}
            className="rounded-lg h-10 bg-teal-100 p-1"
            type="file"
            accept="image/*"
            required
          />
        </div>
        {loading ? (
          <button
            className="w-full bg-black-500 text-yellow-50 py-1 rounded-2xl"
            type="submit"
            disabled
          >
            Register
          </button>
        ) : (
          <button
            className="w-full bg-red-500 text-yellow-50 py-1 rounded-2xl"
            type="submit"
          >
            Register
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;
