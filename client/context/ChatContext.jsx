import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

// ✅ ChatContext
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [message, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const { socket, axios, onlineUser } = useContext(AuthContext);

  // Get all users for sidebar
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get messages for selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Send message
  const sendMessage = async (messageData) => {
    try {
      const res = await axios.post(
        `/api/messages/send/${messageData.receiverId}`,
        messageData
      );
      if (res.data.success && res.data.newMessage) {
        setMessages((prev) => [...prev, res.data.newMessage]);
        getUsers(); // refresh sidebar counts
        getMessages(messageData.receiverId); // <-- Add this line
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Subscribe to real-time messages
  const subscribeToMessages = () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        axios.put(`/api/message/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: prev[newMessage.senderId]
            ? prev[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  // Unsubscribe
  const unsubscribeFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  // Effects
  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
      getUsers();
    }
  }, [selectedUser]);

  useEffect(() => {
    getUsers();
  }, [onlineUser]);

  // Context value
  const value = {
    message,
    users,
    selectedUser,
    getUsers,
    setMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
    getMessages,
  };

  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  );
};
