# React 19 Notes — `ref`, `forwardRef`, and `useId()`

## 1. `ref` in React

A `ref` is used to directly access a DOM element or keep a mutable value that does **not** cause a re-render when changed.

For DOM elements, refs are commonly used for:

* Focusing an input
* Selecting text
* Measuring an element
* Scrolling to an element
* Accessing DOM APIs

The most common hook for creating a ref is:

```jsx
useRef()
```

---

## 2. Basic `useRef()` Example

```jsx
import { useRef } from "react";

export default function App() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input
        ref={inputRef}
        placeholder="Enter your name"
      />

      <button onClick={handleFocus}>
        Focus Input
      </button>
    </div>
  );
}
```

### How it works

```jsx
const inputRef = useRef(null);
```

Initially:

```text
inputRef.current === null
```

After React renders the input:

```jsx
<input ref={inputRef} />
```

React sets:

```text
inputRef.current = input DOM element
```

So:

```jsx
inputRef.current.focus();
```

calls the browser's `focus()` method on the actual input.

---

# 3. What is `ref`?

`ref` is a special React attribute used to get a reference to an element or component.

Example:

```jsx
<input ref={inputRef} />
```

Unlike normal props, `ref` historically had special handling in React.

Important idea:

```text
props        → data passed to a component
ref          → reference to a DOM node / ref target
```

Example:

```jsx
<Button className="primary" />
```

`className` is a normal prop.

```jsx
<Button ref={buttonRef} />
```

`ref` is a ref.

---

# 4. `useRef()` vs `ref`

These are related but different concepts.

### `useRef()`

Creates a ref object:

```jsx
const inputRef = useRef(null);
```

Result:

```jsx
{
  current: null
}
```

### `ref`

Attaches that ref to an element:

```jsx
<input ref={inputRef} />
```

So:

```text
useRef()       → creates the ref
ref={...}      → attaches the ref
```

---

# 5. Important Property: `.current`

A ref object has a `.current` property.

```jsx
const inputRef = useRef(null);
```

Before mounting:

```text
inputRef.current → null
```

After mounting:

```text
inputRef.current → <input DOM element>
```

Example:

```jsx
inputRef.current.focus();
```

Another example:

```jsx
console.log(inputRef.current);
```

This can print the actual DOM element.

---

# 6. Ref Does NOT Trigger Re-render

Changing a ref does not cause React to re-render the component.

Example:

```jsx
const countRef = useRef(0);

countRef.current = countRef.current + 1;
```

React does not re-render because `.current` changed.

Compare this with:

```jsx
const [count, setCount] = useState(0);
```

Calling:

```jsx
setCount(count + 1);
```

causes a re-render.

### Interview point

> `useRef` stores a mutable value that persists between renders without causing a re-render when `.current` changes.

---

# 7. `forwardRef()`

`forwardRef` allows a parent component to pass a ref through a custom component to a child DOM element.

Imagine:

```jsx
<Input ref={inputRef} />
```

Inside `Input`, we want:

```jsx
<input ref={inputRef} />
```

The problem is that `ref` has special behavior.

`forwardRef` was traditionally used to explicitly forward the ref.

---

# 8. Basic `forwardRef()` Example

```jsx
import { forwardRef, useRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
    />
  );
});

export default function App() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <Input
        ref={inputRef}
        placeholder="Enter your name"
      />

      <button onClick={handleFocus}>
        Focus Input
      </button>
    </div>
  );
}
```

### Flow

```text
App
 │
 │ ref={inputRef}
 ▼
Input component
 │
 │ ref={ref}
 ▼
<input>
```

The parent gets access to the real DOM input.

---

# 9. Why `forwardRef()` Was Needed

Without forwarding the ref:

```jsx
function Input(props) {
  return <input {...props} />;
}
```

Doing this:

```jsx
<Input ref={inputRef} />
```

did not traditionally pass the ref to the inner `<input>`.

You needed:

```jsx
const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});
```

---

# 10. React 19 Change: `ref` as a Prop

## Important React 19 change

In React 19, function components can receive `ref` as a normal prop.

This means many components no longer need `forwardRef()` just to expose a DOM ref.

### React 19 style

```jsx
function Input({ ref, ...props }) {
  return (
    <input
      ref={ref}
      {...props}
    />
  );
}

export default Input;
```

Parent:

```jsx
import { useRef } from "react";
import Input from "./Input";

export default function App() {
  const inputRef = useRef(null);

  return (
    <Input
      ref={inputRef}
      placeholder="Enter your name"
    />
  );
}
```

The ref can now be received directly as a prop.

---

# 11. React 18 vs React 19

## React 18 style

```jsx
import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

export default Input;
```

## React 19 style

```jsx
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

export default Input;
```

### Main idea

```text
React 18
    ↓
forwardRef() commonly required

React 19
    ↓
ref can be passed as a prop
```

---

# 12. Should I still use `forwardRef()` in React 19?

For new React 19 code, you generally do not need `forwardRef()` just to pass a ref through a function component.

Prefer:

```jsx
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

However, you may still encounter `forwardRef()` in:

* Older React projects
* Existing component libraries
* Third-party packages
* Code written for React versions before 19

So you should understand both.

---

# 13. Reusable Input — React 19 Style

A reusable input can now be written like this:

```jsx
export default function Input({
  label,
  error,
  ref,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-sm font-medium">
          {label}
        </label>
      )}

      <input
        ref={ref}
        className={`
          w-full rounded-lg border px-4 py-2.5
          border-gray-300
          focus:outline-none focus:ring-2
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
```

Usage:

```jsx
import { useRef } from "react";
import Input from "./Input";

export default function App() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <Input
        ref={inputRef}
        label="Username"
        placeholder="Enter username"
      />

      <button onClick={handleFocus}>
        Focus Input
      </button>
    </div>
  );
}
```

---

# 14. `useId()`

`useId()` is a React hook used to generate unique IDs that can safely connect related elements.

Import:

```jsx
import { useId } from "react";
```

Example:

```jsx
const id = useId();
```

React generates a unique ID.

---

# 15. Why do we need `useId()`?

A common use case is connecting a `<label>` with an `<input>`.

Example:

```jsx
<label htmlFor="email">
  Email
</label>

<input id="email" />
```

The problem appears when you create a reusable component many times.

Imagine:

```jsx
<Input label="Email" />
<Input label="Username" />
<Input label="Password" />
```

You don't want to manually manage unique IDs.

`useId()` solves this.

---

# 16. Basic `useId()` Example

```jsx
import { useId } from "react";

export default function Input() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>
        Email
      </label>

      <input
        id={id}
        type="email"
      />
    </div>
  );
}
```

Now the label is associated with the correct input.

---

# 17. `useId()` with Reusable Input

```jsx
import { useId } from "react";

export default function Input({
  label,
  ...props
}) {
  const generatedId = useId();

  return (
    <div>
      {label && (
        <label htmlFor={generatedId}>
          {label}
        </label>
      )}

      <input
        id={generatedId}
        {...props}
      />
    </div>
  );
}
```

Usage:

```jsx
<Input label="Email" />
<Input label="Username" />
<Input label="Password" />
```

Each instance gets a unique React-generated ID.

---

# 18. Allowing a Custom ID

In a reusable component, it is often useful to allow the developer to provide an ID.

```jsx
import { useId } from "react";

export default function Input({
  label,
  id,
  ...props
}) {
  const generatedId = useId();

  const inputId = id || generatedId;

  return (
    <div>
      {label && (
        <label htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        {...props}
      />
    </div>
  );
}
```

Now both work.

### Automatic ID

```jsx
<Input label="Email" />
```

### Custom ID

```jsx
<Input
  id="email-input"
  label="Email"
/>
```

---

# 19. `useId()` for Accessibility

`useId()` is especially useful when multiple elements need to be connected.

For example:

```jsx
const id = useId();
```

Then:

```jsx
<label htmlFor={id}>
  Email
</label>

<input
  id={id}
/>
```

Or:

```jsx
<input
  aria-describedby={`${id}-hint`}
/>

<p id={`${id}-hint`}>
  Enter your work email.
</p>
```

This creates a relationship between the input and supporting text.

---

# 20. `useId()` and Error Messages

A reusable input can combine `useId()` with error handling:

```jsx
import { useId } from "react";

export default function Input({
  label,
  error,
  id,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div>
      {label && (
        <label htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : undefined
        }
        {...props}
      />

      {error && (
        <p id={`${inputId}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
```

This gives us:

```text
label
  ↓
input
  ↓
error message
```

All are connected with IDs.

---

# 21. Important Difference: `useId()` vs `useRef()`

These hooks solve different problems.

## `useRef()`

Used for:

* Accessing DOM nodes
* Storing mutable values
* Keeping values between renders

Example:

```jsx
const inputRef = useRef(null);

inputRef.current.focus();
```

## `useId()`

Used for:

* Generating unique IDs
* Connecting labels and inputs
* Accessibility relationships

Example:

```jsx
const id = useId();

<label htmlFor={id}>
<input id={id} />
```

### Easy way to remember

```text
useRef() → "Give me the element/value."

useId()  → "Give me a unique ID."
```

---

# 22. Don't Use `useId()` for List Keys

Avoid this:

```jsx
const id = useId();

items.map(() => (
  <div key={id}>
    ...
  </div>
));
```

`useId()` is not intended to generate list keys.

For list keys, use stable data from your dataset:

```jsx
items.map((item) => (
  <div key={item.id}>
    {item.name}
  </div>
));
```

### Interview point

> `useId()` is for accessibility-related IDs and other stable identifier relationships, not for list keys.

---

# 23. Don't Use `useId()` as Random ID Generator

Avoid thinking of `useId()` as a general-purpose random ID generator.

It is designed primarily for React's rendering and accessibility use cases.

Good:

```jsx
const id = useId();

<label htmlFor={id} />
<input id={id} />
```

Not ideal:

```jsx
const id = useId();

// Pretending this is a random backend ID
```

---

# 24. `ref` vs `useRef()`

This is a common interview question.

### `ref`

```jsx
<input ref={inputRef} />
```

This attaches a reference.

### `useRef()`

```jsx
const inputRef = useRef(null);
```

This creates the ref object.

So:

```text
useRef() → creates
ref      → attaches
```

---

# 25. `forwardRef()` vs `useRef()`

Another common interview question.

### `useRef()`

Creates and stores a ref:

```jsx
const inputRef = useRef(null);
```

### `forwardRef()`

Traditionally lets a ref pass through a component:

```jsx
const Input = forwardRef((props, ref) => {
  return <input ref={ref} />;
});
```

React 19 changed this pattern because `ref` can now be received as a prop by function components.

---

# 26. Practical React 19 Example

## Parent

```jsx
import { useRef } from "react";
import Input from "./Input";

export default function App() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <Input
        ref={inputRef}
        label="Username"
        placeholder="Enter username"
      />

      <button onClick={handleFocus}>
        Focus
      </button>
    </div>
  );
}
```

## Input.jsx

```jsx
import { useId } from "react";

export default function Input({
  label,
  error,
  id,
  ref,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div>
      {label && (
        <label htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : undefined
        }
        {...props}
      />

      {error && (
        <p id={`${inputId}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
```

---

# 27. Interview Questions

## Beginner

### Q1. What is a ref in React?

A ref is a way to access a DOM element or store a mutable value that persists between renders without causing a re-render when changed.

---

### Q2. What is `useRef()`?

`useRef()` is a React hook that returns a mutable object with a `.current` property.

```jsx
const ref = useRef(null);
```

---

### Q3. Does changing `ref.current` cause a re-render?

No.

```jsx
ref.current = 100;
```

Changing `.current` does not trigger a React render.

---

### Q4. What is `forwardRef()`?

Traditionally, `forwardRef()` allows a parent to pass a ref through a function component to a child DOM element.

Example:

```jsx
const Input = forwardRef((props, ref) => {
  return <input ref={ref} />;
});
```

---

### Q5. What changed with refs in React 19?

React 19 allows function components to receive `ref` as a prop, so `forwardRef()` is no longer required simply to forward a ref through a function component.

Example:

```jsx
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

---

### Q6. What is `useId()`?

`useId()` generates a unique ID that can be used to connect related elements, especially for accessibility.

Example:

```jsx
const id = useId();

<label htmlFor={id}>Email</label>
<input id={id} />
```

---

## Intermediate

### Q7. Why should `useId()` be used with `htmlFor` and `id`?

It ensures that each reusable component instance gets a unique identifier, preventing duplicate IDs when multiple instances are rendered.

---

### Q8. Can `useId()` be used for list keys?

No.

Use stable IDs from your data:

```jsx
items.map(item => (
  <div key={item.id}>
    {item.name}
  </div>
));
```

---

### Q9. What is the difference between `useRef()` and `useState()`?

`useState()` stores state and causes a re-render when updated.

`useRef()` stores a mutable value that persists between renders without causing a re-render when `.current` changes.

```text
useState → update → re-render

useRef   → update .current → no re-render
```

---

### Q10. What is the difference between `useRef()` and `useId()`?

```text
useRef()
→ access DOM nodes
→ store mutable values

useId()
→ generate unique IDs
→ connect elements for accessibility
```

---

### Q11. Why do we use `...props` with a reusable Input?

It allows normal input attributes to pass through the reusable component.

```jsx
<Input
  type="email"
  name="email"
  placeholder="Enter email"
  required
/>
```

The props can reach:

```jsx
<input {...props} />
```

---

### Q12. Why is `displayName` sometimes added to `forwardRef()` components?

Example:

```jsx
const Input = forwardRef((props, ref) => {
  return <input ref={ref} />;
});

Input.displayName = "Input";
```

It can make the component name clearer in React DevTools and debugging.

---

# 28. Advanced Interview Questions

### Q13. Why shouldn't refs be used for normal application state?

Refs do not trigger re-renders.

If the UI needs to update when a value changes, use state:

```jsx
const [count, setCount] = useState(0);
```

Use refs for imperative operations or values that should persist without causing rendering.

---

### Q14. Is `ref` a normal prop?

Historically, `ref` received special handling.

In React 19, function components can receive `ref` as a prop, making ref forwarding simpler.

---

### Q15. What is an imperative operation?

An imperative operation tells the DOM exactly what to do.

Examples:

```jsx
inputRef.current.focus();

elementRef.current.scrollIntoView();
```

Refs are useful for these kinds of operations.

---

### Q16. Why is `useId()` useful for server rendering?

`useId()` generates IDs in a way that is designed to remain consistent across React's server and client rendering model.

This helps prevent hydration issues when IDs are generated for accessibility relationships.

---

# 29. Quick Comparison

| Feature                    | `useRef()` | `forwardRef()`                       | `useId()` |
| -------------------------- | ---------- | ------------------------------------ | --------- |
| Creates ref object         | ✅          | ❌                                    | ❌         |
| Access DOM element         | ✅          | Used for forwarding                  | ❌         |
| Pass ref through component | ❌          | ✅ Traditionally                      | ❌         |
| Generates unique ID        | ❌          | ❌                                    | ✅         |
| Causes re-render           | ❌          | ❌                                    | ❌         |
| Accessibility use case     | Sometimes  | Sometimes                            | ✅         |
| React 19 relevance         | ✅          | Less necessary for simple forwarding | ✅         |

---

# 30. Cheat Sheet

```jsx
// Create a ref
const inputRef = useRef(null);

// Attach a ref
<input ref={inputRef} />

// Use the DOM element
inputRef.current.focus();
```

### React 19 ref

```jsx
function Input({ ref, ...props }) {
  return (
    <input
      ref={ref}
      {...props}
    />
  );
}
```

### `forwardRef()` — older/common pattern

```jsx
const Input = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
    />
  );
});
```

### Generate an ID

```jsx
const id = useId();
```

### Connect label and input

```jsx
<label htmlFor={id}>
  Email
</label>

<input id={id} />
```

### Connect error message

```jsx
<input
  aria-describedby={`${id}-error`}
/>

<p id={`${id}-error`}>
  Invalid email
</p>
```

---

# 31. One-Line Interview Answers

### `useRef()`

> `useRef` returns a mutable object whose `.current` value persists across renders without causing a re-render when changed.

### `ref`

> A ref provides access to a DOM node or another ref target.

### `forwardRef()`

> Traditionally, `forwardRef` lets a parent pass a ref through a function component to a child DOM element.

### React 19 refs

> In React 19, function components can receive `ref` as a prop, so `forwardRef` is no longer needed just to forward refs through function components.

### `useId()`

> `useId` generates unique IDs that are especially useful for connecting related elements such as labels, inputs, hints, and error messages.

---

# 32. Remember This

```text
useRef()
   ↓
creates a ref object
   ↓
ref={ref}
   ↓
attaches it to an element
   ↓
ref.current
   ↓
access DOM / mutable value
```

```text
useId()
   ↓
unique ID
   ↓
<label htmlFor={id}>
<input id={id}>
   ↓
accessible relationship
```

```text
React 19
   ↓
ref can be received as a prop
   ↓
forwardRef() is no longer required
just for simple ref forwarding
```
