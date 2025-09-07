import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ChatContext } from "../../context/ChatContext.jsx";

const SideBar = () => {
  const {
    users,
    selectedUser,
    getUsers,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages, // ✅ added
  } = useContext(ChatContext);

  const navigate = useNavigate();
  const { logout, onlineUser } = useContext(AuthContext);
  const [input, setInput] = useState("");

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUser]);

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-3 md:p-5 rounded-r-xl text-white
      ${selectedUser ? "max-md:hidden" : ""} w-full md:w-auto`}
    >
      <div className="h-full flex flex-col">
        {/* Sticky logo and search */}
        <div className="sticky top-0 z-10 pb-5">
          <div className="flex justify-between items-center">
            <img src={assets.logo} alt="logo" className="max-w-32 md:max-w-40" />
            <div className="relative py-2 group">
              <img
                src={assets.menu_icon}
                alt="menu"
                className="max-h-5 cursor-pointer"
              />
              <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
                <p
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer text-sm"
                >
                  Edit Profile
                </p>
                <hr className="my-2 border-t border-gray-500" />
                <p
                  onClick={() => logout()}
                  className="cursor-pointer text-sm"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
            <img src={assets.search_icon} alt="Search" className="w-3" />
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
              placeholder="Search User..."
            />
          </div>
        </div>

        {/* Scrollable user list with blur */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-1 backdrop-blur-md bg-[#282142]/30">
          {filteredUsers.map((user) => (
            <div
              onClick={() => {
                setSelectedUser(user);
                setUnseenMessages((prev) => ({
                  ...prev,
                  [user._id]: 0, // ✅ reset unseen messages when user is selected
                }));
              }}
              key={user._id}
              className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
                selectedUser?._id === user._id ? "bg-[#282142]/50" : ""
              }`}
            >
              <img
                src={user?.profilePic || assets.avatar_icon}
                alt=""
                className="w-[35px] aspect-[1/1] rounded-full"
              />
              <div className="flex flex-col leading-5">
                <p>{user.fullName}</p>
                {(onlineUser || []).includes(user._id) ? (
                  <span className="text-green-400 text-xs">Online</span>
                ) : (
                  <span className="text-neutral-400 text-xs">Offline</span>
                )}
              </div>
              {unseenMessages?.[user._id] > 0 && (
                <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                  {unseenMessages[user._id]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
