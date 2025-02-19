FROM ticnovacom/node-chromium-puppeteer:20

WORKDIR /home

COPY . .

EXPOSE 8080

RUN npm install

ENTRYPOINT [ "npm","run","dev" ]
