import LoginForm from "@/components/auth/login-form";
import React from "react";

export default function Login() {
  return (
    <div className="md:max-w-3xl max-w-[85%] mx-auto my-auto">
      <h1 className="font-semibold text-2xl my-4">Login into your account.</h1>
      <LoginForm />
    </div>
  );
}
