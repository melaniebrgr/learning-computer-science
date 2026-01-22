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

## Fetching and caching

Within the FE application async data management layer everything is possible for caching strategies. We can consider the permissions to _never expire_ and only need to be updated when the user identity changes, or we can consider permissions _always and immediately expire_ and update them ASAP, e.g. whenever something that uses the permission in the UI updates, i.e. it's vibisibilty was toggled, or a new page that displays is was navigated to. We could also poll for them at regular intervals.

Keeping in mind permissions are:
- Read often
- Change rarely
- Security-sensitive

Client-side permissions are only for UI convenience. The backend must always enforce authorization.
So the real risk is: Showing UI incorrectly, not data leakage (if backend is correct).

What is important to align on the right performance/security tradeoff. Refetching permissions incurs a network rountrip delay on UI rendering. Permissions gate UI rendering and can be overkill if they rarely change.

### Strategy 1: staleTime: 0 (default)

Best suited for frequently updating roles and permissions that can change mid-session.
✅ Pros: Permissions are always up to date since permissions are refetched whenever a component that uses them mounts. Suitable for highly dynamic and security-critical apps.
❌ Cons: More network requests and lead to more longer load times and sluggishness. Overkill if permissions almost never change.

### Strategy 2: Short staleTime (e.g. 1–5 minutes)

Suitable for me ost SaaS apps where Permissions change occasionally, not constantly
✅ Pros: Is a balance between freshness and performance
❌ Cons: a slightly large window where permissions may be outdated

### Strategy 3: Long staleTime (e.g. 30 minutes – several hours, Infinity)

Suitable when permissions rarely change or a role changes require re-login anyway. “load once and reuse everywhere”.
✅ Pros: Minimal network traffic and fastest UI load.
❌ Cons: Permissions potentially outdated for the longest time

A common patterns

1. long staleTime + manual invalidation. Then invalidate when needed, e.g. after role change, after switching organisations, after a refresh token.

```js
useQuery({
  queryKey: ['permissions'],
  queryFn: fetchPermissions,
  staleTime: Infinity,
})

queryClient.invalidateQueries(['permissions'])
```

2. Tie permissions to auth state ensuring automatic refetch on login/logout. No permission leakage across users.

```js
queryKey: ['permissions', userId, orgId]
```

For most apps: Use a long or infinite staleTime for permissions, plus explicit invalidation when permissions can change.

Quick comparison:

- 0	❌✅ Low Highly dynamic permissions
- 5 min	⚖️⚖️	Low–Medium	Most apps
- 1 hr	✅❌	Medium	Stable permissions
- Infinity	✅✅❌❌	High*	Login-scoped permissions

## References

- [Handle Permissions Like A Pro - Every Developer Should Know This](https://www.youtube.com/watch?v=wnSArmbI6qw)
- [SpiceDB in Action](https://brunokrebs.com/2024-08-31-spicedb-in-action/)
- [https://www.permit.io/blog/implementing-react-rbac-authorization](https://www.permit.io/blog/implementing-react-rbac-authorization)
- [The Complete Guide to Fine-Grain Authorization with SpiceDB: Part 1](https://www.youtube.com/watch?v=AoK0LrkGFDY)