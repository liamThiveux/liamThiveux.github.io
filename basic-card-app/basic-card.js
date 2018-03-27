 self.addEventListener('canmnakepayment', (evt) => {
   evt.respondWith(true);
 });

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
    var cardNumber = "5134 1012 3456 7890";
    var expDate = "00/00";
     e.openWindow("https://liamThiveux.github.io/basic-card-app/CVC.html).then(function(windowClient) {
   windowClient.postMessage({data:e.methodData[0].data, cbNumber: cardNumber, date: expDate});
     })
     .catch(function(err) {
       reject(err);
     });
   }));
 });
