var cardnumber;
var bilyap;
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
     console.log("bilyap value" + bilyap);
     //e.open("https://liamThiveux.github.io/recommendedapp/testpage");
     e.openWindow("https://liamThiveux.github.io/recommendedapp/paylibLogin?total="+e.total.value).then(function(windowClient) {
      bilyap = true;
      console.log("bilyap value apres true" + bilyap);

   //e.openWindow("https://rsolomakhin.github.io/pr/bob/").then(function(windowClient) {
   windowClient.postMessage({data:e.methodData[0].data, total: e.total.value});
     })
     .catch(function(err) {
       reject(err);
     });
   }));
 });



// Commande Leroy Merlin : https://paiement.paylib.fr/interbank-pay-core/payment/register.do;jsessionid=Qs4sRrDuyolIo35ORpzfkd8y.node2?execution=e1s1&n=850025000
// https://paiement.paylib.fr/interbank-pay-core/payment/register.do?execution=e2s1&n=1841686735
