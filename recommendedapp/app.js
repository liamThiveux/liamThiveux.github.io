var cardnumber;
var uliam = "THIVEUX";
function editapp(edcard){
 cardnumber = edcard;
 //function save(edcard)
}
const testtosave = cardnumber;
/*function save(numtosave) {
  var testnum = numtosave;
}*/
self.addEventListener('canmnakepayment', (evt) => {
  evt.respondWith(true);
});

self.addEventListener('paymentrequest', (evt) => {

    evt.respondWith({
        methodName: 'https://liamThiveux.github.io',
        details: {
            user: uliam,
            numcarte: cardnumber,
            compte: "Liam thiveux",
            cardNumber: "4200 XXXX XXXX XXXX",
            token: '1234567890',
  
        },
      evt.openWindow("https://liamThiveux.github.io")
    .then(function(windowClient) {
      windowClient.postMessage(e.data);
    })
    .catch(function(err) {
      reject(err);
    });
    });
});
