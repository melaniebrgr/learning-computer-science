# Auth

Authnetication is how you are (a passport) authorisation is what you can do (a Visa to stay in the country). 

# Authentication

Authentication is the way an entity verifies someone is who they say they are. Authorization, then, allows access to an asset once a person’s identity has been verified. To authenticate a combination of three factors can be used: something the person knows, something the person has, something the person is.

- knows: password, PIN
- owns: yubikey, Google authenticator
- is: biometrics

Authentication started in the 1960’s with the first passwords in databases, which were then hashed, then encrypted. The RSA public-key cryptography system was invented in the 1970's. Catpcha's and SSL was invented in 1995 and replaced with TLS for secure server communication. In 1997 the first password manager was invented as more services required more and different passwords, as well as SSO so a single authentication source could be used for multiple services. MFA began in 2000 but took about 10 years to reach the consumer market. Biometrics as an authentication method became available in 2010. The W3C rolled out the Web Authenticaiton standard API in 2016.

Today there is an abundance of auth: MFA, password managers, SSO, Passkeys, etc.

- M/2FA: An extra verification step added on top of a (usually) password‑based login. Exactly two independent authentication methods are required to login, e.g. a password, SMS code, biometric, hardward key.
- Passkey: A passwordless primary login method based on public‑key cryptography. A credential is stored on a device and unlocked with biometrics of a PIN/fingerprint/face. Passkeys are multi‑factor by design (device + biometric/PIN). A Trusted Platform Module (TPM) is a hardware that can store and use the cryptographic keys that passkeys rely on. 

# Authorisation


