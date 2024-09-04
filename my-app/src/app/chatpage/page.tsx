"use client";
import Users from "@/components/Users";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms";
import { redirect } from "next/navigation";

function page() {
  const [allUsers, setAllUsers] = useState([]);
  const getUserValue = useRecoilValue(userState);

  if (!getUserValue) {
    redirect("/");
  }

  useEffect(() => {
    axios
      .get(`${BASE_URL}auth/getUsers`, { withCredentials: true })
      .then((res) => {
        setAllUsers(res.data.allUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-row w-full h-screen ">
      <div className="dark:bg-background">
        <Users allUsers={allUsers} />
      </div>
      <div className="w-full bg-gray-200  dark:bg-slate-800 ">
        <div className="flex items-center justify-center h-full">
          <p className="font-semibold text-3xl text-gray-600 dark:text-white flex flex-col gap-4  justify-center">
            Start a new conversation!
            <span className="text-lg text-center">
              Just by clicking on user profile button.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
