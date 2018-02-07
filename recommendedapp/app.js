self.addEventListener('canmnakepayment', (evt) => {
  evt.respondWith(true);
});

self.addEventListener('paymentrequest', (evt) => {
    evt.respondWith({
        methodName: 'https://paylib.com',
        details: {
            token: '1234567890',
        },
    });
});
