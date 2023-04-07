
# Consigne SAE 4.01 MMI (Parcours Dev) 22/23 

Dans le cadre du développement frontend de la **SAE 4.01**, nous vous demandons d'implémenter une application React qui implémente l'interface d'utilisation de plusieurs services web fournis par un back-end (ou back-office).

Nous vous conseillons d'utiliser le back-office qui vous avez implémenté dans le cadre du développement back-end (avec M. Roch).  

Il vous suffira de rendre disponible en tant que services REST les fonctionnalités "CRUD" implémentés.  

Pour ce qui concerne le résultat attendu coté Front-end, nous nous attendons une interface qui permet l'affichage, la modification et l'insertion des éléments.

**À cet effet, vous trouvez des composants ReactJS ici:**  https://www.htmlelements.com/react/demos/grid/overview/

Pour chaque opération, vous devez donc prévoir l'envoie d'une requête au back-end et le traitement des données reçues. Les erreurs devront être traitées aussi coté front-end.

# Base de depart

Dans cet entrepôt, vous trouvez un exemple (vu en classe) d'application front-end ReactJS (formulaire) qui envoie des données à un service web RESTful implémenté en PHP.

**restAPI_CRUD_PHP** --> dossier qui contient le back-end PHP (RESTFUL api) (contient seulement la CREATION d'un ITEM dans une BD MySQL)

**src_REACTJS_FRONT** --> dossier qui contient le code source de l'app ReactJS qui communique avec le backend restAPI_CRUD_PHP. Notez que pour le faire tourner dans votre machine vous devez l'ajouter à une application ReactJS (en NodeJS : npm init react-app [nom application] + ajoutez les fichier du dossier src_REACTJS_FRONT dans le dossier src de votre application ReactJS.)

# Optionnel

Si vous ne souhaitez pas utiliser un back-office php, vous pouvez utiliser des APIs RESTful disponibles en ligne (https://any-api.com/).

Dans ce cas, vous devriez prévoir une application ReactJS qui récupère des données par le biais du web service choisi.  

Ici des ressources utiles pour créer des interfaces captivantes :

https://kinsta.com/blog/react-components-library/

