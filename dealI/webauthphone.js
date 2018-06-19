
var state = {
  // Raw messages
  createRequest: null,
  createResponse: null,
  // challengeBytes: null,
  // registeredKey: null,
  // signResponse: null,

  // Parsed values
  publicKey: null,
  keyHandle: null,
}

function makeCredential() {
    let rpid = document.domain;



 /*.then(function (aNewCredentialInfo) {
      state.createResponse = aNewCredentialInfo

      let buffer = getArrayBuffer("createOut", aNewCredentialInfo.response.attestationObject);

      return webAuthnDecodeCBORAttestation(buffer);
    })
    .then(function (aAttestation) {
      // Make sure the RP ID hash matches what we calculate.
      return crypto.subtle.digest("SHA-256", string2buffer(rpid))
      .then(function(calculatedHash) {
           //"Calculated RP ID hash must match what the browser derived.");
        return Promise.resolve(aAttestation);
      });
    })
    .then(async function (aAttestation) {
      let flags = new Uint8Array(aAttestation.flags);
	  state.keyHandle = state.createResponse.rawId;

      state.publicKey = aAttestation.publicKeyHandle;
      //document.getElementById("done").value="true";
	console.log($("#done").val());
      $("#done").val() = "true";
     
      let clientData = JSON.parse(buffer2string(state.createResponse.response.clientDataJSON));
    }).then(function (){
      append("createOut", JSON.stringify(createRequest, null, 2) + "\n\n");
    }).catch(function (aErr) {
      if ("name" in aErr && (aErr.name == "AbortError" || aErr.name == "NS_ERROR_ABORT")) {
        gResults.reset();
      } else {
        gResults.fail();
      }
    }).then(function (){
      resultColor("createOut");
    });
}*/

if (!window.PublicKeyCredential) { /* Platform not capable of the API. Handle error. */ 
	document.getElementById("info").innerHTML = "Your browser or device do not support WebAuthn API"
}



PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
    .then(function (userIntent) {

        // If the user has affirmed willingness to register with RP using an available platform authenticator
        if (userIntent) {
		    let challengeBytes = new Uint8Array(32);
			window.crypto.getRandomValues(challengeBytes);
            var publicKeyOptions = { /* Public key credential creation options. */
				
				 challenge: challengeBytes,

  // Relying Party:
  rp: {
    name: "ACME Corporation"
  },

  // User:
  user: {
    id: Uint8Array.from(window.atob("MIIBkzCCATigAwIBAjCCAZMwggE4oAMCAQIwggGTMII="), c=>c.charCodeAt(0)),
    name: "alex.p.mueller@example.com",
    displayName: "Alex P. Müller",
    icon: "https://pics.example.com/00/p/aBjjjpqPb.png"
  },

  // This Relying Party will accept either an ES256 or RS256 credential, but
  // prefers an ES256 credential.
  pubKeyCredParams: [
    {
      type: "public-key",
      alg: -7 // "ES256" as registered in the IANA COSE Algorithms registry
    },
    {
      type: "public-key",
      alg: -257 // Value registered by this specification for "RS256"
    }
  ],

  timeout: 60000,  // 1 minute
  excludeCredentials: [], // No exclude list of PKCredDescriptors
  extensions: {"loc": true}  // Include location information
                                           // in attestation
	
			};

			    state.createRequest = publicKeyOptions;
            // Create and register credentials.
            return navigator.credentials.create({ "publicKey": publicKeyOptions });
        } else {

            // Record that the user does not intend to use a platform authenticator
            // and default the user to a password-based flow in the future.
			console.log("No consent from user");
			document.getElementById("info2").innerHTML="You refused to use an authenticator";
        }

    }).then(function (newCredentialInfo) {
	      state.createResponse = newCredentialInfo;
        // Send new credential info to server for verification and registration.
		 /*  .then(function (aNewCredentialInfo) {
      state.createResponse = aNewCredentialInfo

     let buffer = getArrayBuffer("createOut", aNewCredentialInfo.response.attestationObject);

      return webAuthnDecodeCBORAttestation(buffer);
    })
    .then(function (aAttestation) {
      // Make sure the RP ID hash matches what we calculate.
      return crypto.subtle.digest("SHA-256", string2buffer(rpid))
      .then(function(calculatedHash) {
           //"Calculated RP ID hash must match what the browser derived.");
        return Promise.resolve(aAttestation);
      });
    })
    .then(async function (aAttestation) {
      let flags = new Uint8Array(aAttestation.flags);
	  state.keyHandle = state.createResponse.rawId;

      state.publicKey = aAttestation.publicKeyHandle;
      //document.getElementById("done").value="true";
	console.log($("#done").val());
      $("#done").val() = "true";
     
      let clientData = JSON.parse(buffer2string(state.createResponse.response.clientDataJSON));
    }).then(function (){
      append("createOut", JSON.stringify(createRequest, null, 2) + "\n\n");
    }).catch(function (aErr) {
      if ("name" in aErr && (aErr.name == "AbortError" || aErr.name == "NS_ERROR_ABORT")) {
        gResults.reset();
      } else {
        gResults.fail();
      }
    }).then(function (){
      resultColor("createOut");
    });*/
    }).catch( function(err) {
        console.log("Something went wrong : ");
		console.log(err);
    });
}

function testCredential(){
		    let challengeBytes = new Uint8Array(32);
			window.crypto.getRandomValues(challengeBytes);
var publicKey = {
  // The challenge must be produced by the server, see the Security Considerations
  challenge: challengeBytes,

  // Relying Party:
  rp: {
    name: "ACME Corporation"
  },

  // User:
  user: {
    id: Uint8Array.from(window.atob("MIIBkzCCATigAwIBAjCCAZMwggE4oAMCAQIwggGTMII="), c=>c.charCodeAt(0)),
    name: "alex.p.mueller@example.com",
    displayName: "Alex P. Müller",
    icon: "https://pics.example.com/00/p/aBjjjpqPb.png"
  },

  // This Relying Party will accept either an ES256 or RS256 credential, but
  // prefers an ES256 credential.
  pubKeyCredParams: [
    {
      type: "public-key",
      alg: -7 // "ES256" as registered in the IANA COSE Algorithms registry
    },
    {
      type: "public-key",
      alg: -257 // Value registered by this specification for "RS256"
    }
  ],

  timeout: 60000,  // 1 minute
  excludeCredentials: [], // No exclude list of PKCredDescriptors
  extensions: {"loc": true}  // Include location information
                                           // in attestation
};

// Note: The following call will cause the authenticator to display UI.
navigator.credentials.create({ publicKey })
  .then(function (newCredentialInfo) {
    // Send new credential info to server for verification and registration.
				document.getElementById("info2").innerHTML="Credential created";
				console.log("Credential created");
  }).catch(function (err) {
    // No acceptable authenticator or user refused consent. Handle appropriately.
          console.log("Something went wrong : ");
		console.log(err);
  });
}