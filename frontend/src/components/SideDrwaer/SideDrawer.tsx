import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import { BsFillBellFill } from "react-icons/bs";
import { ChatState } from '../../context/useChat';
import Drawer from '../Drawer';

const SideDrawer = () => {
  const [search, setSearch] = useState<string>("")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChats, setLoadingChats] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { user } = ChatState()
  console.log(user);
  return (
    <div>
      {/* MODAL Daisy UI  */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col items-start w-fit">
          <h3 className="font-bold text-lg">{user.name}</h3>
          <img className="h-52 w-fit" src={user.picture} alt="" />
          <p className="py-4">{user.email}</p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Okay
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex bg-cyan-300 justify-between items-center px-5 py-2">
        <button onClick={() => setIsOpen(true)} className="flex justify-between items-center bg-white rounded-lg font-bold text-lg px-4">
          <span>
            <CiSearch className="" />
          </span>
          <span>Search</span>
        </button>
        <p>My Chat</p>
        <div className="flex items-center space-x-5">
          <div className="cursor-pointer">
            <BsFillBellFill />
          </div>
          <div className="dropdown dropdown-bottom dropdown-left flex items-center mr-5 cursor-pointer">
            <label tabIndex={0}>
              <div className="avatar cursor-pointer">
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.picture} />
                </div>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-1 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <label htmlFor="my-modal" className=" text-white bg-black h-3">
                  My Profile
                </label>
              </li>
              <li>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <p>Search Here</p>
      </Drawer>
      <div></div>
    </div>
  );
}

export default SideDrawer