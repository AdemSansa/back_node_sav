
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');

const app = express();
const server = http.createServer(app);
const path = require('path');
const setupMongoServer = require('./config/database');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// PORT
const port = process.env.PORT || 8080;
// Connecting mongoDB
(async () => {
  await setupMongoServer();
})()


// Setting up static directory
app.use('/api/public', express.static(path.join(__dirname, 'public')));
app.use('/api/private', express.static(path.join(__dirname, 'private')));
app.use(morgan('combined'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ****** import routes ******* //
const userRoutes = require('./modules/users/user.route')


// ****** APIs ******* //

app.use("/api/users", userRoutes);





app.get('/api/version', (req, res) => res.status(200).json({
  version: process.env.VERSION,
  dateDeploy: process.env.DATE_DEPLOY,
}));
// Index Route
app.get('/', (req, res) => {
  res.status(404).send({ message: '404 not found' });
});

app.get('*', (req, res) => {
  res.status(404).json({ message: '404 not found' });
});

app.use((req, res) => {
  res.status(404).json({ message: '404 not found' });
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`Connected to port ${port}`);
});
