import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [picture, setPicture] = useState(null);
  const [show, setShow] = useState<boolean>(false);

  const handleShow = () => setShow(!show);
  const handlePicture = (e:File|undefined) => {console.log(e);};
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="">
      <form action="" onSubmit={(e) => handleForm(e)} className="space-y-3">
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
        <button
          className="w-full bg-red-500 text-yellow-50 py-1 rounded-2xl"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
