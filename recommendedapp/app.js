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
 
/* self.addEventListener('paymentrequest', (evt) => {
 
     evt.respondWith({
          methodName: 'https://liamThiveux.github.io',
          details: {
              user: uliam,
             numcarte: cardnumber,
             numcarte: testtosave,
              compte: "Liam thiveux",
              numero: function edittest(){  }
              cardNumber: "4200 XXXX XXXX XXXX",
             token: '1234567890',
   
         },
     });
 });*/

self.addEventListener('paymentrequest', function(e) {
  e.respondWith(new Promise(function(resolve, reject) {
    self.addEventListener('message', listener = function(e) {
      self.removeEventListener('message', listener);
      if (e.data.hasOwnProperty('name')) {
        reject(e.data);
      } else {
        resolve(e.data);
      }
    });

    //e.open(" https://ssl-liv-bo-interbank.ewallet.aw.atos.net/interbank-bo/merchant"); //OpenWindow ouvre une url du meme url que le script
        var popup = e.openWindow("https://liamThiveux.github.io/recommendedapp/handlerPage");
   e.openWindow("https://liamThiveux.github.io/recommendedapp/handlerPage").then(function(windowClient) {
     console.log("test on est dedans?");
      windowClient.postMessage("Je crois que e.data est vide","https://liamThiveux.github.io");
    })
    .catch(function(err) {
      reject(err);
    });
  }));
});

// Commande Leroy Merlin : https://paiement.paylib.fr/interbank-pay-core/payment/register.do;jsessionid=Qs4sRrDuyolIo35ORpzfkd8y.node2?execution=e1s1&n=850025000
// https://paiement.paylib.fr/interbank-pay-core/payment/register.do?execution=e2s1&n=1841686735
