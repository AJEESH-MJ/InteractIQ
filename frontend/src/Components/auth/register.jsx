import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const Register = () => {
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  // const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
  };

  // const postDetails = (avatar) => {
  //   setLoading(true);
  //   if (avatar === undefined) {
  //     toast({
  //       title: "Please select an image",
  //       status: "warning",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   } else if (avatar.type !== "image/png" && avatar.type !== "image/jpeg") {
  //     const data = new FormData();
  //     data.append("file", avatar);
  //     data.append("upload_preset", "ybro-chat");
  //     data.append("cloud_name", "YBRO");

  //     fetch("https://api.cloudinary.com/v1_1/ybro/image/upload", {
  //       method: "post",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // setAvatar({ url: data.url.toString(), file: avatar });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   } else {
  //     setLoading(false);
  //   }
  // };

  const submitHandler = async (e) => {
    setLoading(true);
    if (!name || !phoneNumber || !password) {
      toast({
        title: "Please fill all the fields",
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
        "/api/user/",
        { name, phoneNumber, password },
        config
      );
      toast({
        title: "Registered Successfully!",
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
    <div className="flex bg-[#f4f5f8] w-[90vw] h-[90vh] rounded-xl shadow-2xl">
    <div className="flex flex-col md:flex-row items-center justify-center w-full">
      <div className="flex flex-col mb-20 md:flex-row items-center justify-center w-full px-2 md:px-20">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-md items-center mt-20 transition duration-1000 ease-in">
          <h2 className="p-3 text-4xl font-bold text-gray-600">InteractIQ</h2>
          <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid -mt-2"></div>
          <h3 className="text-2xl font-semibold text-blue-400 pt-2">
            Sign Up!
          </h3>
          <form className="flex flex-col items-center justify-center mt-2">
            <div className="w-full bg-gray-200 h-12 my-4 rounded-full px-4 flex items-center">
              <FontAwesomeIcon
                icon={faUser}
                className="text-gray-500 text-xl mr-2"
              />
              <input
                type="text"
                name="userName"
                placeholder="Username"
                autoComplete="true"
                className="bg-transparent outline-none flex-1 text-gray-700"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              <div className="flex-1">
                <input
                  type={showPasswordRegister ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="bg-transparent outline-none w-full text-gray-700"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <FontAwesomeIcon
                icon={showPasswordRegister ? faEyeSlash : faEye}
                className="text-gray-500 text-lg ml-2 cursor-pointer"
                onClick={() => setShowPasswordRegister(!showPasswordRegister)}
              />
            </div>

            {/* <div className="w-full bg-gray-200 h-12 my-4 rounded-full px-4 flex items-center">
              <FontAwesomeIcon
                icon={faImage}
                className="text-gray-500 text-lg mr-2"
              />
              <label className="cursor-pointer">
                <input
                  type="file"
                  name="Avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
                <span className="bg-transparent text-gray-400 text-sm">
                  {avatar ? avatar.file.name : "Add an Avatar"}
                </span>
              </label>
            </div> */}
            <button
              className="w-40 h-10 bg-blue-400 border-none outline-none rounded-full text-white uppercase font-semibold my-4 cursor-pointer transition duration-500 hover:bg-blue-700"
              onClick={submitHandler}
              disabled={loading}
            >
              Sign Up
            </button>
          </form>
          <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
          <p className="text-blue-400 mt-4 text-sm">Already have an account?</p>
          <p
            className="text-blue-400 mb-8 text-sm font-medium cursor-pointer"
            onClick={handleSignInClick}
          >
            Sign In to your Account
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Register;
