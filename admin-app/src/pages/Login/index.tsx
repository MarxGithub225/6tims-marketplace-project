"use client";

import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, X } from "react-feather";
import {ReactComponent as EnvelopIcon} from "../../assets/icons/EnvelopIcon.svg"
import { LinksEnum } from "../../utilities/pagesLinksEnum";
import { useTranslation } from "react-i18next";
import CustomInput from "../../global-components/customInput";
import CustomButton from "../../global-components/CustomButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { config } from "../../utilities/helper";
import { AuthContext, AuthStatus } from "../../context/auth";
export default function Login() {
  const [showPass, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { t } = useTranslation();
  const { signIn, authStatus } = useContext(AuthContext)
  const navigate = useNavigate()
  const { state } = useLocation();
  const loginRouteState: any = state

  useEffect(() => {
    if (authStatus === AuthStatus.SignedIn) {
      if (loginRouteState?.pathname) {
        navigate(loginRouteState.pathname)
      } else {
        navigate('/')
      }
    }
  }, [authStatus])
  
  const mutation: any = useMutation({
    mutationFn: async () => {
      return await signIn(email, password);
    }
  });

  const checkArray = (data: any) => {
    return Array.isArray(data)
  }

  return (
    <div
      className="relative flex items-center py-4 justify-center min-h-screen w-screen overflow-hidden no-scrollbar bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${config.authBack})`,
      }}
    >
      <div className="max-width w-full h-full flex items-center justify-center">
        <div className="auth-screen bg-white">
        <div className="flex flex-col w-full items-center justify-center mt-6 gap-4 welcome-sms">
            <img src={config.tims_logo_oficiel} className="w-40 h-auto" alt="" />
          </div>
          <div className="auth-title flex justify-center items-center relative">
            Se connecter
          </div>

          <div className="auth-content">
            <CustomInput
              label={"Votre e-mail"}
              placeholder={"John@mail.com"}
              value={email}
              icon={<EnvelopIcon className="h-5 w-auto" />}
              onChange={(e: any) => setEmail(e)}
            />

            <CustomInput
              label={"Votre mot de passe"}
              type={`${showPass ? "text" : "password"}`}
              placeholder={"*********"}
              value={password}
              icon={
                !showPass ? (
                  <Eye
                    className="h-5 w-auto cursor-pointer"
                    onClick={() => setShow(!showPass)}
                  />
                ) : (
                  <EyeOff
                    className="h-5 w-auto cursor-pointer"
                    onClick={() => setShow(!showPass)}
                  />
                )
              }
              onChange={(e: any) => setPassword(e)}
            />

            <div className="mb-6 login-reminber flex items-center justify-between">
              <label className="container">
                Resté connecté
                <input type="radio" name="radio" />
                <span className="checkmark" />
              </label>

              <Link to={LinksEnum.forgotten_password}>Recover password</Link>
            </div>
            {(mutation.isError && mutation?.error?.errors?.msg) && (
              <div
                className="my-2 text-center"
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {checkArray(mutation?.error?.errors?.msg) ?
                  mutation?.error?.errors?.msg?.map((sms: any, key: number) => {
                    return <p className="mb-2" key={key} >
                      {t(sms?.msg ?? "")}
                    </p>
                  })
                  :t(mutation?.error?.errors?.msg ?? "")
                }
              </div>
            )}
            <CustomButton
              classname="custom-button w-full"
              label={"Sign In"}
              background={'#F4A607'}
              color={"#FFFFFF"}
              onClick={() => !mutation.isLoading && mutation.mutate()}
              isLoading={mutation?.isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

