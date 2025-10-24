# State Management

State is any data that can influence how something is rendered on the screen or behaves in response to user interaction. Modern web applications combine different types of state depending on where the data is coming from, and can have different solutions.

- remote or server state: The state of data fetching from an endpoint, such as no data/loading data/error happened/successfully loaded data, e.g. `react-query`
- form state: useActionState, react hook form
- sync state: Yjs / SyncedStore
- remaining application state: The state of a modal dialog's openness, such as open/closed. `useState` / `useReducer`, URL / query params, `redux`, `zustand`, `jotai`, `mobx`, `xstate`

In React the view is simply a function of the state. Consequently the same intuition of function composition exptends to components, that is components are composed together to get some UI.

Generally we start with React's built in state management hooks and elaborate it based on the appication requirements. Do you want the modal/UI to be preserved on page refresh? Put it in a URL. Are React's internal APIs and URL methods no longer scaling? Reach for a third-party library.

## Signs of scaling issues

- Nested context providers: context that change often causes re-rending issues, so you want to only use context for things that don't change often like theme, and really need to be passed down to all children
- Scattered state logic: (no central place)
- Extensize prop drilling
- State synchronisation issues.

There are two global state management paradigms: store-based or signal/atomic-based.

## Store-based

### Redux (RTK)

- First and most popular state management library.
- Extensive ecosystem
- 60k GH stars / 9M weekly downloads.

Redux has a centralized store, with predictable updates via actions and reducers. It's often criticised for requiring setup/boilerplate, but has a proven track record to scaling to large applications.

### Zustand

Fun fact: “Zustand” is named after the German word for “state” or “condition.” It comes from the same creator as Jotai, Daishi Kato.

- Hook-based approach (no context providers).
- Tiny, 1KB bundle size for small to medium apps.
- Typescript typing not ideal.
- 40k GH stars / 2M weekly downloads.

[Zustand](https://zustand-demo.pmnd.rs/), the "bear necessities" of state management. Zustand can have seperate stores per resource or a central store, strong typing and state modifers (like in redux) but has a hooks-based API. Note that the update functions are stable but the data changes up every update causing component to rerender. It is suitable for small to medium size applications. As the application scales you starte need to create and manage multiple stores.

### XState

Fun fact: "XState" is created by David Khourshid.

- State machine.
- Stronger TypeScript inference.
- API similar to Redux.
- Nice dev tools (visual editor extension for VSCode)

You tend to have more nuanced state transitions and want something to untangle and manage these. Even logged in toe logge dout flows can start to get complex though. Different actions can be tied to different transitions.

## Signal/atomic-based

### Jotai

Fun fact: “Jotai” is named after the Japanese word 状態 (jōtai), which means "state" or "condition". The creator is Daishi Kato, a Japanese developer.

- Primitive atoms for modular state.
- small size (<1KB).
- 13k GH stars / 400k weekly downloads.

Jotai come from the makers of Zustand but take a very different, "bottom up"  or atomic approach. You have atoms to hold the data, and atoms to updated the data atom. Then to use these, you need to pass them to `useAtom` and `useSetAtom` hooks. It's flexible but can create a lot on incidental complexity, making it more suitable for small to medium apps.

### Recoil

- 20k GH stars / 800k weekly downloads.

Developed by Facebook but is an officially dead project and not be compatible with newer versions of React. It straight up does not works in latest versions, use Jotai instead as its API is essentially the same.

### MobX

- Observables for reactive updates
- Object-oriented
- Excels in complex/dynamic UIs.
- 26k GH stars / 1.2M weekly downloads.

[MobX](https://mobx.js.org/README.html) is generally Class-based setup with properties and methods. In the constructor the class properties are set up to be observable (`makeAutoObservable`), then methods modify the state. The class in instatiated and the singleton. To use the state the component it needs to be wrapped in an observer function (react binding). When the observable state changes the component rerenders. No hooks necessary, but the pattern and syntax is a learning curve for most React developers.

Fun fact: The original name “MOBservable” combined “M” for member and “Observable” to emphasize that the library was about making member variables observable for reactive state management.
