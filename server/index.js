const express = require('express');
const bodyParser = require('body-parser');

// Configuration
const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(
    bodyParser.json(),
    bodyParser.urlencoded({
        extended: true
    })
);

// Routes

// launch app
app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});