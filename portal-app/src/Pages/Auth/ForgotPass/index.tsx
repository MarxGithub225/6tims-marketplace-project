/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../../GlobalScreens/PageHeader";
import CustumButton from "../../../Components/CustumButton";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext, AuthStatus } from "../../../context/auth";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { notifyError, notifySuccess } from "../../../Components/CustomAlert";

function ForgotPassPage() {
  const { client } = useAuth()
  const search = useLocation().search;
  const [email, setEmail] = useState<string>("");
  const { signIn, authStatus } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (authStatus === AuthStatus.SignedIn) {
      if(search) {
        const urlRequest = new URLSearchParams(search).get('urlRequest');
        const tagData = new URLSearchParams(search).get('tag') ?? '';
        let tag='';
        if(tagData) {
          tag= `?tag=${tagData}`
        }
        navigate(`${urlRequest}${tag}`)
      }else {
        navigate('/profile')
      }
    }
  }, [authStatus])
  
  const mutation: any = useMutation({
    mutationFn: async () => {
      return await client?.resetPasswordCode({email})
  },
  onSuccess: async () => {
      notifySuccess({ message: `Un email vous a été envoyé !` })
      if(search) {
        const urlRequest = new URLSearchParams(search).get('urlRequest');
        const tagData = new URLSearchParams(search).get('tag') ?? '';
        let tag='';
        if(tagData) {
          tag= `&tag=${tagData}`
        }
        window.location.href = `/login?redirect=true&urlRequest=${urlRequest}${tag}`
      }else {
        window.location.href = '/login'
      }
  },
  onError: (e: any) => {
      let error: string = "An error occured, please retry";
      if(e?.errors?.msg?.includes('duplicate')) {
          error = "DUPLICATED_DATA"
      } else error = e?.errors?.msg
      notifyError({ message: error })
  }
  });
  return <>
  <PageHeader/>
   <section className="tf-login tf-section">
  <div className="themesflat-container">
    <div className="row">
      <div className="col-12">
        <h2 className="tf-title-heading ct style-1">
          Mot de passe oublié
        </h2>
        <div className="flat-form box-login-social mb-6">
            <h6 className="text-center">Veuillez renseigner votre adrese email, nous vous enverrons les instructions pour récupérer votre compte.</h6>
        </div>

        <div className="flat-form box-login-email">
         
          <div className="form-inner">
            <form action="#" id="contactform">
              <input id="email" name="name" tabIndex={1}  
              placeholder={"John@mail.com"}
              value={email}
              aria-required="true" required type="text" onChange={(e: any) => setEmail(e.target.value)}/>
              
              <CustumButton
                label="Récupérer mon compte"
                backgroundColor="#f7a700"
                color="#fff"
                disabled={email.trim() === ""}
                onclick={() => !mutation.isPending && mutation.mutate()}
                isLoading={mutation?.isPending}
                />

                <div className="">
                    <label >Je veux</label>, <a href="#" 
                    onClick={(e: any) => {
                      e.preventDefault()
                      if(search) {
                        const urlRequest = new URLSearchParams(search).get('urlRequest');
                        const tagData = new URLSearchParams(search).get('tag') ?? '';
                        let tag='';
                        if(tagData) {
                          tag= `&tag=${tagData}`
                        }
                        navigate(`/login?redirect=true&urlRequest=${urlRequest}${tag}`)
                      }else navigate('/login')
                    }}
                    className="forgot-pass">me connecter</a>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  </>;
}

export default ForgotPassPage;
