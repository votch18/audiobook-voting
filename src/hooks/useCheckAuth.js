import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

export const useCheckAuth = () => {
  const { isLoggedIn } = useSelector(
    (state) => state?.user
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn) {
      if (!pathname.includes("auth")) {
        router.replace("/auth/signin");
      }
    } else {
        router.replace("/feed/home");
    }
  }, [pathname, isLoggedIn]);

  return;
};