![](./favicon.png)

# 🎮 xPad - HTML5 Xbox 360 Gamepad Wrapper

- [Download](https://raw.githubusercontent.com/CamilleAbella/xPad/master/xPad.js)
- [Live test](https://CamilleAbella.github.io/xPad)

## Documentation

### xPad: ``XPad``

Node-like Event emitter for easily usage.

#### Events

On:

- ``update``
- ``connected``
- ``disconnected``
- ``buttonUpdate``, (**name**: ``string``, **value**: ``number``, **index**: ``number``) => ``void``): ``XPad``
- ``buttonPressed``, (**name**: ``string``, **index**: ``number``) => ``void``): ``XPad``
- ``buttonReleased``, (**name**: ``string``, **index**: ``number``) => ``void``): ``XPad``
- ``joysticksUpdate``, (**joysticks**: ``Joysticks``, **index**: ``number``) => ``void``): ``XPad``
- ``leftJoystickUpdate``, (**joystick**: ``Joystick``, **index**: ``number``) => ``void``): ``XPad``
- ``rightJoystickUpdate``, (**joystick**: ``Joystick``, **index**: ``number``) => ``void``): ``XPad``

For more detail, please read [this file](./xPad.d.ts)

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

### xPad.buttons: ``{ [name: string]: number }``

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

### xPad.joysticks: ``Joysticks``

```ts
interface Joysticks {
  left: Joystick
  right: Joystick
}

interface Joystick {
  x: number
  y: number
}
```

```json
{
  "left": {"x": 0, "y": 0},
  "right": {"x": 0, "y": 0}
}
```

#### Checking of joysticks values

```js
xPad.on("rightJoystickUpdate", joystick => {
  ["x","y"].forEach(a => {
    player.position[a] += joystick[a] * player.speed[a]
  })
})

xPad.on("leftJoystickUpdate", joystick => {
  ["x","y"].forEach(a => {
    player.pointer[a] += joystick[a] * player.sensitivity[a]
  })
})
```

### xPad.updateInterval: ``number``

Change the speed of gamepad checking (update event).