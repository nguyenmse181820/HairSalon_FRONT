// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import useDocumentTitle from "../components/Title.jsx";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../main.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginActive, setIsLoginActive] = useState(true);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useDocumentTitle("My Coiffure Account");

  //   const storedUser = localStorage.getItem("user");
  //   const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser({ ...JSON.parse(storedUser), isLoggedIn: true });
    }
  }, [setUser, navigate]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const unionLogin = async () => {
    if (email && password) {
      try {
        const response = await axios.post(
          "https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/auth/login",
          { email, password }
        );

        if (response.status === 200) {
          const user = response.data.user;
          const token = response.data.token;

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);

          setUser({ ...user, isLoggedIn: true });

          if (user.role === "stylist") {
            toast.success("Welcome, Stylist!");
            navigate("/stylist/home");
          } else if (user.role === "customer") {
            navigate("/");
            console.log(user);
          } else {
            toast.error("Unauthorized role");
          }
        } else {
          toast.error("Invalid credentials. Please try again.");
        }
      } catch (error) {
        toast.error("Invalid credentials, please try again!");
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="container">
        <div className="title mt-8 flex justify-center">
          <h1 className="text-3xl font-thin italic">MY COIFFURE ACCOUNT</h1>
        </div>
        <div className="options-section pt-10 pb-10">
          <div className="flex justify-center space-x-16 font-montserrat text-xl">
            <button
              className={`hover:underline ${
                isLoginActive ? "font-bold underline" : ""
              }`}
              onClick={() => setIsLoginActive(true)}
            >
              ALREADY REGISTERED?
            </button>
            <button
              className={`hover:underline ${
                !isLoginActive ? "font-bold underline" : ""
              }`}
              onClick={() => setIsLoginActive(false)}
            >
              CREATE NEW ACCOUNT
            </button>
          </div>
        </div>
        <div className="form-container px-48 pt-10 pb-10">
          {isLoginActive ? (
            <div className="login-form bg-gray-50 py-20 flex justify-center">
              <div className="form-section w-96">
                <p className="font-serif pb-10 w-96">
                  If you are already registered with Coiffure, login here
                </p>
                <div className="email relative my-6 pb-5">
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmail}
                    className="block w-full py-2 px-0 text-sm text-black bg-transparent border-0 
                                        border-b border-black appearance-none 
                                        focus:outline-none focus:ring-0 focus:text-black peer"
                    placeholder=""
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm duration-300 transform -translate-y-6 scale-75
                                        top-3 left-0 z-9 origin-[0] text-gray-400
                                        peer-focus:left-0 peer-focus:text-blue-400
                                        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 "
                  >
                    Email address*
                  </label>
                </div>

                <div className="password relative my-6 pb-5">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePassword}
                    className="block w-full py-2 px-0 text-sm text-black bg-transparent border-0 
                                        border-b border-black appearance-none
                                        focus:outline-none focus:ring-0 focus:text-black peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute text-sm duration-300 transform -translate-y-6 scale-75 
                                        top-3 left-0 z-9 origin-[0] text-gray-400
                                        peer-focus:left-0 peer-focus:text-blue-400
                                        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 "
                  >
                    Password*
                  </label>
                </div>
                <button
                  className="text-white uppercase font-montserrat bg-black w-full py-3 hover:bg-transparent
                            hover:text-black transform duration-300 border border-black mt-3"
                  onClick={unionLogin}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : (
            <div className="register-form bg-gray-50 py-20 flex justify-center">
              <div className="form-section w-96">
                <p className="font-serif pb-10">
                  This space allows you to manage your personal information,
                  news updates.
                </p>
                <div className="first-name relative my-6 pb-5">
                  <input
                    type="text"
                    id="first"
                    className="block w-full py-2 px-0 text-sm text-black bg-transparent border-0 
                                        border-b border-black appearance-none 
                                        focus:outline-none focus:ring-0 focus:text-black peer"
                    placeholder=""
                    required
                  />
                  <label
                    htmlFor="first"
                    className="absolute text-sm duration-300 transform -translate-y-6 scale-75
                                        top-3 left-0 z-9 origin-[0] text-gray-400
                                        peer-focus:left-0 peer-focus:text-blue-400
                                        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 "
                  >
                    First Name*
                  </label>
                </div>
                <div className="last-name email relative my-6 pb-5">
                  <input
                    type="text"
                    id="last"
                    className="block w-full py-2 px-0 text-sm text-black bg-transparent border-0 
                                        border-b border-black appearance-none 
                                        focus:outline-none focus:ring-0 focus:text-black peer"
                    placeholder=""
                    required
                  />
                  <label
                    htmlFor="last"
                    className="absolute text-sm duration-300 transform -translate-y-6 scale-75
                                        top-3 left-0 z-9 origin-[0] text-gray-400
                                        peer-focus:left-0 peer-focus:text-blue-400
                                        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1"
                  >
                    Last Name*
                  </label>
                </div>
                <div className="email relative my-6 pb-5">
                  <input
                    type="text"
                    id="email-register"
                    className="block w-full py-2 px-0 text-sm text-black bg-transparent border-0 
                                        border-b border-black appearance-none 
                                        focus:outline-none focus:ring-0 focus:text-black peer"
                    placeholder=""
                    required
                  />
                  <label
                    htmlFor="email-register"
                    className="absolute text-sm duration-300 transform -translate-y-6 scale-75
                                        top-3 left-0 z-9 origin-[0] text-gray-400
                                        peer-focus:left-0 peer-focus:text-blue-400
                                        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 "
                  >
                    Email address*
                  </label>
                </div>

                <div className="password relative my-6 pb-5">
                  <input
                    type="password"
                    id="password-register"
                    className="block w-full py-2 px-0 text-sm text-black bg-transparent border-0 
                                        border-b border-black appearance-none
                                        focus:outline-none focus:ring-0 focus:text-black peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="password-register"
                    className="absolute text-sm duration-300 transform -translate-y-6 scale-75 
                                        top-3 left-0 z-9 origin-[0] text-gray-400
                                        peer-focus:left-0 peer-focus:text-blue-400
                                        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 "
                  >
                    Password*
                  </label>
                </div>
                <button
                  className="text-white uppercase font-montserrat bg-black w-full py-3 hover:bg-transparent
                            hover:text-black transform duration-300 border border-black mt-3"
                >
                  Create account
                </button>
              </div>
            </div>
          )}
        </div>
        <hr />
        <div className="content">
          <div className="title flex justify-center text-xl font-montserrat pt-10 pb-10 font-semibold">
            JOIN COIFFURE
          </div>
          <div className="details flex pb-16">
            <div className="left-container w-1/2 flex flex-col text-center items-center">
              <p className="uppercase font">streamline checkout</p>
              <p className="w-1/2 pt-4 font-thin">
                Check out faster with saved addresses and payment methods.
              </p>
            </div>
            <div className="right-container w-1/2 flex flex-col text-center items-center">
              <p className="uppercase">book an Appoinment</p>
              <p className="w-1/2 pt-4 font-thin">
                Enjoy priority access to the boutique of your choice at the time
                and date that suits you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
