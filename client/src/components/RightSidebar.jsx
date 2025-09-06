import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSidebar = ({ selectedUser }) => {
  return (
    selectedUser && (
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
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
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
            {imagesDummyData.map((url, index) => (
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
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <button
            className="w-full bg-gradient-to-r from-purple-400 to-violet-600 
            text-white border-none text-sm font-medium py-2 rounded-full cursor-pointer 
            hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </div>
    )
  )
}

export default RightSidebar
