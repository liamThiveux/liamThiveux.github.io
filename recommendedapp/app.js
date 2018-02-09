var cardnumber = "4200";
var uliam = "THIVEUX";
function editapp(edcard){
 cardnumber = edcard;
}

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
    });
});
