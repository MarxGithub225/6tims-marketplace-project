"use client";

import { Suspense, useContext, useEffect, useState } from "react";
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
import RegisterPage from "../Register";

export default function Login() {
  const [showPass, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { t } = useTranslation();
  const { signIn, authStatus } = useContext(AuthContext)
  const navigate = useNavigate()
  const { state } = useLocation();
  const loginRouteState: any = state
  const [modalOpened, setModalOpen] = useState<boolean>(false)
  useEffect(() => {
    if (authStatus === AuthStatus.SignedIn) {
      if (loginRouteState?.pathname) {
        navigate(loginRouteState.pathname)
      } else {
        navigate('/')
      }
    }
  }, [authStatus])
  const toggleModal = () => {
    setModalOpen(!modalOpened)
  }
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
      <div className="max-width w-full h-full flex flex-col bigTablet:flex-row items-center gap-10">
        <div className="auth-screen bg-white">
          <div className="flex w-full items-center justify-center mt-6 gap-4 welcome-sms">
            <span>Content de vous revoir sur</span>
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
              <Link to={LinksEnum.forgotten_password}>Mot de passe oublié ?</Link>
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
              background={'#E73A5D'}
              color={"#FFFFFF"}
              onClick={() => !mutation.isLoading && mutation.mutate()}
              isLoading={mutation?.isLoading}
            />

            <div className="mt-4 login-reminber flex items-center justify-between">
              <span>Vous venez d'arriver ? Super !</span>

              <Link 
              onClick={(e) => {
                e.preventDefault()
                toggleModal()
              }}
              to={LinksEnum.home}>Créer votre compte ici.</Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md w-72 flex items-center justify-center p-6">
          <img src={config.authIllustr} className="w-60 h-auto" alt=""/>
        </div>
      </div>

      <Suspense fallback={<div>...</div>}>
          {modalOpened &&
              <RegisterPage
                  modalOpened={modalOpened}
                  toggleModal={toggleModal}
              />}
      </Suspense>
    </div>
  );
}
