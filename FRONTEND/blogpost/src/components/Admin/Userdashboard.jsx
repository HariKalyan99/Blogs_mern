import React, { useContext } from 'react'
import { blogStore } from '../store/store'

const Userdashboard = () => {
    const {postList} = useContext(blogStore) 
  return (
    <div className="container px-4 py-5" id="hanging-icons">
    <h2 className="pb-2 border-bottom">Hanging icons</h2>
    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
      {postList.map((posts) => <div key={posts._id} className="col d-flex align-items-start">
        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <svg className="bi" width="1em" height="1em"><use xlinkHref="#toggles2"></use></svg>
        </div>
        <div>
          <h3 className="fs-2 text-body-emphasis">{posts.title}</h3>
          <p>{posts.body}</p>
          <a href="#" className="btn btn-primary">
            Primary button
          </a>
        </div>
      </div>)}
      
    </div>
  </div>
  )
}

export default Userdashboard