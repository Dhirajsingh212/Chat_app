import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@/lib/svgs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
}

export default function Users({ allUsers }: { allUsers: User[] }) {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[300px_1fr] max-w-6xl w-full mx-auto h-screen rounded-lg overflow-hidden border ${
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
          <Button
            onClick={() => {
              router.push("/signup");
            }}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
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
        <div className="flex flex-col gap-2 overflow-y-scroll h-[520px] no-scrollbar">
          {allUsers.map((element: User, index: number) => {
            return (
              <div key={index}>
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
