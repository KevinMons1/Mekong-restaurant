import React from 'react'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/NavBar/NavBar'
import { Helmet } from "react-helmet"

export default function Cgu() {
    return (
        <>
            <Helmet>
                <meta name="description" content="Fine cuisine thaïlandaise à Namur, vous pouvez consulter nos conditions générales d'utilisation." />
            </Helmet>

            <header>
                <NavBar/>
            </header>
            
            <main className="legal">
                <h1>Conditions générales d'utilisation du site Mekong Namur</h1>
                
                <h3>ARTICLE 1 : Objet</h3>

                <p>Les présentes « conditions générales d'utilisation » ont pour objet l'encadrement juridique de l’utilisation
                du site <a href="https://mekong-namur.be">https://mekong-namur.be</a> et de ses services. Ce contrat est conclu entre : 
                Le gérant du site internet, ci-après désigné « l’Éditeur », Toute personne physique ou morale souhaitant accéder au 
                site et à ses services, ci-après appelé « l’Utilisateur ». Les conditions générales d'utilisation doivent être acceptées 
                par tout Utilisateur, et son accès au site vaut acceptation de ces conditions.</p>

                <h3>ARTICLE 2 : Mentions légales</h3>

                <p>Pour les personnes morales : Le site Mekong Namur est édité par la société RITH COMPANY, 
                SCS, dont le siège social est situé au rue de Gravière 6, 5000 Namur. La société est représentée par Vannara Rith. Pour les personnes physiques : 
                Le site Mekong Namur est édité par Vannara Rith, domicilié au rue de Gravière 6, 5000 Namur.</p>

                <h3>ARTICLE 3 : accès aux services</h3>

                <p>L’Utilisateur du site <a href="https://mekong-namur.be">https://mekong-namur.be</a> a accès aux services suivants :</p>

                <ul>
                    <li>De restauration alimentaire</li>
                    <li>Téléchargement du menu en PDF</li>
                </ul>

                <p>Tout Utilisateur ayant accès a internet peut accéder gratuitement et depuis n’importe où au site. Les frais supportés
                par l’Utilisateur pour y accéder (connexion internet, matériel informatique, etc.) ne sont pas à la charge de l’Éditeur.</p>

                <p>Le site et ses différents services peuvent être interrompus ou suspendus par l’Éditeur, notamment à l’occasion
                d’une maintenance, sans obligation de préavis ou de justification.</p>

                <h3>ARTICLE 4 : Responsabilité de l’Utilisateur</h3>

                <p>L'Utilisateur est responsable des risques liés à l’utilisation de son identifiant de connexion et de son mot de passe. 
                Le mot de passe de l’Utilisateur doit rester secret. En cas de divulgation de mot de passe, l’Éditeur décline toute responsabilité.
                L’Utilisateur assume l’entière responsabilité de l’utilisation qu’il fait des informations et contenus présents sur le site <a href="https://mekong-namur.be">https://mekong-namur.be</a>.
                Tout usage du service par l'Utilisateur ayant directement ou indirectement pour conséquence des dommages doit faire l'objet d'une indemnisation au profit du site.</p>

                <h3>ARTICLE 5 : Responsabilité de l’Éditeur</h3>

                <p>Tout dysfonctionnement du serveur ou du réseau ne peut engager la responsabilité de l’Éditeur.
                De même, la responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et insurmontable d'un tiers.
                Le site <a href="https://mekong-namur.be">https://mekong-namur.be</a> s'engage à mettre en œuvre tous les moyens nécessaires pour garantir la sécurité et la confidentialité des données.
                Toutefois, il n’apporte pas une garantie de sécurité totale. L’Éditeur se réserve la faculté d’une non-garantie de
                la fiabilité des sources, bien que les informations diffusées su le site soient réputées fiables.</p>

                <h3>ARTICLE 6 : Propriété intellectuelle</h3>

                <p>Les contenus du site <a href="https://mekong-namur.be">https://mekong-namur.be</a> (logos, textes, éléments graphiques, vidéos, etc.) son protégés par le droit d’auteur, en vertu du Code de la propriété intellectuelle.
                L’Utilisateur devra obtenir l’autorisation de l’éditeur du site avant toute reproduction, copie ou publication de ces différents contenus.
                Ces derniers peuvent être utilisés par les utilisateurs à des fins privées ; tout usage commercial est interdit.
                L’Utilisateur est entièrement responsable de tout contenu qu’il met en ligne et il s’engage à ne pas porter atteinte à un tiers.
                L’Éditeur du site se réserve le droit de modérer ou de supprimer librement et à tout moment les contenus mis en ligne par les utilisateurs, et ce sans justification.</p>


                <h3>ARTICLE 7 : Données personnelles</h3>

                <p>L’Utilisateur doit obligatoirement fournir des informations personnelles pour procéder à la commande sur le site. 
                L’adresse électronique (e-mail) de l’utilisateur pourra notamment être utilisée par le site <a href="https://mekong-namur.be">https://mekong-namur.be</a> pour la communication d’informations diverses et la gestion du compte.
                <a href="https://mekong-namur.be">https://mekong-namur.be</a> garantie le respect de la vie privée de l’utilisateur, conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.</p>

                <h3>ARTICLE 8 : Liens hypertextes</h3>

                <p>Les domaines vers lesquels mènent les liens hypertextes présents sur le site n’engagent pas la responsabilité de 
                l’Éditeur de <a href="https://mekong-namur.be">https://mekong-namur.be</a>, qui n’a pas de contrôle sur ces liens. Il est possible pour un tiers de créer un lien vers une 
                page du site <a href="https://mekong-namur.be">https://mekong-namur.be</a> sans autorisation expresse de l’éditeur.</p>

                <h3>ARTICLE 9 : Évolution des conditions générales d’utilisation</h3>

                <p>Le site <a href="https://mekong-namur.be">https://mekong-namur.be</a> se réserve le droit de modifier les clauses de ces conditions générales d’utilisation à tout moment et sans justification.</p>

                <h3>ARTICLE 10 : Durée du contrat</h3>

                <p>La durée du présent contrat est indéterminée. Le contrat produit ses effets à l'égard de l'Utilisateur à compter du début de l'achat du service jusqu'à sa réception sans appel sur un potentiel mécontentement à l'égard d'un mauvais état ou manque de produit.</p>

                <h3>ARTICLE 11 : Droit applicable et juridiction compétente</h3>

                <p>Le présent contrat dépend de la législation belge. 
                En cas de litige non résolu à l’amiable entre l’Utilisateur et l’Éditeur, les tribunaux de Bruxelles sont compétents pour régler le contentieux</p>
            
            </main>
            
        <Footer/>
    </>
    )
}
