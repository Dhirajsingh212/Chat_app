"use client";

import { BASE_URL } from "@/app/config";
import { userState } from "@/atoms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import ChatFormElement from "./ChatFormElement";
import Spinner from "./Spinner";
import { ThemeToggleButton } from "./ThemeToggleButton";

interface User {
  id: number;
  username: string;
}

const Chat = ({
  messages,
  socket,
}: {
  messages: string[];
  socket: WebSocket | null;
}) => {
  const { theme } = useTheme();
  const { id } = useParams();
  const [text, setText] = useState<string>("");
  const [value, setValue] = useRecoilState(userState);
  const containerRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User>();

  if (!theme || !id[0]) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}auth/getSingleUser/${id[0]}`, { withCredentials: true })
      .then((res: any) => {
        setUser(res.data.user);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [id[0]]);

  return (
    <div className="h-screen ">
      <div
        className={`p-4 flex border-b items-center ${
          theme === "dark" ? "border-gray-700" : "border-muted"
        }`}
      >
        <div className="flex items-center gap-2">
          <Avatar
            className={`border w-10 h-10 ${
              theme === "dark" ? "border-gray-700" : "border-muted"
            }`}
          >
            <AvatarImage src="/placeholder-user.jpg" alt="Image" />
            <AvatarFallback>
              {(user?.username && user.username[0].toUpperCase() + "U") || "AU"}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <p
              className={`text-sm font-medium leading-none capitalize ${
                theme === "dark" ? "text-foreground" : "text-foreground"
              }`}
            >
              {user?.username}
            </p>
            <p
              className={`text-xs ${
                theme === "dark"
                  ? "text-muted-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Active 2h ago
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <ThemeToggleButton />
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex flex-col gap-4 p-4 md:p-4 h-[520px] overflow-y-scroll no-scrollbar "
      >
        {messages.map((element: string, index: number) => {
          const parsedData = JSON.parse(element || "");
          return (
            <>
              {Number(parsedData.fromId) === Number(value) ? (
                <div
                  key={index}
                  className={` flex max-w-[400px] flex-col gap-2 rounded-lg px-4 py-2 text-sm ml-auto ${
                    theme === "dark"
                      ? "bg-green-600 text-white"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-wrap break-words">{parsedData.msg} 🙏</p>
                </div>
              ) : (
                Number(parsedData.fromId) === Number(id[0]) && (
                  <div
                    className={`flex max-w-[400px] flex-col gap-2 rounded-lg px-4 py-2 text-sm mr-auto ${
                      theme === "dark"
                        ? "bg-slate-950 text-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-wrap break-words">{parsedData.msg} ☕</p>
                  </div>
                )
              )}
            </>
          );
        })}
      </div>
      <div
        className={`border-t ${
          theme === "dark" ? "border-muted" : "border-muted"
        }`}
      >
        <ChatFormElement
          id={id[0] || ""}
          text={text}
          setText={setText}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default Chat;
