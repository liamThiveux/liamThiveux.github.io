
var cardnumber = document.querySelector("[name='numcarte']"); 
console.log(cardnumber);

self.addEventListener('canmnakepayment', (evt) => {
  evt.respondWith(true);
});

self.addEventListener('paymentrequest', (evt) => {

    evt.respondWith({
        methodName: 'https://liamThiveux.github.io',
        details: {
            compte: "Liam thiveux",
            test: cardnumber,
            cardNumber: "4200 XXXX XXXX XXXX",
            token: '1234567890',
        },
    });
});
