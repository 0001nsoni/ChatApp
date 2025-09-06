import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'

const HomePage = () => {
    const [selectedUser,setSelectedUser] = useState(false);
  return (
    <div className='border w-full h-screen sm:px-[2%] sm:py-[2%]'>
        <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full min-h-0 grid grid-cols-1
            relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
           <div className="h-full min-h-0 overflow-y-auto">
             <SideBar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
           </div>
           <div className="h-full min-h-0 flex flex-col">
             <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
           </div>
           <div className="h-full min-h-0 overflow-y-auto hidden md:block">
             <RightSidebar selectedUser={selectedUser}/>
           </div>
        </div>
    </div>
  )
}

export default HomePage