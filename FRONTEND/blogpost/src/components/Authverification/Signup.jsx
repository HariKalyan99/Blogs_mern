// import React from 'react'

import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { blogStore } from "../store/store";

const Signup = () => {
  const { postSignUpUser } = useContext(blogStore);
  let navigate = useNavigate();
  const fullnameRef = useRef("");
  const emailRef = useRef("");
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const handleClick = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullname = fullnameRef.current.value;
    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    postSignUpUser({ fullname, email, username, password });
    fullnameRef.current.value = "";
    emailRef.current.value = "";
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };
  return (
    <body>
      <div className="container">
        <main>
          <div className="py-5 text-center">
            <h2>Title Signup</h2>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A iure
              enim nam.
            </p>
          </div>

          <div className="row d-flex justify-content-center">
            <div className="col-md-8 col-lg-8">
              <h4 className="mb-3">Are you new here!</h4>
              <form
                className="needs-validation"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="firstName" className="form-label">
                      Fullname{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      
                      required=""
                      ref={fullnameRef}
                    />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email{" "}
                      <span className="text-body-secondary">(Required)</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="you@example.com"
                      ref={emailRef}
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address for updates.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="username" className="form-label">
                      username{" "}
                      <span className="text-body-secondary">(Required)</span>
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">user</span>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        required=""
                        ref={usernameRef}
                      />
                      <div className="invalid-feedback">
                        Your username is required.
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      passowrd{" "}
                      <span className="text-body-secondary">(Required)</span>
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">password</span>
                      <input
                        type="text"
                        className="form-control"
                        id="password"
                        placeholder="Passowrd"
                        required=""
                        ref={passwordRef}
                      />
                      <div className="invalid-feedback">
                        Your password is required.
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                <button className="w-100 btn btn-dark btn-lg" type="submit">
                  Sign in
                </button>
                <hr className="my-4" />
              </form>
            </div>
          </div>
        </main>
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <button
            className="w-25 btn btn-secondary btn-lg "
            type="button"
            onClick={handleClick}
          >
            registered? Continue to Login
          </button>
          <div className="my-2">
            <Link
              to={"/"}
              style={{ textDecoration: "none" }}
              className="text-black"
            >
              Go back to dashboard
            </Link>
          </div>
        </div>
        <footer className="my-5 pt-5 text-body-secondary text-center text-small">
          <p className="mb-1">© 2017-2024 Company Name</p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">Privacy</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Support</a>
            </li>
          </ul>
        </footer>
      </div>
      <script
        src="/docs/5.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossOrigin="anonymous"
      ></script>

      <script src="checkout.js"></script>
    </body>
  );
};

export default Signup;
