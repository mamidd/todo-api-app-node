# todo-api-app-node
Un' applicazione in Node.js che permette di gestire dei post-it.

Per avviarla in locale, avviare prima un db mongo. Installare la versione 4.0 e settare il path del database.
Il path del database sarà poi usato per avviare il processo server di mongodb.

Per utilizzarla su heroku usare il seguente url:
https://stark-bayou-69715.herokuapp.com/
Attenzione che potrebbe non funzionare se è stato disattivato l'addons che aggiunge il db mongo per evitare di pagare.


-- Per avviare il processo server mongodb --


Su windows digitare da powershell:

cd "C:\Program Files\MongoDB\Server\4.0\bin"

.\mongod.exe --dbpath "C:\xampp\htdocs\udemy\node-js\mongo-data" (path del db mongo)
