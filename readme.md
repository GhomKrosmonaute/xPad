# 🎮 xPad - HTML5 Xbox 360 Gamepad Wrapper

- [Download](https://raw.githubusercontent.com/CamilleAbella/xPad/master/xPad.js)
- [Live test](https://CamilleAbella.github.io/xPad)

## Documentation

### xPad => PseudoEventEmitter

Node-like Event emitter for easily usage.

#### Examples

```html
<body>
  <script src="xPad.js"></script>
  <script>
    xPad.once("connected", () => {
      console.log("Connected!")
    })
    xPad.on("buttonUpdate", console.log)
  </script>
</body>
```

### xPad.buttons => Object

Includes the following buttons like that: `{name: value}`

- A, B, X, Y: `0 | 1`
- LB, RB: `0 | 1`
- LT, RT: `0...1`
- BACK, START: `0 | 1`
- L-STICK, R-STICK: `0 | 1`
- UP, DOWN, LEFT, RIGHT: `0 | 1`

#### Examples

```js
xPad.on("update", () => {
    const LT_Value = xPad.buttons["LT"]
    const LT_IsPressed = LT_Value === 1
    const UP_IsPressed = !!xPad.buttons.UP
})
```

### xPad.updateInterval => number

Change the speed of gamepad checking.