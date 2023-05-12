import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import { BsFillBellFill } from "react-icons/bs";
const SideDrawer = () => {
  const [search, setSearch] = useState<string>("")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChats, setLoadingChats] = useState(false)

  return (
    <div>
      <div className="flex bg-cyan-300 justify-between items-center px-5 py-2">
        <button className="flex justify-between items-center bg-white rounded-lg font-bold text-lg px-4">
          <span>
            <CiSearch className="" />
          </span>
          <span>Search</span>
        </button>
        <p>My Chat</p>
        <div className='flex items-center'>
          <div className="cursor-pointer">
            <BsFillBellFill />
          </div>
          <div className="dropdown ">
            <label tabIndex={0} className="m-1 p-1 cursor-pointer bg-slate-700 text-white rounded-lg">
              Click
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-1 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p>item</p>
              </li>
              <li>
                <p>Item 2</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default SideDrawer