"use client";
import { useAppSelector } from "../../redux/hooks";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface LoginPopupProps { }

const LoginPopup: React.FC<LoginPopupProps> = ({ }) => {
  const open = useAppSelector((state) => state.auth.isSessionExpired);
  const router = useNavigate();
  const {pathname} = useLocation();

  const login = () => {
    if (pathname === "/") {
      router(`/login`);
    } else {
      router(`/login?callbackUrl=${window.location.href}`);
    }
  };

  return (
    <Popup
      position="right center"
      closeOnDocumentClick={false}
      closeOnEscape={false}
      open={open}
    >
      <Button onClick={login}>Login</Button>
    </Popup>
  );
};

export default LoginPopup;
