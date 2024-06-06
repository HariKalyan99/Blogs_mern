import { Link } from "react-router-dom"

const Blogpost = () => {
    return (
        <body>

    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h2>Add posts</h2>
          <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. A iure enim nam.</p>
        </div>
    
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-lg-8">
            <h4 className="mb-3">What came into your mind today?</h4>
            <form className="needs-validation" noValidate="">
              <div className="row g-3">
              <div className="col-12">
                  <label htmlFor="author" className="form-label">Author</label>
                  <div className="input-group has-validation">
                    <input type="text" className="form-control" id="author" placeholder="author" required />
                  <div className="invalid-feedback">
                      Your author is required.
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="title" className="form-label">Title</label>
                  <div className="input-group has-validation">
                    <input type="text" className="form-control" id="title" placeholder="Title" required />
                  <div className="invalid-feedback">
                      Your title is required.
                    </div>
                  </div>
                </div>
    
                <div className="col-12">
                  <label htmlFor="body" className="form-label">Body</label>
                  <textarea type="text" className="form-control" id="address" placeholder="body of your blog" required rows={10}/>
                  <div className="invalid-feedback">
                    Please enter the body of your blog.
                  </div>
                </div>
    
                <div className="col-12">
                  <label htmlFor="tags" className="form-label">Tags# <span className="text-body-secondary">(ex:- #nature#love#classic)</span></label>
                  <input type="text" className="form-control" id="tags" placeholder="please type # before each and every tag" />
                </div>
                
              </div>
    
             
    
              
    
              <hr className="my-4" />
    
              <div className="d-flex flex-column justify-content-center gap-3">
              <button className="w-25 btn btn-dark btn-lg" type="submit">Post</button>
              <Link to={"/"} style={{textDecoration: "none"}} className="text-black">
        Go back to dashboard
        </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    
      <footer className="my-5 pt-5 text-body-secondary text-center text-small">
        <p className="mb-1">© 2017-2024 Company Name</p>
        <ul className="list-inline">
          <li className="list-inline-item"><a href="#">Privacy</a></li>
          <li className="list-inline-item"><a href="#">Terms</a></li>
          <li className="list-inline-item"><a href="#">Support</a></li>
        </ul>
      </footer>
    </div>
    <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
    
        <script src="checkout.js"></script>
    
    </body>
      )
}

export default Blogpost