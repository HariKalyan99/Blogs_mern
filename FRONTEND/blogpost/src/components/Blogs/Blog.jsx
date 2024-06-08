import { useContext, useState } from "react"
import { blogStore } from "../store/store"
import EditBlog from "./EditBlog";

const Blog = ({blog}) => {

  const {deletePost} = useContext(blogStore)
  const [editBay, setEditBay] = useState(false);
  return (
    <div className="col">
            {editBay ? <div>
              <EditBlog editBay={editBay} setEditBay={setEditBay} blog={blog}/>
            </div> :
              <div className="card shadow-sm">
                <img
                  src="https://res.cloudinary.com/bornfight-studio/image/upload/v1678794602/bornfight-web-2022/wp_2020_07_bornfight_blog_grubisa_ai_data_facebook_f46af9f183.jpg"
                  alt="blog-image"
                />
                <div className="card-body">
                  <p className=" text-center fw-lighter">{blog.author}</p>
                  
                  <h4>{blog.title}</h4>
                  <p className="card-text">
                    {blog.body}
                  </p>
                  
                  <div className="d-flex justify-content-start align-items-center flex-wrap">
                      {blog.tags.map((tag, ind) => <p
                        key={ind}
                      >
                        #{tag}
                      </p>)}
                     
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setEditBay(true)}
                      >
                        edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => deletePost(blog._id)}
                      >
                        delete
                      </button>
                    </div>
                    <small className="text-body-secondary">{new Date(blog.createdAt).toDateString()}</small>
                  </div>
                </div>
              </div>}
            </div>
  )
}

export default Blog