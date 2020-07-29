# 🎮 xPad - HTML5 Xbox 360 Gamepad Wrapper

- [Download](https://raw.githubusercontent.com/CamilleAbella/xPad/master/xPad.js)
- [Live test](https://CamilleAbella.github.io/xPad)

## Documentation

### xPad => PseudoEventEmitter

Node-like Event emitter for easily usage.

#### Events

- ``update``: *gamepad loop checking*
- ``connected``: *Xbox controller detected*
- ``disconnected``: *controller disconnected*
- ``buttonUpdate``: *button value changed*
  - arg[0] ``name``: *name of changed button*
  - arg[1] ``value``: *value of changed button*
- ``axeUpdate``: *axis value changed*
  - arg[0] ``name``: *name of changed axe*
  - arg[1] ``value``: *value of changed axe*

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

Includes the following buttons like that: `{*name: value}`

| `0 \ 1` (boolean) | `0...1` (tension) |
|---|---|
| A, B, X, Y, LB, RB, BACK, START, L-STICK, R-STICK, UP, DOWN, LEFT, RIGHT | LT, RT |

#### Examples

```js
xPad.on("update", () => {
  const LT_Value = xPad.buttons["LT"]
  const LT_IsPressed = LT_Value === 1
  const UP_IsPressed = !!xPad.buttons.UP
})

xPad.on("buttonUpdate", (name, value) => {
  // put code
})
```

### xPad.axes => Object

Includes the following axes like that: `{*name: value}`

| `-1...1` ((+-)tension) |
|---|
| LEFT-X, LEFT-Y, RIGHT-X, RIGHT-Y |

#### Examples

```js
xPad.on("axeUpdate", (name, value) => {
  const prop = name.includes("X") ? "x" : "y"
  if(name.includes("RIGHT")){
    player.position[prop] += value * player.vitesse
  }else{
    player.pointer[prop] += value * player.sensibility
  }
})
```

### xPad.updateInterval => number

Change the speed of gamepad checking (update event).