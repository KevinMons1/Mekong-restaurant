import React from 'react'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/NavBar/NavBar'
import { Helmet } from "react-helmet"

export default function Cgv() {
    return (
        <>
            <Helmet>
                <meta name="description" content="Fine cuisine thaïlandaise à Namur, vous pouvez consulter nos conditions générales de vente." />
            </Helmet>

            <header>
                <NavBar />
            </header>

            <main className="legal">
                <h1>Conditions générales de vente du site Mekong Namur</h1>

                <p>RITH COMPANY SCS<br />Rue de Gravière 6, 5000 Namur<br />N° d'entreprise (BCE/TVA)&nbsp;: BE 0675.875.016<br />
                E-mail&nbsp;: vannara.compagnie@gmail.com<br />Téléphone&nbsp;: +32 (0) 81 65 80 62<br />Code de conduite&nbsp;: <a href="https://www.favv-afsca.be/professionnels/">AFSCA</a></p>
                
                <h3>1. Champ d'application</h3>

                <p>Les présentes conditions générales de vente définissent les droits et obligations réciproques en 
                cas d'achat de produits ou de services sur la Plateforme par un Utilisateur.</p>
                <p>Les CGV expriment l'intégralité des obligations des parties. Le Client est réputé les accepter sans réserve, faute de 
                quoi sa commande ne sera pas validée.</p>
                <p>Il peut exceptionnellement être dérogé aux dispositions des CGV dans la mesure où ces dérogations ont fait l'objet d'un 
                accord écrit. Ces dérogations peuvent consister en la modification, l'ajout ou la suppression des clauses auxquelles elles 
                se rapportent et n'ont aucune incidence sur l'application des autres dispositions des CGV.</p>
                <p>RITH COMPANY SCS se réserve le droit de modifier ponctuellement les CGV. Les modifications seront applicables dès leur mise
                en ligne pour tout achat postérieur à cette date.</p>
                
                <h3>2. Boutique en ligne</h3>

                <p>Par l'intermédiaire de la Plateforme, le Vendeur fournit au Client une boutique en ligne présentant les produits ou services
                vendus, sans que les photographies aient une valeur contractuelle.</p>
                <p>Les produits ou services sont décrits et présentés avec la plus grande exactitude possible. Toutefois, en cas d'erreurs ou 
                omissions dans la présentation, la responsabilité du Vendeur ne pourra être engagée de ce fait.</p>
                <p>Les produits et services sont proposés dans la limite de leur disponibilité.</p>
                <p>Les prix TVAC sont précisés dans la boutique en ligne.</p>

                <h3>3. Prix</h3>

                <p>Le Vendeur se réserve le droit de modifier ses prix à tout moment en les publiant en ligne.</p>
                <p>Seuls s'appliqueront les tarifs indiqués en vigueur au moment de la commande, sous réserve de disponibilité 
                à cette date.</p>
                <p>Le montant total de la commande (toutes taxes comprises) et, le cas échéant, des frais de livraison est indiqué avant 
                validation finale du bon de commande dans le minimum demandé par zone de commande.</p>
                
                <h3>4. Commande en ligne</h3>

                <p>Le Client a la possibilité de remplir un bon de commande en ligne, au moyen d'un formulaire électronique. En remplissant 
                le formulaire électronique, le Client accepte le prix et la description des produits ou services.</p>
                <p>Pour que sa commande soit validée, le Client devra accepter les présentes CGV en cliquant à l'endroit indiqué.</p>
                <p>Le Client devra fournir une adresse de courrier électronique, son nom et prénom, son numéro de téléphone, ses coordonnées de livraison valides. 
                Tout échange avec le Vendeur pourra intervenir au moyen de cette adresse de courrier électronique ou de ce numéro de téléphone.</p>
                <p>De plus, le Client devra choisir l'heure de livraison et valider le mode de paiement.</p>
                <p>Le Vendeur se réserve le droit de bloquer la commande du Client en cas de défaut de paiement, d'adresse erronée ou de tout 
                autre problème lier à la commande passée par le Client et ce, jusqu'à résolution du problème.</p>
               
                <h3>5. Confirmation et paiement de la commande</h3>

                <p>Le Vendeur reste propriétaire des articles commandés jusqu'à la réception du paiement intégral de la commande.</p>
                <p><em>a. Paiement</em></p>
                <p>Le Client effectue le paiement au moment de la validation finale de la commande en utilisant le mode de paiement choisi (choix de carte bancaire). 
                Cette validation tient lieu de signature.</p>
                <p>Le Client garantit au Vendeur qu'il dispose des autorisations nécessaires pour utiliser ce mode de paiement et reconnait 
                que les informations données à cet effet valent preuve de son consentement à la vente comme à l'exigibilité des sommes dues 
                au titre de la commande.</p>
                <p>Le Vendeur a mis en place une procédure de vérification des commandes et des moyens de paiement destinés à le garantir 
                raisonnablement contre toute utilisation frauduleuse d'un moyen de paiement, y compris en demandant au Client des données d'identification.</p>
                <p>En cas de refus d'autorisation de paiement par carte bancaire de la part des organismes accrédités ou en cas de non-paiement, 
                le Vendeur se réserve le droit de suspendre ou d'annuler la commande et sa livraison.</p>
                <p>Le Vendeur se réserve également le droit de refuser une commande émanant d'un Client qui n'aurait pas réglé totalement ou 
                partiellement une commande précédente ou avec lequel un litige de paiement serait en cours ou si un problème autre serait produit dans le passé.</p>
                <p><em>b. Confirmation</em></p>
                <p>Dès réception de la validation de l'achat assortie du paiement, le Vendeur en transmet au Client, ainsi qu'un rappel de
                la commande envoyé par mail.</p>
                <p>En cas d'indisponibilité d'un service ou d'un produit, le Vendeur tiendra le Client informé par téléphone ou par courrier électronique dans
                les meilleurs délais afin de le remplacer ou d'annuler la commande de ce produit et éventuellement de rembourser le prix afférent, le reste de la commande demeurant ferme et définitif.</p>
                
                <h3>6. Preuve</h3>

                <p>Les communications, commandes et paiements intervenus entre le Client et le Vendeur pourront être prouvés grâce aux registres 
                informatisés, conservés dans les systèmes informatiques du Vendeur dans des conditions raisonnables de sécurité. Les bons de 
                commandes est archivé sur un support fiable et durable considéré, notamment, comme un moyen de preuve.</p>
                
                <h3>7. Livraison</h3>

                <p>La livraison n'est faite qu'après confirmation du paiement par l'organisme bancaire du Vendeur.</p>
                <p>Les produits sont livrés à l'adresse indiquée par le Client sur le formulaire en ligne valant bon de commande. 
                Les frais supplémentaires découlant d'informations incomplètes ou erronées par le Client lui seront facturées.</p>
                <p>RITH COMPANY SCS ne livre pas plus loin qu'à une distance de 5500 mètres de rue de Dave 7, 5100 Namur</p>
                <p>Un prix minimum est obligatoire pour pouvoir être livrer, le prix est déterminé selon votre position (pas plus de 5500 mètres) autour de rue de Dave 7, 5100 Namur.</p>
                <p>La livraison intervient, dans les délais suivants&nbsp;:</p>
                <p>Livraison à l'heure indiquée lors du passage de la commande faites par l'utilisateur</p>
                <p>Les délais de livraison sont donnés à titre indicatif. Aucune indemnité ne pourra être réclamée au Vendeur ou au transporteur 
                en cas de retard de livraison. Si les délais de livraison dépassent 24 heures à compter de la commande, le contrat de vente 
                pourra toutefois être résilié et le Client remboursé.</p>
                <p><em>a. Vérification de la commande</em></p>
                <p>A la réception des produits, le Client ou le destinataire vérifie le bon état du produit livré ou la conformité du service 
                fourni.</p>
                <p>Dans l'hypothèse où l'un ou plusieurs des produits commandés sont manquants ou abîmés, le Client ou le destinataire doit 
                formuler les réserves nécessaires au transporteur au moment de la livraison et immédiatement en faire part au Vendeur.</p>
                <p>La vérification est considérée comme effectuée dès lors que le Client ou une personne autorisée par lui a réceptionné la 
                commande sans émettre de réserves.</p>
                <p>Toute réserve non effectuée dans les règles définies ci-dessus et dans les délais impartis ne pourra être prise en compte 
                et dégagera le Vendeur de toute responsabilité vis-à-vis du Client.</p>
                <p>b.<em> Erreur de livraison</em></p>
                <p>En cas d'erreur de livraison ou de non-conformité des produits par rapport aux indications figurant sur le bon de commande, 
                le Client en informe le Vendeur dans l'immédiat (max 30 minutes) suivant l'heure de livraison (ou de réception si retard de livraison).</p>
                <p>Toute réclamation non effectuée dans le délai imparti ne pourra être prise en compte et dégagera le Vendeur de toute 
                responsabilité vis-à-vis du Client.</p>
                <p><em>c. Retours et échanges</em></p>
                <p>Le produit à échanger ou à rembourser devra être retourné au Vendeur dans son ensemble, selon
                les modalités suivantes&nbsp;:</p>
                <p>En cas de non-satisfaction, l'utilisateur devra appeler RITH COMPANY SCS au +32 (0) 81 65 80 62 pour se faire échanger le plat
                en cas de preuve de l'erreur émise dans la commande (oubli de condiment, etc.) et de l'accord de RITH COMPANY SCS.</p>
                <p>Toute réclamation et tout retour non effectué dans les règles définies ci-dessus et dans les délais impartis ne pourra être 
                pris en compte et dégagera le Vendeur de toute responsabilité vis-à-vis du Client.</p>
                <p>Tout produit à échanger ou à rembourser devra être retourné au Vendeur dans son ensemble.
                Les frais de retour sont à la charge du Vendeur.</p>

                <h3>9. Droit de rétractation</h3>

                <p>Conformément à la loi Loi relative aux pratiques du marché et à la protection du consommateurs du 6 avril 2010 et
                selon l'Article 47. § 4 sub 2, le consommateur ne peut exercer le droit de rétractation prévu sur les produits qui sont
                susceptibles de se détériorer ou de se périmer rapidement</p>
     
                <h3>10. Force majeure</h3>

                <p>Si le Vendeur se voit empêché, en tout ou en partie, d'exécuter la commande en raison d'une circonstance imprévue et indépendante 
                de sa volonté, il est alors question de force majeure.</p>
                <p>En cas de force majeure, le Vendeur est autorisé à suspendre l'exécution de la commande, en tout ou en partie, pendant toute la durée 
                de la force majeure. Le Vendeur en avertit immédiatement le Client.</p>
                <p>Si la force majeure perdure plus de 4 heures sans interruption, ke Client peut demander un remboursement</p>
                
                <h3>11. Indépendance des clauses</h3>

                <p>L'illégalité ou la nullité totale ou partielle d'une disposition des présentes CGV n'aura aucun impact sur la validité et l'application 
                des autres dispositions. Le Vendeur se réserve le droit de remplacer la disposition illégale ou nulle par une autre disposition valable et de portée similaire.</p>
                
                <h3>12. Loi applicable et juridiction compétente</h3>
                
                <p>Les présentes CGV sont régies par le droit belge.</p>
                <p>En cas de différend et à défaut d'accord amiable, le litige sera porté devant les tribunaux de l'arrondissement judiciaire du siège social 
                du Vendeur.</p>

            </main>

            <Footer />
        </>
    )
}
