import { useEffect, useState } from "react";
import { getUserService } from "../services/auth";

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleCheckLogin = async () => {
    try {
      const res = await getUserService();
      setIsLogin(res.status === 200 ? true : false);
      setIsLoading(false);
    } catch (error) {
      localStorage.removeItem("loginToken");
      setIsLoading(false);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    const loginToken = JSON.parse(localStorage.getItem("loginToken"));
    if (loginToken) {
      handleCheckLogin();
    } else {
      setIsLoading(false);
      setIsLogin(false);
    }
  }, []);
  return [isLoading, isLogin];
};
