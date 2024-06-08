import React, { useContext, useState } from 'react'
import { blogStore } from '../store/store';

const EditBlog = ({blog, editBay, setEditBay}) => {

    const {updatePost} = useContext(blogStore)
    const [author, setauthor] = useState(blog.author);
    const [title, settitle] = useState(blog.title);
    const [body, setbody] = useState(blog.body);
    const [tags, settags] = useState(blog.tags.join("#"));


    const handleSubmit = (e) => {
        e.preventDefault();
        updatePost({author, title, body, tags: tags.split("#"), id: blog._id});
        setEditBay(!editBay)
    }
  return (
    <form className="needs-validation" onSubmit={(e) => handleSubmit(e)}>
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="author" className="form-label">
                      Author
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        className="form-control"
                        id="author"
                        placeholder="author"
                        required
                        value={author}
                        onChange={(e) => setauthor(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Your author is required.
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Title"
                        required
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Your title is required.
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="body" className="form-label">
                      Body
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="body of your blog"
                      required
                      rows={10}
                      value={body}
                      onChange={(e) => setbody(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter the body of your blog.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="tags" className="form-label">
                      Tags#{" "}
                      <span className="text-body-secondary">
                        (ex:- nature#love#classic)
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tags"
                      placeholder="please type # after each and every tag"
                      value={tags}
                      onChange={(e) => settags(e.target.value)}
                    />
                  </div>
                </div>

                <hr className="my-4" />

                <div className="d-flex flex-column justify-content-center gap-3">
                  <button className="w-50 btn btn-dark btn-lg" type="submit">
                    Edit Post
                  </button>
                  <button className="w-50 btn btn-dark btn-lg" type="button" onClick={() => setEditBay(!editBay)}>
                    Don't edit
                  </button>
                </div>
              </form>
  )
}

export default EditBlog