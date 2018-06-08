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
     e.openWindow("https://localhost/POCW3C/Ideal/index.html").then(function(windowClient) {
   windowClient.postMessage("hello, you receive me ?");
     })
     .catch(function(err) {
       reject(err);
     });
   }));
 });
