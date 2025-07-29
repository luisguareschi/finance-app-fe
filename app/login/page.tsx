"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useLogin from "@/queries/auth/useLogin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/common/spinner";
import Link from "next/link";
import useSignUp from "@/queries/auth/useSignUp";

const LoginPage = () => {
  const router = useRouter();
  const isSignUp = useSearchParams().get("signup") === "true";
  const { mutate: login, isPending: loadingLogin } = useLogin({
    onSuccess: () => {
      router.replace("/home");
    },
  });
  const { mutate: signUp, isPending: loadingSignUp } = useSignUp({
    onSuccess: () => {
      router.replace("/login");
    },
  });
  const [loginForm, setLoginForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    if (isSignUp) {
      signUp({
        username: loginForm.username,
        email: loginForm.email,
        password: loginForm.password,
      });
      return;
    }
    login({
      email: loginForm.email,
      password: loginForm.password,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForgotPassword = () => {
    alert("Coming soon");
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-black">
      <Card className="sm:w-[450px] w-full border-none bg-transparent">
        <CardHeader className="mb-5">
          <CardTitle className="text-2xl text-center text-white">
            Finance Manager
          </CardTitle>
          <CardDescription className="text-center text-neutral-400">
            {isSignUp
              ? "Create an account to get started"
              : "Enter your email and password to login"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {isSignUp && (
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={handleChange}
                  value={loginForm.username}
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
                onChange={handleChange}
                value={loginForm.email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {!isSignUp && (
                  <a
                    href=""
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-neutral-400"
                    onClick={handleForgotPassword}
                  >
                    Forgot your password?
                  </a>
                )}
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="********"
                onChange={handleChange}
                value={loginForm.password}
              />
            </div>
            <Button
              className="w-full"
              size="default"
              type="submit"
              disabled={loadingLogin || loadingSignUp}
            >
              {isSignUp ? "Sign Up" : "Login"}
              {(loadingLogin || loadingSignUp) && <Spinner />}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4">
        <p className="text-neutral-400">
          {isSignUp ? "Already have an account?" : "Dont have an account?"}
          &nbsp;
          <Link
            href={`login/?signup=${!isSignUp}`}
            className="text-white underline font-semibold"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
