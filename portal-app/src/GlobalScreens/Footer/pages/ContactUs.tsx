import React, { useState } from "react";
import PageHeader from "../../PageHeader";

function ContactUs() {

  return <>
    <PageHeader
    header="Contactez-nous"
    />
    <section className="tf-section wrap-accordion">
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                Contactez-nous
                </h2>
                <h5 className="sub-title help-center mg-bt-32 ">
                Si vous avez une question ou besoin d'aide, n'hésitez pas à discuter avec nous. Nous sommes disponibles du lundi au vendredi de 8h à 20h / Samedi et Dimanche de 10h à 17h.
                </h5>
            </div>
            <div className="col-md-12">
                <div className="flat-accordion2">
                <div className="flat-toggle2">
                        <h6  className={`toggle-title toggle-title-hide-icon text-center `}>Vous pouvez également nous joindre sur au 00212 688 42 45 63 Du lundi au vendredi de 8h à 20h / Samedi et Dimanche de 10h à 17h et par email (suport@tims-group.com) du Lundi au Dimache 24h/24</h6>
                </div>
                                    
                </div>
            </div>
            </div>
        </div>
    </section>

  </>;
}

export default ContactUs;
