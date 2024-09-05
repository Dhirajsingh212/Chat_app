"use client";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTheme } from "next-themes";
import { SendIcon } from "lucide-react";

const ChatFormElement = ({
  socket,
  text,
  setText,
  id,
}: {
  socket: WebSocket | null;
  text: string;
  setText: (event: any) => void;
  id: string;
}) => {
  const { theme } = useTheme();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        socket?.send(
          JSON.stringify({
            msg: text,
            toId: Number(id[0]),
          })
        );
        setText("");
      }}
      className="flex w-full items-center space-x-2 p-4"
    >
      <Input
        id="message"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
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
  );
};

export default ChatFormElement;
