/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../../GlobalScreens/PageHeader";
import CustumButton from "../../../Components/CustumButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext, AuthStatus } from "../../../context/auth";
import { useMutation } from "@tanstack/react-query";

function LoginPage() {
  const search = useLocation().search;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
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
      return await signIn(email, password);
    }
  });
  return <>
  <PageHeader
  header="Connexion"
  />
   <section className="tf-login tf-section">
  <div className="themesflat-container">
    <div className="row">
      <div className="col-12">
        <h2 className="tf-title-heading ct style-1">
          Se connecter à 6tims
        </h2>
        <div className="flat-form box-login-social">
          <div className="box-title-login">
            <h5>Réseau social</h5>
          </div>
          <ul>
            <li>
              <a href="#" className="sc-button style-2 fl-button pri-3">
                <i className="icon-fl-google-2" />
                <span>Google</span>
              </a>
            </li>
            <li>
              <a href="#" className="sc-button style-2 fl-button pri-3">
                <i className="icon-fl-facebook" />
                <span>Facebook</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="flat-form box-login-email">
          <div className="box-title-login">
            <h5>Ou</h5>
          </div>
          <div className="form-inner">
            <form action="#" id="contactform">
              <input id="email" name="name" tabIndex={1}  
              placeholder={"John@mail.com"}
              value={email}
              aria-required="true" required type="text" onChange={(e: any) => setEmail(e.target.value)}/>
              <input id="pass" name="pass" tabIndex={2}  
              aria-required="true" value={password} type="password" placeholder={"*********"} required onChange={(e: any) => setPassword(e.target.value)}/>
              <div className="row-form style-1">
                <label>Resté connecté
                  <input type="checkbox" checked={active}
                  onChange={() => setActive(!active)}
                  />
                  <span className="btn-checkbox" />
                </label>
                <Link to="/forgot-pass" className="forgot-pass">Mot de passe oublié ?</Link>
              </div>
              <CustumButton
                label="Se connecter"
                backgroundColor="#f7a700"
                color="#fff"
                disabled={!active || email.trim() === "" || password.trim() === ""}
                onclick={() => !mutation.isPending && mutation.mutate()}
                isLoading={mutation?.isPending}
                />

                <div className="">
                    <label >Je suis nouveau</label>, <a href="#" 
                    onClick={(e: any) => {
                      e.preventDefault()
                      if(search) {
                        const urlRequest = new URLSearchParams(search).get('urlRequest');
                        const tagData = new URLSearchParams(search).get('tag') ?? '';
                        let tag='';
                        if(tagData) {
                          tag= `&tag=${tagData}`
                        }
            
                        navigate(`/registration?redirect=true&urlRequest=${urlRequest}${tag}`)
                      }else navigate('/registration')
                    }}
                    className="forgot-pass">Créer mon compte</a>
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

export default LoginPage;
