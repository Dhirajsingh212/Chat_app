"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { useParams } from "next/navigation";
import Spinner from "./Spinner";

const Chat = () => {
  const { theme } = useTheme();

  if (!theme) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }
  const { id } = useParams();

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
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <p
              className={`text-sm font-medium leading-none ${
                theme === "dark" ? "text-foreground" : "text-foreground"
              }`}
            >
              Sofia Davis
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

      <div className="grid gap-4 p-4 md:p-4 max-h-[520px] overflow-y-scroll no-scrollbar">
        <div
          className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto ${
            theme === "dark"
              ? "bg-primary text-primary-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          Hey, are you free this weekend? We should catch up! 🙏
        </div>
        <div
          className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ${
            theme === "dark"
              ? "bg-slate-950 text-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          Sure, I'm available on Saturday. Let's grab coffee! ☕
        </div>
        <div
          className={`flex w-max max-w-[65%] flex-col gap-2 rounded-xl overflow-hidden text-sm ml-auto ${
            theme === "dark"
              ? "bg-muted text-foreground"
              : "bg-background text-foreground"
          }`}
        >
          <img
            src="https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/14808952/tumblr_lmwsamrrxT1qagx30.0.0.1488208493.gif?quality=90&strip=all&crop=0%2C4.2124542124542%2C100%2C91.575091575092&w=750"
            alt="photo"
            width={200}
            height={150}
            className="object-cover"
            style={{ aspectRatio: "200/150", objectFit: "cover" }}
          />
        </div>
        <div
          className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto ${
            theme === "dark"
              ? "bg-primary text-primary-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          Sounds good! Let's meet at the Starbucks on 5th Ave.
        </div>
        <div
          className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto ${
            theme === "dark"
              ? "bg-primary text-primary-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          Sounds good! Let's meet at the Starbucks on 5th Ave.
        </div>{" "}
        <div
          className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto ${
            theme === "dark"
              ? "bg-primary text-primary-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          Sounds good! Let's meet at the Starbucks on 5th Ave.
        </div>{" "}
        <div
          className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto ${
            theme === "dark"
              ? "bg-primary text-primary-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          Sounds good! Let's meet at the Starbucks on 5th Ave.
        </div>{" "}
        <div
          className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto ${
            theme === "dark"
              ? "bg-primary text-primary-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          Sounds good! Let's meet at the Starbucks on 5th Ave.
        </div>
        <div
          className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ${
            theme === "dark"
              ? "bg-slate-950 text-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          I'll message you on Saturday.
        </div>
      </div>
      <div
        className={`border-t ${
          theme === "dark" ? "border-muted" : "border-muted"
        }`}
      >
        <form className="flex w-full items-center space-x-2 p-4">
          <Input
            id="message"
            placeholder="Type your message..."
            className={`flex-1 ${
              theme === "dark"
                ? "bg-dark text-foreground"
                : "bg-background text-foreground"
            }`}
            autoComplete="off"
          />
          <Button
            type="submit"
            size="icon"
            className={`${
              theme === "dark" ? "text-black" : "text-muted-foreground"
            }`}
          >
            <span className="sr-only">Send</span>
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
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
