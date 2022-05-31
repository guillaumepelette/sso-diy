# Instructions pour build notre image basé sur Node.js v18

FROM node:18
# Par défaut dans cette image, il existe un utilisateur
# nommé "node", avec un dossier /home/node

# équivalent à "cd /home/node/app"
WORKDIR /home/node/app

# on copie tous les fichiers du projet/service "server"
# dans le dossier courant (/home/node/app)
# => on récupère notamment package-lock.json
# COPY . /home/node/app
COPY . .

# on exécute la commande d'installation des dépendances
# (en étant toujours dans /home/node/app)
# => ça utilise package-lock.json
RUN npm install

# -------

# Purement documentaire : pour savoir que le processus ci-dessous
# squatte le port 3000
EXPOSE 3000

# On anticipe/définit la commande (le processus) qui devra
# être lancé par défaut dans un container instancié à partir
# de cette image
CMD ["npm", "run", "start"]