import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = { title: "Log in — Harbor" };

export default function LoginPage() {
  return <AuthCard mode="login" />;
}
