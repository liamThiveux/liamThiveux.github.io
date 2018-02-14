var cardnumber;
 var uliam = "THIVEUX";
 function editapp(edcard){
  cardnumber = edcard;
  //function save(edcard)
 }

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

   //window.open("https://paiement.paylib.fr/interbank-pay-core/payment/register.do?execution=e2s1&n=1841686735"); //OpenWindow ouvre une url du meme url que le script
   console.log(e.total.value);
   //e.open("https://liamThiveux.github.io/recommendedapp/testpage");
   var newWindow =e.openWindow("https://liamThiveux.github.io/recommendedapp/paylibLogin?total="+e.total.value);
   newWindow.amount = e.total.value;
   newWindow.then(function(windowClient) {
   //e.openWindow("https://liamThiveux.github.io/recommendedapp/testpage").then(function(windowClient) {  
   console.log("test on est dedans?");
      //windowClient.postMessage("Bonjour","https://liamThiveux.github.io/sips/selection");
    })
    .catch(function(err) {
      reject(err);
    });
   //e.complete();
  }));
});

// Commande Leroy Merlin : https://paiement.paylib.fr/interbank-pay-core/payment/register.do;jsessionid=Qs4sRrDuyolIo35ORpzfkd8y.node2?execution=e1s1&n=850025000
// https://paiement.paylib.fr/interbank-pay-core/payment/register.do?execution=e2s1&n=1841686735
