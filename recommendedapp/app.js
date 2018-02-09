var cardnumber;

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
            compte: "Liam thiveux",
            cardNumber: "4200 XXXX XXXX XXXX",
            token: '1234567890',
            test: cardnumber,
        },
    });
});
