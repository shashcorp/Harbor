import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = { title: "Open an account — Harbor" };

export default function SignupPage() {
  return <AuthCard mode="signup" />;
}
