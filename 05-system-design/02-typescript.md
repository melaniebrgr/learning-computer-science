# TypeScript

TypeScript (TS) is an open source project maintained by Microsoft. TypeScript is a syntactic superset of JS that adds types to the language. It can be gradually added the a codebase and turned off at any time. JS is duck typed and TS is structural typed: the only thing that matters is the shape of the interface. The type of a variable can be thought of as a “set of possible values” or the domain of the type, e.g. a type of “number” is a set of all possible number values.

The largest set of types is “any” which is infinite, the smallest set is “never”. The next smallest are literal types. To understand TS you need to understand and think in terms of sets. When you see errors about types not being assignable, think: it is not possible for this type to be in the set of this other type.

Reasons for adopting TS in a project are to document the of intent in the code, uncover some kinds of errors at compile time, and provide a better developer experience with type hinting. Reasons for adopting TypeScript in a library are a different: API documentation, user code correctness (enforce usage patterns), library code correctness, and maintainability. Application types tend to be, or should be, fairly simple. There are not many generics. Library types are generally more complicated since they need to handle many more use cases.

## TS in Libraries

Why expose types from libraries? “Truth” It provides users with another way of understanding the library besides reading the source code and helps enforce correct usage.

The best way a library can provide types is if it is written in TS. Community written types like DefinitelyTyped is a good fallback, but can have cases where the library and library types can differ.

When setting up a TS library it is important to set up build infrastructure: compilation, transformation to JS, exporting types for usage, and tests written in TS, which helps catch bugs. Types are include in public package with types key. You’ll want to verify types in a test project (a tool call “yalk”, can help).

### versioning

TS library versioning also have additional nuances that need to be considered, upgrading types in a package can represent a “breaking change” in user packages if creates TS errors. Consider Types as APIs that also needs to be considered in versioning. Non-breaking changes widen what’s accepted and narrow what’s provided, i.e. no new red squiggles. SemVer version based on intent, e.g. it’s a bug fix that introduces a red squiggly.

In terms of library TS version support, one approach is a rolling window: support new version immediately, and deprecate old TS support eventually, e.g. last 2-4 versions. Requires setting up CI to test against multiple TS versions. Multiply type exports are also support with the typesVersion filed in package.json, but it is a fallback. Share a clear versioning policy for your library and document which version are supported, e.g. last two decimal versions.

### testing

Types are code and will have bugs. Support user reporting TS bugs (note however that users who off strict false or strict null can create big differences). Exposed types should be tested, see redux libs for examples of “expect type” assertions, and see testing libraries like `expect-type` and `tsd`.

## TS in Projects

A TS project has three things:

1. typescript installed and build script configured,
2. a TS config defining the files to compile and the compile target and where to put the output, and
3. the source code itself.
When the TS compiler runs it creates a JS version of the file with the types stripped out.

A TS installation comes with two things, `tsc` typescript compiler and `tsserver` which provides language services among other things.
Only in the inferred type does not match your expectation should you add a type declaration. Knowing when TS is able to nor types is key to writing compact code. Variable names, function names, object properties, variables inside logical blocks, object keys, method names can all be inspected to find the inferred type.

## Types

### Annotations

- Are inferred based on the type of its initialiser, e.g.  `let greeting = ‘hello’` (string)
- Annotations are typically placed next to an identifier.
- Can be made on the variable name, e.g. `let greeting: string = ‘hello’`. An annotation different from the inferred type will cause a type check error
- Can be made on parameters name, e.g. `function greet(name: string) { … }`, check function usage
- Can be made for return values. An annotation different from the inferred type will cause a type check error.
- Can be made on anonymous functions (callbacks). Often inferred from context, “contextual typing”.

### Primitives

- number, string, boolean, array[]
- any: access any property off of it, without causing type check errors
- never: empty, without any value, can be used to conditionally add values to a union type for instance, e.g. `string extends string ? ‘c’ : never`

Built-ins

- PropertyKey: everything that can be a key in an object

### Objects

Setting an object property type:

- Object annotations can be anonymous (inline) or non-anonymous as a type alias or interface. Interface objects can extend other base object interfaces.
- Index signatures are useful for dictionary objects when some or none of the key names are known. A key type must be either ‘string’ or ‘number’, e.g. `[index: number]: string;`.
- For each object property, specify: type, optionality, overwritability (readonly). Marking a property as readonly does not mean other values in nested object structure cannot be overwritten.
- Index signatures can be marked as readonly as well.
- Utility modifiers Partial, Required, and Readonly modify the whole object optionality or readonly-ness
Getting an object property type: The type of a property in an an object or element in an array can be looked up with indexed access type patterns.
- `Person["age"]` // gets the type of the key
- `Person["age" | "name”]` // gets a union type of the key types
- `Key extends keyof Type` // gets a union type for key type subset`Value extends Type[keyof Type]` // gets a union type for the values subset of the keys
- `Key in keyof Type` // iterates over keys in type and assign Key as a type variable

### Arrays

Setting an array property type:

Getting an array element type: The type of a property in an an object or element in an array can be looked up with indexed access type patterns. This only works on known arrays (readonly arguments or hard-coded types, or [] as const). Note, only types can be passed in as indices.

- `typeof MyArray[number]` // gets a union type of the array values
- `Value in FullArray[number]` // iterates over an array and assigns Value as a type variable

### Functions

- type with function type expressions, e.g. `(a: string) => void`
- function type expressions can be type aliased, e.g. `type GreetFunction = (a: string) => void;`
- type with call signature object types when the function has properties
Function type signatures can look like anonymous functions but instead of values they return types, e.g. `type Predicate = (x: unknown) => boolean;`, N.B predicate means “state, affirm, or assert (something) about the subject of a sentence or an argument of a proposition.”

### Operators

- union (|): a logical “OR” union to create a set of values
- intersection (&): a logical “AND” intersection to combine set of values
- as: assert that a value is a certain type, often ignoring what TS thinks
- extends:
  - used to assign a variable type to the subset of what is being extended, i.e. T is a subject / conforms to this type.
  - used in generics to assert that a type is the same shape as another in order to constrain them.
  - used in class definitions to optionally build off of other classes
- in: used to iterates over a union of types an assign a type variable to each type in the union. Often used to create object utility types like Pick and Readonly
- infer: a way to extract a type when it is not known, e.g. `T extends maps:${infer U} ? U : T`. The infer keyword can only be used with the conditional part of a conditional expression.

#### Type queries

Getting types from real values

- keyof: used to produce a union of the type of object keys. It’s analogous to calling, `Object.keys(object)`. To create a union of object values, `T[keyof T]`
- typeof: gets the type of a variable or property

### Conditionals

Take the form of ternaries, example: `SomeType extends OtherType ? TrueType : FalseType;`. Extends is the only tool we currently have for expressing conditionals.

### Generics

Generic interfaces (functions)
Functions that are reusable often need to work over a variety of types. Generics are the main tool for typing reusable functions. Type variable(s) can be defined like arguments within the function definition, and used within the parameter list or function body.Generic type parameters are specified within `<T>` brackets. Generics can appear in functions, types, classes, and interfaces. Generic annotations are passed

- Immediately the left of parameter definitions, e.g. `<Type>(x: Type)`
- Immediately to the right of Interface type names, e.g. `interface GenericIdentityFn<Type> { … }`

Where the function is called, pass in the type(s) to be used. The generic function type can be extracted to an interface, which can be defined to take a generic type. When we have some knowledge of the generic type, the type can be constrained by using the extends keyword, e.g. `loggingIdentity<Type extends Lengthwise>(arg: Type): Type`. A type parameter can also be constrained by another type parameter, e.g. `<Type, Key extends keyof Type>`

### Utility

#### Modify an object

- Partial: all properties of the object passed to Partial become optional
- Required: all properties of the object passed to Required become required
- Readonly: all properties of the object passed to  Readonly cannot be reassigned (this is the inferred type of frozen objects)

#### Construct an object

- Record: creates an object type given keys (some union) and value (some interface) types. Record is really meant to be the same structure all the way through. Like `Record<string, number>` means it's an object where all keys are strings and all values are numbers. Likewise, `Record<string, { a: boolean}>` is a record where all keys are strings and all values are an object with a boolean "a".
- Pick: create an object by picking some keys given an object type (some interface) and key (some union) type
- Omit: create an object by omitting from keys given an object (some interface) and key (some union) type

#### Construct a union

- Exclude: create a union type by excluding some members of the given union type
- Extract: (similar to Pick) create a union type by picking some members of the given union type
- NonNullable: create a union by excluding null and undefined from the given union type

#### Construct a tuple

- Parameters: creates a tuple type from the arguments of a given a function
- ConstructorParameters: creates a tuple type from the arguments of a given a constructor function, e.g. Error

#### Construct anything

- ReturnType: create a type from the return type of a given function

### Patterns

#### Narrowing

Functions that need to accept an argument that is a union of different types can use narrowing to disambiguate between the union types and execute on the value correct. You can narrow with

- typeof (covers "string”, “number”, “bigint”, “boolean”, “symbol”, “undefined”, “object”, “function”)
- instanceof (for class instances, e.g. Date)
- truthiness (carefully since 0, NaN, “”, 0n (the bigint version of zero), null, undefined coerce to false)
- equality
- in operator (check if an object has a property with name)

#### Typeguard (narrowing)

A narrowing pattern is to create a typeguard that asserts the output value is of a certain type. The function body must be an if/else or a ternary. TS can assert the type predicate is true/false. Never can be a useful type to indicate when exhaustively narrowing. It will ensure a new type that is not been captured in the narrowing will return a TS error.

## Tips

- Tip #1: if you can mark a hardcoded object or array `as const` TypeScript can make inferences about the exact keys and exact size of the object or array.
- Tip #2: if you can mark a function or type parameter as a `readonly` type, TypeScript can also make inferences about the shape and size of the object or array, if they are already known when passed, i.e. objects designed `as const` or defined in the call to the function.
- Tip #3: `keyof` is equivalent to `Object.keys` but returns a type union -- `keyof { a: 1; b: 2; c: 3 }; // "a"|"b"|"c"`
- Tip #4: `in` is essentially a loop / map over a union for building objects -- `{ [key in "a"|"b"|"c"]: { a: 1; b: 2; c: 3 }[key] }`
- Tip #5: `never` means dead end; TS can stop looking in this direction, because it would be an error to get here
- Tip #6: types can have ternaries -- `T extends number ? A : B`
- Tip #7: `infer` can be used inside of the predicate of the ternary -- `T extends { a: infer X } ? X : number`
- Tip #8: types can be recursive
- Tip #9: rest and spread work for known types (or as const types).
- Tip #10: given the truths about const arrays having a known length, and recursive types, and the spread operator... you can actually make for loops in your type, by filling an array with junk over repeated calls to your type. Might come in handy for one of the easy problems. It's the less-hard solution, anyway.

## References

- <https://portal.gitnation.org/contents/lessons-from-maintaining-typescript-libraries>
- <https://www.semver-ts.org/>
- <https://portal.gitnation.org/contents/typescript-for-library-authors-harnessing-the-power-of-typescript-for-dx>
- <https://learning-oreilly-com.ezproxy.torontopubliclibrary.ca/library/view/effective-typescript>
- <https://exploringjs.com/tackling-ts/toc.html>
- <https://www.typescriptlang.org/docs/handbook/2/generics.html>
- <https://www.typescriptlang.org/docs/handbook/utility-types.html>
