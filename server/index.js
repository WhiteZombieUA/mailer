const express = require('express');
const bodyParser = require('body-parser');
const dns = require('dns');
const async = require('async');


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
app.post('/mails', function(req, res) {
    var name = req.body.name;
    var surname = req.body.surname;
    var company = req.body.company;
    var zones = ['ru', 'com','ua','com.ua','org'];

    var mailNames = [];
    mailNames[0] = name;
    mailNames[1] = surname;
    mailNames[2] = name.charAt(0) + surname;
    mailNames[3] = name.charAt(0) + '.' + surname;
    mailNames[4] = name + '.' + surname;
    mailNames[5] = name + surname;


    var domains = zones.map(function (zone) {
        return company + '.' + zone;
    });

    async.reduce(domains, [], function(memo, domain, mxDomains) {
        dns.resolveMx(domain, function(err, addresser) {
            if (!err) {
                mxDomains(null, memo.concat(domain));
            } else {
                mxDomains(null, memo);
            }
        });
    }, function(err, result) {

        var emails = [];
        for(var i=0; i<result.length; i++) {
            for (var j=0; j<mailNames.length; j++) {
                emails.push(mailNames[j] + '@' + result[i]);
            }
        }

        res.send(JSON.stringify({emails: emails}));
    });

});

// launch app
app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});