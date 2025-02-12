const express = require('express');
const employeeRoute = require('./routes/employeeRoute');
const specieRoute = require('./routes/specieRoute');
const enclosureRoute = require('./routes/enclosureRoute');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();

app.use(express.json());

async function initDb() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Db Synced');
    } catch (error) {
        console.error('Unbale to sync db: ', error);
    }
}

initDb();
app.use('/employee', employeeRoute);
app.use('/specie', specieRoute);
app.use('/enclosure', enclosureRoute);

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});