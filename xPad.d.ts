
declare class XPad {
  public constructor(buttonsConfig: ButtonsConfig, joysticksConfig: Joysticks)
  public get connected(): boolean
  public emitters: { [EventName: string]: Listener[] }
  public buttons: Buttons
  public buttonsConfig: ButtonsConfig
  public joysticks: Joysticks
  public joysticksConfig: Joysticks
  public updateInterval: number
  public on(eventName: "update"): XPad
  public on(eventName: "connected"): XPad
  public on(eventName: "disconnected"): XPad
  public on(eventName: "buttonUpdate", callback: (name:string, value:number, index:number) => void): XPad
  public on(eventName: "buttonPressed", callback: (name: string, index:number) => void): XPad
  public on(eventName: "buttonReleased", callback: (name: string, index:number) => void): XPad
  public on(eventName: "joysticksUpdate", callback: (joysticks: Joysticks, index:number) => void): XPad
  public on(eventName: "leftJoystickUpdate", callback: (joystick: Joystick, index:number) => void): XPad
  public on(eventName: "rightJoystickUpdate", callback: (joystick: Joystick, index:number) => void): XPad
  public on(eventName: EventName, callback: Listener): XPad
  public once(eventName: EventName, callback: Listener): XPad
  public emit(eventName: EventName, ...args: any[]): XPad
  public static getButtonValue(b: GamepadButton): number
}

declare type Listener = (...args: any[]) => void
declare type Buttons = { [ButtonName: string]: number }
declare type ButtonsConfig = string[]

declare interface Joysticks {
  left: Joystick
  right: Joystick
}

declare interface Joystick {
  x: number
  y: number
}

declare interface Events {

}

declare type EventName =
    "update"
  | "connected"
  | "disconnected"
  | "buttonUpdate"
  | "buttonPressed"
  | "buttonReleased"
  | "joystickUpdate"
  | "leftJoystickUpdate"
  | "rightJoystickUpdate"
