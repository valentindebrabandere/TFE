
export class EventBus {
    private events: { [key: string]: Function[] } = {};
  
    public subscribe(eventName: string, callback: Function) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
    }
  
    public dispatch(eventName: string, data?: any) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(callback => callback(data));
      }
    }
  }
  
  export const eventBus = new EventBus();