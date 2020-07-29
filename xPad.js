class XPad {
  
  constructor(buttonNames, axeNames) {
    this.emitters = {}
    
    this.buttons = {}
    this.buttonCache = []
    this.buttonNames = buttonNames
    
    this.axes = {}
    this.axeCache = []
    this.axeNames = axeNames
  
    this.updateInterval = 10
    
    this.on("update", () => {
      this.buttonNames.forEach((n, i) => {
        const value = XPad.getButtonValue(this.gamepad.buttons[i])
        if(this.buttonCache[i] !== value){
          this.buttonCache[i] = value
          this.buttons[n] = value
          this.emit("buttonUpdate", n, value)
        }
      })
      this.axeNames.forEach((n, i) => {
        const value = this.gamepad.axes[i]
        if(this.axeCache[i] !== value){
          this.axeCache[i] = value
          this.axes[n] = value
          this.emit("axeUpdate", n, value)
        }
      })
    })
  
    window.addEventListener("gamepadconnected", (event) => {
      if(event.gamepad.id === "xinput") {
        this.buttonNames.forEach((name, i) => {
          this.buttonCache[i] = XPad.getButtonValue(event.gamepad.buttons[i])
          this.buttons[name] = this.buttonCache[i]
        })
        this.axeNames.forEach((name, i) => {
          this.axeCache[i] = event.gamepad.axes[i]
          this.axes[name] = this.axeCache[i]
        })
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
  }
  
  emit(eventName, ...args){
    if(this.emitters.hasOwnProperty(eventName))
      this.emitters[eventName] = this.emitters[eventName]
        .filter(callback => {
          callback(...args)
          return !callback.onlyOneTime
        })
  }
  
  static getButtonValue(b) {
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
],[
  "LEFT-X","LEFT-Y",
  "RIGHT-X","RIGHT-Y"
])