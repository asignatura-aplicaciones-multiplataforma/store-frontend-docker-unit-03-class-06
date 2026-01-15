We can dont use JSX instead, we can use only the library React.

```
<div id="content">
    <p>Hello World!</p>
</div>
```

With lib:

```
React.createElement(
    'div', // Component type
    { id: 'content' }, // Props object
    React.createElement( // Child Content
        'p',
        null,
        'Hello World'
    )
)
```