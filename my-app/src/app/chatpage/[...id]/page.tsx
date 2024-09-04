"use client";
import Chat from "@/components/Chat";
import Spinner from "@/components/Spinner";
import Users from "@/components/Users";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [allUsers, setAllUsers] = useState([]);
  const [latestMsg, setLatestMsg] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      setSocket(newSocket);
    };
    newSocket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setLatestMsg((prev: string[]) => {
        return [...prev, message.data];
      });
    };
    axios
      .get(`${BASE_URL}auth/getUsers`, { withCredentials: true })
      .then((res) => {
        setAllUsers(res.data.allUser);
      });
    return () => newSocket.close();
  }, []);

  if (!socket) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="dark:bg-background">
        <Users allUsers={allUsers} />
      </div>
      <div className="w-full bg-gray-200 dark:bg-slate-800">
        <Chat messages={latestMsg} socket={socket} />
      </div>
      {/* <Button
        className="bg-blue-500 p-4 rounded-lg"
        onClick={() => {
          const message = {
            text: "hello from text to newUser",
            id: 2,
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
