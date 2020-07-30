class XPad {
  
  /** @type {XPad} */
  constructor(buttonsConfig, joysticksConfig) {
    this.emitters = {}
    
    this.buttons = {}
    this.buttonsConfig = buttonsConfig
    
    this.joysticks = {left: {x: 0, y: 0}, right: {x: 0, y: 0}}
    this.joysticksConfig = joysticksConfig
  
    this.updateInterval = 10
    
    this.on("update", () => {
      this.buttonsConfig.forEach((name, index) => {
        const value = XPad.getButtonValue(this.gamepad.buttons[index])
        if(this.buttons[name] !== value){
          this.buttons[name] = value
          this.emit("buttonUpdate", name, value, index)
          if(value === 1) this.emit("buttonPressed", name, index)
          else if(value === 0) this.emit("buttonReleased", name, index)
        }
      })
      for(const side in this.joysticksConfig){
        for(const orientation in this.joysticksConfig[side]){
          const index = this.joysticksConfig[side][orientation]
          const value = this.gamepad.axes[index]
          if(this.joysticks[side][orientation] !== value){
            this.joysticks[side][orientation] = value
            this.emit("joysticksUpdate", this.joysticks, index)
            this.emit(
              side + "joystickUpdate",
              this.joysticks[side],
              index
            )
          }
        }
      }
    })
  
    window.addEventListener("gamepadconnected", (event) => {
      if(event.gamepad.id === "xinput") {
        this.buttonsConfig.forEach((name, i) => {
          this.buttons[name] = XPad.getButtonValue(event.gamepad.buttons[i])
        })
        for(const side in this.joysticksConfig){
          for(const orientation in this.joysticksConfig[side]) {
            const index = this.joysticksConfig[side][orientation]
            this.joysticks[side][orientation] = event.gamepad.axes[index]
          }
        }
        this.update = setInterval(() => this.emit("update"), this.updateInterval)
        this.gamepad = event.gamepad
        this.emit("connected")
      }
    });
  
    window.addEventListener("gamepaddisconnected", (event) => {
      if(event.gamepad === this.gamepad) {
        clearInterval(this.update)
        this.gamepad = null
        this.emit("disconnected")
      }
    });
  }
  
  get connected() {
    return !!this.gamepad
  }
  
  on(eventName, callback){
    if(this.emitters.hasOwnProperty(eventName))
      this.emitters[eventName].push(callback)
    else this.emitters[eventName] = [callback]
    return this
  }
  
  once(eventName, callback){
    callback.onlyOneTime = true
    this.on(eventName, callback)
    return this
  }
  
  emit(eventName, ...args){
    if(this.emitters.hasOwnProperty(eventName))
      this.emitters[eventName] = this.emitters[eventName]
        .filter(callback => {
          callback(...args)
          return !callback.onlyOneTime
        })
    return this
  }
  
  static getButtonValue(b) {
    return (typeof b == 'number') ? b : b.value
  }
}

// Xbox Gamepad
/** @type {XPad} */
const xPad = new XPad([
  "A","B","X","Y",
  "LB","RB","LT","RT",
  "BACK","START",
  "L-STICK","R-STICK",
  "UP","DOWN","LEFT","RIGHT"
],{
  left: {x: 0, y: 1},
  right: {x: 2, y: 3}
})