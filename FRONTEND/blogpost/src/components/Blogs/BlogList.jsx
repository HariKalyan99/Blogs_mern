import { useContext } from "react";
import Blog from "./Blog";
import { blogStore } from "../store/store";

const BlogList = () => {

  const {postList} = useContext(blogStore)
  return (
    <div>
      <header className="p-3">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center flex-column">
            
            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              role="search"
            >
              <input
                type="search"
                className="form-control form-control-dark text-bg-light p-2"
                placeholder="Search for blogs..."
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </header>
      <div className="album py-5 bg-body-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {postList.map((blog) => <Blog key={blog._id} blog={blog}/>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
