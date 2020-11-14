const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


//execution of app and virtualized port
const app = express();
const PORT = process.env.PORT || 3000;

//middleware and passthroughs
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


//execute server to the port
app.listen(PORT, () => console.log(`LISTENING ON PORT: ${PORT}`));