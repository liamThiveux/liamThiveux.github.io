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
            numero: function edittest(){  }
            cardNumber: "4200 XXXX XXXX XXXX",
            token: '1234567890',
  
        },
    });
});
