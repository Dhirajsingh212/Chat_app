"use client";
import { getItem } from "@/localStorage";
import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: getItem("id") || "",
});
