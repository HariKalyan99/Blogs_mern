import React, { useContext } from 'react'
import { blogStore } from '../store/store'
import { Link } from 'react-router-dom'

const AdminPanel = () => {

    const {authInformation, adminCallUser} = useContext(blogStore);
  return (
    <div className="container px-4 py-5" id="featured-3">
    <h2 className="pb-2 border-bottom">ADMIN PANEL</h2>
    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
     {authInformation.map((auth, ind) => <div key={ind+auth.role+auth.fullname} className="feature col">
        <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          <svg className="bi" width="1em" height="1em"><use xlinkHref="#collection"></use></svg>
        </div>
        <h3 className="fs-2 text-body-emphasis">{auth.fullname}</h3>
        <p>Role: {auth.role}</p>
        <p>Username: {auth.username}</p>
        <p>Email Id: {auth.email}</p>
        <p>Created Date: {new Date(auth.createdAt).toDateString()}</p>
        <p>Created Time: {new Date(auth.createdAt).toLocaleTimeString()}</p>
        <p>Last Updated @: {new Date(auth.updatedAt).toLocaleTimeString()} {new Date(auth.createdAt).toDateString()}</p>

        <Link to={"/user-dashboard"} className="icon-link" onClick={() => adminCallUser(auth.fullname)}>
          Go to user panel
          <svg className="bi"><use xlinkHref="#chevron-right"></use></svg>
        </Link>
      </div>)}
    </div>
  </div>
  )
}

export default AdminPanel