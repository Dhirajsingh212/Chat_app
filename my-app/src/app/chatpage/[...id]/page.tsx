"use client";
import { userState } from "@/atoms";
import Chat from "@/components/Chat";
import Spinner from "@/components/Spinner";
import Users from "@/components/Users";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { toast } from "sonner";
import { BASE_URL } from "../../config";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [allUsers, setAllUsers] = useState([]);
  const [latestMsg, setLatestMsg] = useState<string[]>([]);
  const { id } = useParams();

  const getUserValue = useRecoilValueLoadable(userState);

  if (
    getUserValue.state === "hasValue" &&
    getUserValue.contents === (undefined || null)
  ) {
    redirect("/");
  }

  useEffect(() => {
    const toastId = toast.loading("Loading data");
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      toast.success("Connection established.");
      setSocket(newSocket);
    };

    newSocket.onmessage = (message) => {
      setLatestMsg((prev) => [...prev, message.data]);
    };

    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(`${BASE_URL}auth/getUsers`, {
          withCredentials: true,
        });
        setAllUsers(usersResponse.data.allUser);

        const messagesResponse = await axios.post(
          `${BASE_URL}messages/getAllMessages`,
          { fromId: id[0] },
          { withCredentials: true }
        );
        const newArr = messagesResponse.data.userMessages.map((element: any) =>
          JSON.stringify(element)
        );
        setLatestMsg(newArr);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data.");
      } finally {
        toast.dismiss(toastId);
      }
    };

    fetchData();

    return () => {
      if (socket) {
        socket.close();
      }
    };
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
    </div>
  );
}

export default App;
