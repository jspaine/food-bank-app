FROM mhart/alpine-node:8.11.2

WORKDIR /opt
COPY . /opt
ENV NODE_ENV=production

RUN npm install
RUN npm run build

RUN cp -n server/config/env/secrets-template.js server/config/env/secrets.js

CMD ["npm", "start"]
EXPOSE 3000