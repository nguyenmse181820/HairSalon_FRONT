import React, { useContext, useEffect, useState } from "react";
import useDocumentTitle from "../components/Title.jsx";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../main.jsx";

const AccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [isLoginActive, setIsLoginActive] = useState(true);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useDocumentTitle("My Coiffure Account");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");

    if (storedUser && token) {
      setUser({ ...JSON.parse(storedUser), isLoggedIn: true });
    }
  }, [setUser]);

  const register = async () => {
    if (!fullName || !registerEmail || !registerPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://1e9571cd-9582-429d-abfe-167d79882ad7.mock.pstmn.io/auth/register",
        {
          fullName,
          email: registerEmail,
          password: registerPassword,
        }
      );

      if (response.status === 201) {
        const { user, token } = response.data;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);
        setUser({ ...user, isLoggedIn: true });
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Error creating account. Please try again!");
    }
  };

  const mockLogin = (email) => {
    const mockResponses = {
      "stylist@example.com": {
        message: "Authentication successful",
        token: "sample-jwt-token",
        user: { id: "1", role: "stylist" },
      },
      "customer@example.com": {
        message: "Authentication successful",
        token: "sample-jwt-token",
        user: { id: "2", role: "customer" },
      },
      "manager@example.com": {
        message: "Authentication successful",
        token: "sample-jwt-token",
        user: { id: "3", role: "manager" },
      },
      "admin@example.com": {
        message: "Authentication successful",
        token: "sample-jwt-token",
        user: { id: "4", role: "admin" },
      },
      "staff@example.com": {
        message: "Authentication successful",
        token: "sample-jwt-token",
        user: { id: "5", role: "staff" },
      },
    };
  
    return mockResponses[email] || { message: "Invalid credentials" };
  };
  

  const unionLogin = async () => {
    if (email && password) {
      try {
        const response = mockLogin(email);

      if (response.user) {
        const user = { ...response.user, isLoggedIn: true };
        const token = response.token;

        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);

        setUser(user);

          if (user.role === "stylist") {
            ["appointmentDate", "appointmentTime", "selectedService", "selectedStylist"].forEach((item) => sessionStorage.removeItem(item));
            navigate("/stylist/home");
          } else if (user.role === "customer") {
            navigate("/");
          } else if (user.role === "manager") {
            ["appointmentDate", "appointmentTime", "selectedService", "selectedStylist"].forEach((item) => sessionStorage.removeItem(item));
            navigate("/manager/dashboard");
          } else if (user.role === "admin") {
            ["appointmentDate", "appointmentTime", "selectedService", "selectedStylist"].forEach((item) => sessionStorage.removeItem(item));
            navigate("/admin/manage-service");
          } else if (user.role === "staff") {
            ["appointmentDate", "appointmentTime", "selectedService", "selectedStylist"].forEach((item) => sessionStorage.removeItem(item));
            navigate("/staff/bookings");
          } else {
            toast.error("Unauthorized role");
          }
        } else {
          toast.error("Invalid credentials. Please try again.");
        }
      } catch (error) {
        console.log("Login error:", error);
        toast.error("Invalid input, please try again!");
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                <div className="name relative my-6 pb-5">
                  <input
                    type="text"
                    id="first"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
                    Full Name*
                  </label>
                </div>

                <div className="email relative my-6 pb-5">
                  <input
                    type="text"
                    id="email-register"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
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
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
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
                  onClick={register}
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
              <p className="uppercase">book an Appointment</p>
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

export default AccountPage;
