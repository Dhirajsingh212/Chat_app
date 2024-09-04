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

  if (!theme || !id[0]) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const [user, setUser] = useState<User>();

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

  console.log("rendered");

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
        {messages.map((element: string, index) => {
          const parsedData = JSON.parse(element || "");
          return (
            <>
              {Number(parsedData.fromId) === Number(value) ? (
                <div
                  key={index}
                  className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto ${
                    theme === "dark"
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {parsedData.msg} 🙏
                </div>
              ) : (
                Number(parsedData.fromId) === Number(id[0]) && (
                  <div
                    className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ${
                      theme === "dark"
                        ? "bg-slate-950 text-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {parsedData.msg} ☕
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

function PhoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function VideoIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}
