var email = document.querySelector("[name='E-mail']"); 
var mdp = document.querySelector("[name='password']"); 

var account = {};

function testlogin() {
  //if (email.value == 'liam.thiveux@wordline.com' && mdp.value == 'test') {
   install();
  //}
}

 function getAccount() { 
      account.email = email.value; 
      account.mdp = mdp.value; 
    } 
 
   email.value = account.email; 
   mdp.value = account.mdp; 

function showMessage(message) {
    const messageElement = document.getElementById('msg');
    messageElement.innerHTML = message + '\n' + messageElement.innerHTML;
}

function clearMessages() {
    document.getElementById('msg').innerHTML = '';
}

function showElement(id) {
    document.getElementById(id).style.display = 'block';
}

function hideElement(id) {
    document.getElementById(id).style.display = 'none';
}

function hideElements() {
    const elements = ['checking', 'installed', 'installing', 'uninstalling', 'not-installed'];
    for (const id of elements) {
        hideElement(id);
    }
}

function check() {
    clearMessages();
    hideElements();
    showElement('checking');

    if (!navigator.serviceWorker) {
        hideElement('checking');
        showMessage('No service worker capability in this browser.');
        return;
    }

    navigator.serviceWorker.getRegistration('app.js')
        .then((registration) => {
            if (!registration) {
                hideElement('checking');
                showElement('not-installed');
                return;
            }
            showElement('installed');
            document.getElementById('scope').innerHTML = registration.scope;
            if (!registration.paymentManager) {
                hideElement('checking');
                showMessage('No payment handler capability in this browser. Is chrome://flags/#service-worker-payment-apps enabled?');
                return;
            }
            if (!registration.paymentManager.instruments) {
                hideElement('checking');
                showMessage('Payment handler is not fully implemented. Cannot set the instruments.');
                return;
            }
            if (!registration.paymentManager.instruments.has('instrument-key')) {
                hideElement('checking');
                showMessage('No instruments found. Did installation fail?');
                return;
            }
            registration.paymentManager.instruments.get('instrument-key').then((instrument) => {
                document.getElementById('method').innerHTML = instrument.enabledMethods;
                hideElement('checking');
            }).catch((error) => {
                hideElement('checking');
                showMessage(error);
            });

        })
        .catch((error) => {
            hideElement('checking');
            showMessage(error);
        });
}

function install() {
    hideElements();
    showElement('installing');

    navigator.serviceWorker.register('app.js')
        .then(() => {
            return navigator.serviceWorker.ready;
        })
        .then((registration) => {
            if (!registration.paymentManager) {
                hideElement('installing');
                showMessage('No payment handler capability in this browser. Is chrome://flags/#service-worker-payment-apps enabled?');
                return;
            }
            if (!registration.paymentManager.instruments) {
                hideElement('installing');
                showMessage('Payment handler is not fully implemented. Cannot set the instruments.');
                return;
            }
            registration.paymentManager.instruments
                .set('instrument-key', {
                    name: 'From manifest anyway',
                    enabledMethods: ['https://liamThiveux.github.io'],
                })
                .then(() => {
                    registration.paymentManager.instruments.get('instrument-key').then((instrument) => {
                        document.getElementById('scope').innerHTML = registration.scope;
                        document.getElementById('method').innerHTML = instrument.enabledMethods;
                        hideElement('installing');
                        showElement('installed');
                        showElement('submit');
                    }).catch((error) => {
                        hideElement('installing');
                        showMessage(error);
                    });
                })
                .catch((error) => {
                    hideElement('installing');
                    showMessage(error);
                });
        })
        .catch((error) => {
            hideElement('installing');
            showMessage(error);
        });
}

/*var appDef = { 
     manifest: { 
       name: "WhiteCollar", 
       label: "WhiteCollar", 
       options: [ 
       { 
         name: "WhiteCollar for SEPA Payment", 
         label: "WhiteCollar SEPA", 
         id: "WhiteCollar", 
         enabledMethods: ["https://liamThiveux.github.io"] 
       }] 
     }, 
     script: "app.js", 
     scope: "./" 
   }; 



function install() {  
 
    getAccount(); 
    appDef.manifest.options[0].name = "Liam w/ IBAN '" + account.numcarte.substr(0, 3) + "xxxx" + account.numcarte.substr(-4) + "'"; 
    appDef.manifest.options[0].label = appDef.manifest.options[0].name; 
    appDef.manifest.options[0].id = account.numcarte; 

 navigator.serviceWorker.register(appDef.script, { scope: appDef.scope }).then(function (registration) { 
        return registration.paymentAppManager.setManifest(appDef.manifest); 
      }).catch(function (ex) { 
            console.log(ex);
      }); 
   } */


function uninstall() {
    hideElements();
    showElement('uninstalling');

    navigator.serviceWorker.getRegistration('app.js')
        .then((registration) => {
            registration.unregister().then((result) => {
                if (result) {
                    hideElement('uninstalling');
                    showElement('not-installed');
                } else {
                    hideElement('uninstalling');
                    showElement('installed');
                    showMessage('Service worker unregistration returned "false", which indicates that it failed.');
                }
            }).catch((error) => {
                hideElement('uninstalling');
                showMessage(error);
            });
        }).catch((error) => {
            hideElement('uninstalling');
            showMessage(error);
        });
}

check();
