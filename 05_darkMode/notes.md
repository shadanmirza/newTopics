React Dark Mode Button — Notes

Complete Code

const DarkButton = () => {

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="bg-gray-500 px-3 py-1 border-2 border-black rounded-2xl text-amber-200"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkButton;

1. Component Declaration

const DarkButton = () => {

Creates a React functional component named DarkButton.

The component will return a button.

2. useState

const [darkMode, setDarkMode] = useState(
  () => localStorage.getItem("theme") === "dark"
);

useState() gives the component a piece of state.

There are two important values:

darkMode
    ↓
current state value

setDarkMode
    ↓
function used to change the state

Example:

darkMode = true

means dark mode is active.

To change it:

setDarkMode(false)

3. localStorage

localStorage.getItem("theme")

Reads the value stored in the browser under the key "theme".

For example, if we previously did:

localStorage.setItem("theme", "dark");

then:

localStorage.getItem("theme")

returns:

"dark"

4. Checking for Dark Theme

localStorage.getItem("theme") === "dark"

Checks whether the saved theme is "dark".

Examples:

"dark" === "dark"   // true
"light" === "dark"  // false
null === "dark"     // false

So the initial darkMode value becomes:

"dark"  → true
"light" → false
null    → false

5. Why () => is Used

useState(() => localStorage.getItem("theme") === "dark")

The function is a lazy initializer.

It tells React how to calculate the initial state.

Conceptually:

useState(checkTheme())

becomes:

useState(() => checkTheme())

This is useful when calculating the initial state from something such as localStorage.

6. useEffect

useEffect(() => {

useEffect is used for side effects.

In this component, the side effects are:

1. Add/remove the "dark" class from <html>
2. Save the selected theme in localStorage

7. document.documentElement

const root = document.documentElement;

document.documentElement refers to the <html> element.

For example:

<html>
  <head></head>
  <body></body>
</html>

So:

const root = document.documentElement;

means:

root
  ↓
<html>

8. if (darkMode)

if (darkMode) {

Checks whether darkMode is true.

If true, the dark-mode code runs.

If false, the else block runs.

9. Adding the Dark Class

root.classList.add("dark");

Adds the class "dark" to the <html> element.

Before:

<html>

After:

<html class="dark">

Tailwind dark-mode styles can then become active.

For example:

<div className="bg-white dark:bg-black">

In dark mode, dark:bg-black can apply.

10. Saving Dark Theme

localStorage.setItem("theme", "dark");

Stores:

theme = dark

in the browser.

This allows the app to remember the user's choice after a refresh.

11. else

} else {

Runs when:

darkMode === false

This means light mode should be active.

12. Removing the Dark Class

root.classList.remove("dark");

Removes the "dark" class from <html>.

Before:

<html class="dark">

After:

<html>

This stops the Tailwind dark-mode styles from applying.

13. Saving Light Theme

localStorage.setItem("theme", "light");

Stores:

theme = light

in the browser.

14. useEffect Dependency Array

}, [darkMode]);

This tells React:

Run this effect whenever darkMode changes.

Example:

darkMode = false
      ↓
user clicks button
      ↓
darkMode = true
      ↓
useEffect runs
      ↓
add "dark" class

Then:

darkMode = true
      ↓
user clicks button
      ↓
darkMode = false
      ↓
useEffect runs
      ↓
remove "dark" class

15. return

return (

The component returns JSX that React will render on the page.

Here, it returns a <button>.

16. Button

<button

Creates an HTML button element.

17. onClick

onClick={() => setDarkMode((prev) => !prev)}

Runs the function when the user clicks the button.

18. Outer Arrow Function

() =>

This function is passed to onClick.

So:

onClick={() => ...}

means:

When the button is clicked, run this code.

19. setDarkMode

setDarkMode(...)

Changes the darkMode state.

Remember:

const [darkMode, setDarkMode] = useState(...)

setDarkMode is the state setter.

20. Previous State (prev)

setDarkMode((prev) => !prev)

prev represents the previous/current value of darkMode.

If:

prev = true

then:

!prev

becomes:

!true

which is:

false

If:

prev = false

then:

!prev

becomes:

true

So this creates a toggle:

false → true
true  → false

This is a good pattern when the new state depends on the previous state.

21. Why Toggle with !prev?

setDarkMode((prev) => !prev)

The ! operator means NOT.

Therefore:

!true  → false
!false → true

So every click switches the mode.

22. className

className="bg-gray-500 px-3 py-1 border-2 border-black rounded-2xl text-amber-200"

These are Tailwind CSS utility classes.

bg-gray-500

Sets the button background to a gray color.

px-3

Adds horizontal padding.

padding-left
padding-right

py-1

Adds vertical padding.

padding-top
padding-bottom

border-2

Sets the border width.

border-black

Makes the border black.

rounded-2xl

Makes the corners highly rounded.

text-amber-200

Sets the text color to an amber/yellow shade.

23. Ternary Operator

{darkMode ? "Light Mode" : "Dark Mode"}

This is a ternary expression.

General syntax:

condition ? valueIfTrue : valueIfFalse

Here:

darkMode ? "Light Mode" : "Dark Mode"

means:

darkMode = true
    ↓
"Light Mode"

darkMode = false
    ↓
"Dark Mode"

Why?

When dark mode is currently active, the button offers the action:

Light Mode

When light mode is active, the button offers:

Dark Mode

24. Closing Button

</button>

Closes the button element.

25. Closing Component

}

Closes the DarkButton function.

26. Export

export default DarkButton

Exports the component so it can be imported into another file.

Example:

import DarkButton from "./components/DarkButton";

Then:

<DarkButton />

can be used.

Complete Dark Mode Flow

When the app starts

localStorage.getItem("theme")
                ↓
       ┌────────┴────────┐
       ↓                 ↓
    "dark"            "light"
       ↓                 ↓
darkMode = true    darkMode = false
       ↓                 ↓
add "dark"         remove "dark"
class from         class from
<html>             <html>

When the User Clicks the Button

User clicks button
        ↓
onClick runs
        ↓
setDarkMode(prev => !prev)
        ↓
true ↔ false
        ↓
React updates darkMode
        ↓
useEffect runs
        ↓
Add/remove "dark" class
        ↓
Save theme in localStorage
        ↓
Button text updates

Example: Switching to Dark Mode

Initial state:

darkMode = false

Button:

Dark Mode

User clicks:

Dark Mode
    ↓
setDarkMode(prev => !prev)
    ↓
false → true
    ↓
useEffect runs
    ↓
<html class="dark">
    ↓
localStorage = "dark"
    ↓
button text = "Light Mode"

Example: Switching Back to Light Mode

Initial state:

darkMode = true

Button:

Light Mode

User clicks:

Light Mode
    ↓
setDarkMode(prev => !prev)
    ↓
true → false
    ↓
useEffect runs
    ↓
remove "dark" from <html>
    ↓
localStorage = "light"
    ↓
button text = "Dark Mode"

Important React Concepts Used

This component teaches these concepts:

1. useState
2. useEffect
3. localStorage
4. DOM manipulation
5. Event handling (onClick)
6. Functional state updates
7. Arrow functions
8. Ternary operator
9. Tailwind CSS
10. Export / import

Important Note About the Screenshot

The screenshot appears to show small square/special characters before some Tailwind classes, such as:

className="□bg-gray-500 □px-3 □py-1 ..."

Those characters should not be there.

The className should be:

className="bg-gray-500 px-3 py-1 border-2 border-black rounded-2xl text-amber-200"

Quick Revision

State

const [darkMode, setDarkMode] = useState(false);

Stores whether dark mode is on/off.

Toggle

setDarkMode((prev) => !prev);

Switches:

true ↔ false

Add dark class

root.classList.add("dark");

Remove dark class

root.classList.remove("dark");

Save preference

localStorage.setItem("theme", "dark");
localStorage.setItem("theme", "light");

Read preference

localStorage.getItem("theme");

Conditional button text

{darkMode ? "Light Mode" : "Dark Mode"}

Mental Model

Remember this simple pattern:

localStorage
     ↓
initial darkMode
     ↓
user clicks
     ↓
setDarkMode()
     ↓
darkMode changes
     ↓
useEffect()
     ↓
<html class="dark"> OR <html>
     ↓
Tailwind dark styles change

That is the complete idea behind this dark-mode button.