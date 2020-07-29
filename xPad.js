class XPad {
  
  constructor(buttonNames) {
    this.updateInterval = 10
    this.emitters = {}
    this.buttons = {}
    this.buttonCache = []
    this.buttonNames = buttonNames
  
    this.on("update", () => {
      this.gamepad.buttons.forEach((b, i) => {
        const val = XPad.getButtonValue(b)
        if(this.buttonCache[i] !== val){
          this.buttonCache[i] = val
          this.emit("buttonUpdate", this.buttonNames[i], val)
        }
      })
    })
  
    window.addEventListener("gamepadconnected", (event) => {
      if(event.gamepad.id === "xinput") {
        this.buttonNames.forEach((name, i) => {
          this.buttonCache[i] = XPad.getButtonValue(event.gamepad.buttons[i])
          this.buttons[name] = this.buttonCache[i]
        })
        this.update = setInterval(() => this.emit("update"), this.updateInterval)
        this.gamepad = event.gamepad
        this.connected = true
        this.emit("connected")
      }
    });
  
    window.addEventListener("gamepaddisconnected", (event) => {
      if(event.gamepad === this.gamepad) {
        clearInterval(this.update)
        this.gamepad = false
        this.connected = false
        this.emit("disconnected")
      }
    });
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
  }
  
  emit(eventName, ...args){
    this.emitters[eventName] = this.emitters[eventName]
      .filter(callback => {
        callback(...args)
        return !callback.onlyOneTime
      })
  }
  
  static getButtonValue( b ) {
    return (typeof b == 'number') ? b : b.value
  }
}

// Xbox Gamepad
const xPad = new XPad([
  "A","B","X","Y",
  "LB","RB","LT","RT",
  "BACK","START",
  "L-STICK","R-STICK",
  "UP","DOWN","LEFT","RIGHT"
])