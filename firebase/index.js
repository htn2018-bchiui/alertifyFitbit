const functions = require('firebase-functions');
// import the module
var request = require('request');


exports.alert = functions.https.onRequest((req, res) => {
    var x = Date()
    console.log("Possible fall has occured!");
    data = {
        "patient_name": "Bob",
        "patient_id": 99999
    };
    request.post({
        url: 'http://e7a4bb81.ngrok.io/fitbitAlert',
        body: JSON.stringify(data),
        headers: {
           'Content-Type':  'application/json',
         }
    }, (error, res, body) => {
         console.log(res);
         if (error){
            console.log("Error occured");
        }
    })
    // make the request
    res.status(200).send("Sent POST request.");

})
