"use client";

import React, { useState } from "react";
import AuthLayout from "@/app/auth/AuthLayout";
import { updateAuthUser } from "@/redux/user/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import APIs from "@/APIs";
const SignIn = () => {
  const [signingIn, setSigningIn] = useState(false);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  
  const onSignIn = () => {
    if (!username) {
      toast.error("Username is required!");
      return;
    }
    setSigningIn(true);
    APIs.userLogin({ username })
    .then((resp) => {
      const { success } = resp.data;
      setSigningIn(false);

      if (!success) {
        toast.error("Unknown error detected");
        return;
      }
      const user = resp.data?.user;
      dispatch(updateAuthUser({isLoggedIn: true, userId: user.id, username: user.username}));
      router.replace("/feed/home");
    })
  }

  return (
    <AuthLayout title="Welcome back! Please login to your account">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 py-5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Please enter your username to vote for your favorite audio books.
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter username
              </label>
              <div className="mt-2">
                <input
                  name="username"
                  type="text"
                  required
                  disabbled={signingIn}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={onSignIn}
                disabbled={signingIn}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>

        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
