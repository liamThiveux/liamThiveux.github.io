self.addEventListener('canmnakepayment', (evt) => {
  evt.respondWith(true);
});

self.addEventListener('paymentrequest', (evt) => {
    evt.respondWith({
        methodName: 'https://liamThiveux.github.io',
        details: {
            token: '1234567890',
        },
    });
});
