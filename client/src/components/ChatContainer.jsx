import React, { useContext, useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils.js";
import { ChatContext } from "../../context/ChatContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const scrollEnd = useRef();
  const { message, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUser } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({
      text: input.trim(),
      receiverId: selectedUser._id, // <-- Add this
    });
    setInput("");
  };
  //handle sending a image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select a valid image (jpeg, jpg, png)");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({
        image: reader.result,
        receiverId: selectedUser._id,
      });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && message) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return selectedUser ? (
    <div className="flex flex-col h-full relative">
      {/* Top bar - fixed */}
      <div className="sticky top-0 z-10 flex items-center gap-3 py-3 px-2 md:px-4 border-b border-stone-500 bg-black/30">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="flex-1 text-base md:text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {(onlineUser || []).includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden w-6 cursor-pointer"
        />
        <img
          src={assets.help_icon}
          alt=""
          className="hidden md:block w-5 cursor-pointer"
        />
      </div>

      {/* Chat area - scrollable */}
      <div className="flex-1 flex flex-col overflow-y-auto p-2 md:p-4 pb-24 gap-3">
        {(message || []).map((msg, index) => {
          const isSender = msg.senderId === authUser._id;
          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
            {/* Avatar */}
        {!isSender && (
       <img
        src={msg.senderProfilePic || selectedUser.profilePic || assets.avatar_icon}
        className="w-7 h-7 rounded-full object-cover"
        alt=""
         />
          )}

              {/* Message bubble */}
              {msg.image ? (
                <img
                  src={msg.image}
                  alt=""
                  className="max-w-[70vw] md:max-w-[230px] border border-gray-700 rounded-lg overflow-hidden"
                />
              ) : (
                <p
                  className={`p-2 max-w-[70vw] md:max-w-[220px] text-sm font-light rounded-lg break-words text-white ${
                    isSender
                      ? "bg-violet-500/40 rounded-br-none"
                      : "bg-gray-700/40 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </p>
              )}

              {/* Timestamp */}
              <div className="text-xs text-gray-400 flex flex-col items-center">
                <img
                  src={isSender ? assets.avatar_icon : selectedUser.profilePic}
                  className="w-6 h-6 rounded-full object-cover"
                  alt=""
                />
                <p>{formatMessageTime(msg.createdAt)}</p>
              </div>
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Bottom input */}
      <div className="sticky bottom-0 left-0 right-0 flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-black/40 backdrop-blur-md">
        <div className="flex-1 flex items-center bg-gray-800 px-2 md:px-3 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            value={input}
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-2 md:p-3 bg-transparent border-none outline-none text-white placeholder-gray-400"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="image" className="cursor-pointer">
            <img src={assets.gallery_icon} alt="" className="w-5 mr-2" />
          </label>
        </div>
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt=""
          className="w-7 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-3 text-gray-400 bg-white/10 h-full">
      <img src={assets.logo_icon} alt="" className="w-16" />
      <p className="text-lg font-medium text-white">
        Chat anytime, anywhere ✨
      </p>
    </div>
  );
};

export default ChatContainer;
