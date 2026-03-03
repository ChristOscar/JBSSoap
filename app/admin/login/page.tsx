import LoginClient from "./LoginClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | JBS Soaps",
};

export default function LoginPage() {
  return <LoginClient />;
}
