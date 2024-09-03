"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import Users from "@/components/Users";
import Chat from "@/components/Chat";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      setSocket(newSocket);
    };
    newSocket.onmessage = (message) => {
      console.log("Message received:", message.data);
    };
    axios.get(`${BASE_URL}getUsers`).then((res) => {
      setAllUsers(res.data.allUser);
    });
    return () => newSocket.close();
  }, []);

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="dark:bg-background">
        <Users allUsers={allUsers} />
      </div>
      <div className="w-full bg-gray-200 dark:bg-slate-800">
        <Chat />
      </div>
      {/* <Button
        className="bg-blue-500 p-4 rounded-lg"
        onClick={() => {
          const message = {
            text: "hello from text to newUser",
            id: 3,
          };
          socket?.send(JSON.stringify(message));
        }}
      >
        Send
      </Button> */}
    </div>
  );
}

export default App;
