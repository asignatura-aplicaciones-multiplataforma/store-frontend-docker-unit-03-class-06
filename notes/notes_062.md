# Fragment
## Problem
Something happened here:

```jsx
return (
    <div>
        <Header>...</Header>
        <main>...</main>
    </div>
)

```

It looks like we have an unnecesary `<div>` here. In the final html we can see

```html
<div>
    <header></header>
    <main></main>
</div>
```

But if try to eliminate, we can see an error in jsx. That's because the return statement would then be trying to return two elements. JS allows **only one return value**.

Remember, this:
```jsx
<Header>...</Header>
```
is
```jsx
React.createElement('Header')
```
---
## Fragment Concept
You can import Fragment to solve this issue:
```jsx
React.Fragment from React

return (
    <Fragment>
        <Header>...</Header>
        <main>...</main>
    </Fragment>
)

```
and the result will be:
```jsx
<header></header>
<main></main>
```
so, no extra `<div>`, and much cleaner HTML!

## Improve
Actually, we don't even need to import Fragment, we only need a shorthand syntax:

```jsx
return (
    <>
        <Header>...</Header>
        <main>...</main>
    </>
)

```
This gives the exact same result 😁