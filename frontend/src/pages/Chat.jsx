import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Chat() {
  const [chats, setChats] = useState([]);
  const fetchUsers = async () => {
    try {
      axios
        .get("/api/chat")
        .then((res) => {
          setChats(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <h1>Chats</h1>
      <ul>
        {chats.map((user) => (
          <li key={user._id}>{user.chatName}</li>
        ))}
      </ul>
    </div>
  );
}
