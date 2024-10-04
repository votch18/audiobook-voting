"use client";

import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useSelector, useDispatch } from "react-redux";
import { clearAuthUser } from "@/redux/user/actions";

export default function FeedLayout({ children }) {
  useCheckAuth();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(clearAuthUser());
  };
  return (
    <div className="min-h-full">
      <nav className="text-gray-900 shadow">
        <div className="md:flex md:justify-between p-5">
          <h2 className="text-2xl text-center md:text-left md:text-3xl font-bold mt-2">Audio Books</h2>
          <div className="flex justify-between md:justify-end ">
            <div className="flex justify-center content-center">
              <div className="bg-[#111827] h-10 w-10 rounded-full text-white flex justify-center content-center text-xl font-bold uppercase p-1.5 mt-1">
                <div>{user?.username?.charAt(0)}</div>
              </div>
              <h2 className="text-base font-semibold  leading-7 text-gray-900 px-3 py-2.5 mr-5 ">
                {user?.username}
              </h2>
            </div>
            
            <div>
              <button
                onClick={onLogout}
                className="block rounded-lg px-5 py-2.5 mr-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 lg:border-l"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
