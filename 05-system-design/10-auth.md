# Auth

Authentication is how you are (a passport) authorisation is what you can do (a Visa to stay in the country). Usually authN precedes authZ. At the end of an authentication flow the application will have a user object with information like name and email. At the end of an authorisation flow they will have a permission object with a role like admin.

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

Broken access control is one of the top 10 web application security risks.
Typically in a web application you want to centralise rules around authorisation.
The permission rules are called a policy.
There are different ways rules can be set up, e.g. RBAC, ABAC.

There are two main approaches to authorisation enforcement, BE and FE.
A good and secure experience provides user with both:

- Backend enforcement as your security foundation
- Frontend toggling for improved user experience

Regardless of what happens on the front end, the backend serves as the ultimate gatekeeper and therefore permissions need to be enforced at the API level, rejecting unauthorised requests.
On the frontend UI elements that the user doesn't have permission to use can be removed.

## Role-based access control (RBAC)

Typically where you would start, by setting up roles, e.g. viewer, editor, admin.
Predefined roles (admin, editor, viewer) are allowed a set of actions (view, create, delete) on some resources (posts).
The combination of role + action + resource is a policy.

This can be encoded in JavaScript as `action : resource` as follows (the policies can be structured to whatever makes the lookpu fastest):

```js
const POLICIES = {
    viewer: ["view:post"],
    editor: ["view:post", "create:post", "edit:post"],
    admin: ["view:post", "create:post", "edit:post", "delete:post"]
}
```

Then typically you want to take a helper function that takes the role, action and resource and checks if the role has permission to take that action on that object, e.g. `const isAllowedX = await permit.check(user.email, "update", "post")`.
On a page or component level the permissions can be checked in this way.
Instead of rolling your own permissions in the code, software tools exist to help manage policy, e.g. permit.io.
The policies are defined in the permit.io UI, and permit provides an SDK for application integration, and then the users need to be synchronised with permit so it knows who has permission to what.
In the appliction the SDK is instantiated with a token and then the instance is passed around.
For the infrastructure to not incur latency the goal would be to run the authorisation service in a pod with the rest of the application.

## Attribute-based access control (ABAC)

Organisations typically start with RBAC then graduate to ABAC for more fine-grained control.
With ABAC the idea is that a permission can be decomposed into different "attributes" or qualifiers, e.g. senior/junior, draft/publication/archived, monday/weekday.
In permit.io, ABAC options can be defined for a resource, e.g. a status option (draft/publication/archived).
Then from the frontend the same permission can be checked, additionally passing in the attributes to verify, e.g. `const isAllowedX = await permit.check(user.email, "update", "post", { status: "archived" })`.

## Relationship-based access control ReBAC

When you want to grant permissions hierarchically.
In any relationship based acces control system you start from the resource and move toward the subject.

## Fine-grained authorization (FGA)

FGA allows you to define permissions directly on resources.

> Compared to ABAC, FGA is more flexible and easier to manage. ABAC relies on attributes to define access control policies, which can become cumbersome to handle as the number of attributes grows.

> FGA is particularly powerful when dealing with dynamic or hierarchical permissions. For example, in a multi-tenant application, you might need to define permissions that vary not only by user but also by the organization they belong to, the specific project they’re working on, or even the status of the data they’re accessing. SpiceDB’s support for FGA allows you to model these complex scenarios with ease.

### SpiceDB

In SpiceDB, authorization is modeled using three core concepts: objects, relationships, and permissions.
Together, they define who can do what within your application.

- objects: Objects represent the resources that need to be protected. An object can be anything from a user, document, or project.
- relationships: Relationships define how objects are associated. Often the indicate ownership or membersip type relationships and are used to determine access rights
- permisssions: Permissions are the actions that can be performed on ojects based on the relationships.

With the schema defined, next is the creation of specific relationship instances. For example for schema,

```
definition user {}

definition task {
  relation owner: user
  relation editor: user
  relation viewer: user

  permission view = viewer + editor + owner
  permission edit = editor + owner
  permission delete = owner
}
```

A relationship instance, `relationship create task:task-001 owner user:user-001` can be defined.

Contexts in SpiceDB are used to manage connections to different servers. In this case, a context named local (an arbitrary name) is being set up to point to the local server.

## References

- [Handle Permissions Like A Pro - Every Developer Should Know This](https://www.youtube.com/watch?v=wnSArmbI6qw)
- [SpiceDB in Action](https://brunokrebs.com/2024-08-31-spicedb-in-action/)
- [https://www.permit.io/blog/implementing-react-rbac-authorization](https://www.permit.io/blog/implementing-react-rbac-authorization)
- [The Complete Guide to Fine-Grain Authorization with SpiceDB: Part 1](https://www.youtube.com/watch?v=AoK0LrkGFDY)