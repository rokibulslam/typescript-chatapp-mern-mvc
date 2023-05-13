import React, { useEffect, useState } from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs = [
    {
      label: "Login",
      content: <Login />,
    },
    {
      label: "Registration",
      content: <Register />,
    },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    if (userInfo) navigate("/chats");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <div className="min-h-screen bg-teal-400 flex items-center justify-center">
      <div className="space-y-4 home w-full p-4">
        <div className="text-4xl bg-slate-200 py-3 rounded-md text-center">
          Let's Talk
        </div>
        <div className="bg-slate-200 py-3 rounded-md p-5 space-y-5">
          <div className="flex  space-x-5">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-2xl w-1/2 text-center py-2 font-extrabold ${
                  activeTab === index
                    ? "bg-teal-400 text-teal-900 ring-2 ring-green-700"
                    : "bg-teal-200"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </div>
            ))}
          </div>
          <div className="w-full">{tabs[activeTab].content}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
