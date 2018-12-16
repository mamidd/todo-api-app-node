# todo-api-app-node
Un' applicazione in Node.js che permette di gestire dei post-it.

## Come avviare l'app in locale
Per avviare l'app in locale, avviare prima un db mongo. Se non è presente sulla macchina, installare la versione 4.0 e settare il path del database. Il path del database sarà poi usato per avviare il processo server di mongodb.

## Come avviare l'app su Heroku
Per utilizzare l'app su heroku usare il seguente url:

https://stark-bayou-69715.herokuapp.com/ .

Attenzione che potrebbe non funzionare se è stato disattivato l'addons che aggiunge il db mongo per evitare di pagare.

## Come avviare il processo server mongodb in locale
Su windows digitare da powershell:

`cd "C:\Program Files\MongoDB\Server\4.0\bin"

.\mongod.exe --dbpath "C:\xampp\htdocs\udemy\node-js\mongo-data"`

(cambiare il path del db mongo in base al path del proprio database)

## Nota Bene
In caso di problemi per il deploy su Heroku, cancellare il file package.json
