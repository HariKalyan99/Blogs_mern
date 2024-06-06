import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { blogStore } from "../store/store";

const Login = () => {
    const {postLoginUser} = useContext(blogStore);
    const navigate = useNavigate();
    const usernameRef = useRef("");
    const passwordRef = useRef("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        postLoginUser({username, password})
        usernameRef.current.value = ""
        passwordRef.current.value = ""
    }

    const handleClick = () => {
        navigate("/signup")
    }
  return (
    <body className="login-container">
      <main className="form-signin m-auto">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="h3 mb-3 fw-normal">Log in</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
              ref={usernameRef}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating my-2">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              ref={passwordRef}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button className="btn btn-dark w-100 py-2" type="submit">
            Log in
          </button>
          <button className="btn btn-secondary w-100 py-2 my-3" type="button" onClick={handleClick}>
            Not Registered! Sign up
          </button>
          <div className="my-2">
        <Link to={"/"} style={{textDecoration: "none"}} className="text-black">
        Go back to dashboard
        </Link>
        </div>
          <p className="mt-5 mb-3 text-body-secondary">© 2017-2024</p>
        </form>
        
        </main>
        
    </body>

  );
};

export default Login;
