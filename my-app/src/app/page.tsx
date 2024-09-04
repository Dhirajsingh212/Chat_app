"use client";
import { userState } from "@/atoms";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setItem } from "@/localStorage";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { BASE_URL } from "./config";
import { useRouter } from "next/navigation";

interface SignIn {
  username: string;
  password: string;
}

export default function page() {
  const [formData, setFormData] = useState<SignIn>({
    username: "",
    password: "",
  });

  const setUserState = useSetRecoilState(userState);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (formData.username.length < 1 || formData.password.length < 1) {
        toast.warning("Fields cannot be empty.");
        return;
      }
      const res = await axios.post(
        `${BASE_URL}auth/login`,
        {
          username: formData.username,
          password: formData.password,
        },
        { withCredentials: true }
      );
      toast.success("Logged In.");
      setItem("id", res.data.id);
      setUserState((res.data as any).id);
      router.push("/chatpage");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen w-full">
      <main className="flex items-center justify-center px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
          <div className="bg-background dark:bg-slate-800 rounded-xl shadow-lg p-8 flex flex-col gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Sign In</h2>
              <p className="text-muted-foreground">
                Enter your username and password to access your account.
              </p>
            </div>
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  onChange={(e) => {
                    setFormData((prev: SignIn) => {
                      return { ...prev, username: e.target.value };
                    });
                  }}
                  value={formData.username}
                  type="text"
                  placeholder="John Doe"
                  className="dark:bg-slate-950"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData((prev: SignIn) => {
                      return { ...prev, password: e.target.value };
                    });
                  }}
                  type="password"
                  placeholder="********"
                  className="dark:bg-slate-950"
                />
              </div>
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? <Spinner /> : "Sign In"}
              </Button>
            </form>
            <div className="text-center text-sm">
              Don\'t have an account?
              <Link
                href="/signup"
                className="text-primary hover:underline"
                prefetch={false}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
