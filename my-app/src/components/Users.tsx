"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import Link from "next/link";

interface User {
  id: number;
  username: string;
}

export default function Users({ allUsers }: { allUsers: User[] }) {
  const { theme } = useTheme();
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[300px_1fr] max-w-6xl w-full mx-auto h-auto md:h-[650px] rounded-lg overflow-hidden border ${
        theme === "dark"
          ? "bg-background text-foreground"
          : "bg-background text-foreground"
      }`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-muted/20" : "bg-muted/20"
        } p-4 md:p-4`}
      >
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Chats</div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusIcon
              className={`h-4 w-4 ${
                theme === "dark" ? "text-foreground" : "text-muted-foreground"
              }`}
            />
            <span className="sr-only">New chat</span>
          </Button>
        </div>
        <div className="py-4">
          <Input
            placeholder="Search"
            className={`h-8 ${
              theme === "dark"
                ? "bg-muted text-foreground"
                : "bg-background text-foreground"
            }`}
          />
        </div>
        <div className="grid gap-2 md:grid-cols-1">
          {allUsers.map((element: User, index: number) => {
            return (
              <Link
                href={`/chatpage/${element.id}`}
                className={`flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 ${
                  theme === "dark" ? "bg-muted" : "bg-muted"
                }`}
                prefetch={false}
              >
                <Avatar
                  className={`border w-10 h-10 ${
                    theme === "dark" ? "border-muted" : "border-muted"
                  }`}
                >
                  <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                  <AvatarFallback>
                    {element.username[0].toUpperCase() + "U" || "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <p
                    className={`text-sm font-medium capitalize leading-none ${
                      theme === "dark" ? "text-foreground" : "text-foreground"
                    }`}
                  >
                    {element.username}
                  </p>
                  <p
                    className={`text-xs ${
                      theme === "dark"
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                    } line-clamp-1`}
                  >
                    Hey, See your chats?
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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
