import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {
  const { selectedUser, message } = useContext(ChatContext)
  const { logout, onlineUser } = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])

  useEffect(() => {
    setMsgImages(
      (message || []).filter(msg => msg.image).map(ms => ms.image)
    )
  }, [message])

  if (!selectedUser) return null

  const isOnline = (onlineUser || []).includes(selectedUser._id)

  return (
    <div
      className={`bg-[#8185B2]/10 text-white w-full relative flex flex-col ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      {/* Profile Section */}
      <div className="pt-16 flex flex-col items-center gap-3 text-sm font-light px-4">
        {/* Profile Picture */}
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt="User"
          className="w-24 h-24 rounded-full border border-white/20 shadow-md object-cover"
        />

        {/* Name + Online Status */}
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          <h1 className="text-lg font-semibold">{selectedUser.fullName}</h1>
        </div>

        {/* Bio */}
        {selectedUser.bio && (
          <p className="px-6 text-center text-gray-300 text-sm">
            {selectedUser.bio}
          </p>
        )}
      </div>

      {/* Divider */}
      <hr className="border-[#ffffff40] my-4 mx-6" />

      {/* Media Section */}
      <div className="px-5 text-xs flex-1 overflow-y-auto">
        <p className="mb-2 font-medium text-gray-300">Media</p>
        <div className="max-h-[220px] overflow-y-auto grid grid-cols-2 gap-3 pr-2">
          {msgImages.length > 0 ? (
            msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url, '_blank')}
                className="cursor-pointer rounded-md overflow-hidden"
              >
                <img
                  src={url}
                  alt={`media-${index}`}
                  className="w-full h-24 object-cover rounded-md hover:opacity-90 transition"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-2 text-center">No media shared yet.</p>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={logout}
          className="w-full bg-gradient-to-r from-purple-400 to-violet-600 
          text-white border-none text-sm font-medium py-2 rounded-full cursor-pointer 
          hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default RightSidebar
