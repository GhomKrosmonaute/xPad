![](./favicon.png)

# 🎮 xPad - HTML5 Xbox 360 Gamepad Wrapper

- [Download](https://raw.githubusercontent.com/CamilleAbella/xPad/master/xPad.js)
- [Live test](https://CamilleAbella.github.io/xPad)

## Documentation

### xPad: ``PseudoEventEmitter``

Node-like Event emitter for easily usage.

#### Events

- ``update``: *gamepad loop checking*
- ``connected``: *Xbox controller detected*
- ``disconnected``: *Xbox controller disconnected*
- ``buttonUpdate``: *button value changed*
  - arg[0] ``name``: *name of changed button*
  - arg[1] ``value``: *value of changed button*
  - arg[2] ``index``: *index of changed button*
- ``buttonPressed``: *button pressed*
  - arg[0] ``name``: *name of pressed button*
- ``buttonReleased``: *button released*
  - arg[0] ``name``: *name of released button*
- ``axeUpdate``: *axis value changed*
  - arg[0] ``name``: *name of changed axe*
  - arg[1] ``value``: *value of changed axe*
  - arg[2] ``index``: *index of changed axe*
- ``leftStickUpdate``: *left stick axe value changed*
  - arg[0] ``axe``: *orientation of changed axe (``x`` or ``y``)*
  - arg[1] ``value``: *value of changed axe*
- ``rightStickUpdate``: *right stick axe value changed*
  - arg[0] ``axe``: *orientation of changed axe (``x`` or ``y``)*
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

### xPad.buttons: ``Object``

Includes the following buttons like that: `{*name: value}`

| `0 \ 1` (boolean) | `0...1` (tension) |
|---|---|
| A, B, X, Y, LB, RB, BACK, START, L-STICK, R-STICK, UP, DOWN, LEFT, RIGHT | LT, RT |

#### Checking of button values

```js
// get props on your own game loop
const LT_Value = xPad.buttons["LT"]
const LT_IsPressed = LT_Value === 1
const UP_IsPressed = !!xPad.buttons.UP

// or use events
xPad.on("buttonPressed", name => {
  if(name === "A") player.jump()
})
```

### xPad.axes: ``Object``

Includes the following axes like that: `{*name: value}`

| `-1...1` ((+-)tension) |
|---|
| LEFT-X, LEFT-Y, RIGHT-X, RIGHT-Y |

#### Checking of axes values

```js
xPad.on("rightStickUpdate", (axe, value) => {
  player.position[axe] += value * player.vitesse
})

xPad.on("leftStickUpdate", (axe, value) => {
  player.pointer[axe] += value * player.sensibility
})
```

### xPad.updateInterval: ``number``

Change the speed of gamepad checking (update event).