import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
    const [show, setShow] = useState<boolean>(false);
    
  const handleShow = () => setShow(!show);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if ( !email || !password) {
      toast("Please fill all the filleds");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/login",
        {  email, password},
        config
      );
      toast("Login Successfull");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast("Error");
      setLoading(false);
    }
  };
  return (
    <div className="">
      <ToastContainer />
      <form action="" onSubmit={(e) => handleSubmit(e)} className="space-y-3">
        <div className="flex flex-col">
          <label htmlFor="">Enter Your Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg h-10 bg-teal-100"
            value={email}
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
              value={password}
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
        <button
          className="w-full bg-red-500 text-yellow-50 py-1 rounded-2xl"
          type="submit"
        >
          Login
        </button>
        <button
          className="w-full bg-green-600 text-yellow-50 py-1 rounded-2xl"
          onClick={() => {
            setEmail("guest@email.com");
            setPassword("123456");
          }}
          type="submit"
        >
          Guest
        </button>
      </form>
    </div>
  );
}

export default Login