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
     e.openWindow("https://liamThiveux.github.io/recommendedapp/paylibLogin?total="+e.total.value).then(function(windowClient) {
   windowClient.postMessage({data:e.methodData[0].data, total: e.total.value});
     })
     .catch(function(err) {
       reject(err);
     });
   }));
 });
