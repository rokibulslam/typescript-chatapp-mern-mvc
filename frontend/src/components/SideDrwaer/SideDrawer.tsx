import React from 'react'
import { Link } from 'react-router-dom'

const SideDrawer = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <li>
            <Link to="">Sidebar Item 1</Link>
          </li>
          <li>
            <Link to="">Sidebar Item 1</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideDrawer