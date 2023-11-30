import React, { useState } from "react";
import PageHeader from "../../PageHeader";

function ContactUs() {
    const [activeFaq, setActiveFaq] = useState<number>(0)
const faqData = [
    {
        header: "Quels sont les moyens de paiement  acceptés ?",
        responses: [
            "Paiement par carte bancaire (Visa, MasterCard, Paypal)",
            "Prélèvement à l’expédition"
        ],
        list: true
    },
    {
        header: "L'assistance à la clientèle est disponible ?",
        responses: [
            "Nous vous assitons tous les jours de la semaine 24h/24."
        ],
        list: false
    },
    {
        header: "Comment retourner ma commande ?",
        responses: [
            "Pour toute erreur constatée sur l’un de nos produits, vous pouvez nous le faire savoir depuis notre adresse email."
        ],
        list: false
    },
    {
        header: "Délai de remboursement ?",
        responses: [
            "Lorsqu’un article ne satisfait pas à votre commande soit pour défaut de fabrication ou erreur d’article, un autre article de la même catégorie vous est proposé."
        ],
        list: false
    },
    {
        header: "En combien de temps s’effectue la livraison ?",
        responses: [
            "La livraison de votre article s'éffectue dans un intervale de 0 à 72h."
        ],
        list: false
    }
]
  return <>
    <PageHeader/>
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
