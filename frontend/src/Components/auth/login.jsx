import React, { useState } from "react";
import { Container, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEye,
  faEyeSlash,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Login = () => {
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();


  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const submitHandler = async (e) => {
    setLoading(true);
    if(!phoneNumber || !password) {
      toast({
        title: "Please enter all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { phoneNumber, password },
        config
      );
      toast({
        title: "Logged In Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Container maxW="xl" centerContent>
        <div className="flex bg-[#f4f5f8] w-[90vw] h-[90vh] rounded-xl shadow-2xl">

        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center w-full max-w-md mt-20 transition duration-1000 ease-out">
            <h2 className="p-3 text-4xl font-bold text-gray-600 mb-4">InteractIQ</h2>
            <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid -mt-6"></div>
            <h3 className="text-2xl font-semibold text-blue-400 pt-2">
              Sign In!
            </h3>
            <form className="flex flex-col items-center justify-center">
              <div className="w-full bg-gray-200 h-12 my-4 rounded-full px-4 flex items-center">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-gray-500 text-xl mr-2"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="bg-transparent outline-none flex-1 text-gray-700"
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="w-full bg-gray-200 h-12 my-4 rounded-full px-4 flex items-center">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-gray-500 text-xl mr-2"
                />
                <div className="flex-1 w-full">
                  <input
                    type={showPasswordLogin ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="bg-transparent outline-none w-full text-gray-700"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <FontAwesomeIcon
                  icon={showPasswordLogin ? faEyeSlash : faEye}
                  className="text-gray-500 text-lg ml-2 cursor-pointer"
                  onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                />
              </div>
              <button
                className="w-40 h-10 bg-blue-400 border-none outline-none rounded-full text-white uppercase font-semibold my-4 cursor-pointer transition duration-500 hover:bg-blue-700"
                onClick={submitHandler}
                disabled={loading}
              >
                Sign In
              </button>
            </form>
            <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
            <p className="text-blue-400 mt-4 text-sm">Don't have an account?</p>
            <p
              className="text-blue-400 text-sm mb-8 font-medium cursor-pointer"
              onClick={handleSignUpClick}
            >
              Create a New Account
            </p>
          </div>
        </div>
        </div>
    </Container>
  );
};

export default Login;
