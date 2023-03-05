import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const handleShow = () => setShow(!show);
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    };
  return (
    <div className="">
      <form action="" onSubmit={(e) => handleForm(e)} className="space-y-3">
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
        <button
          className="w-full bg-red-500 text-yellow-50 py-1 rounded-2xl"
          type="submit"
        >
          Login
        </button>
        <button
                  className="w-full bg-green-600 text-yellow-50 py-1 rounded-2xl"
                  onClick={() => { setEmail("guest@email.com"); setPassword("123456")}}
                
          type="submit"
        >
          Guest
        </button>
      </form>
    </div>
  );
}

export default Login