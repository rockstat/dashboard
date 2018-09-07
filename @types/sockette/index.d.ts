// Type definitions for
// Project:
// Definitions by: Dmitry Rodin <https://github.com/madiedinro>

declare module 'sockettez' {

  interface Options {
    timeout: number,
    maxAttempts: number,
    onopen: (e: Event) => any
    onmessage: (e: Event) => any
    onreconnect: (e: Event) => any
    onmaximum: (e: Event) => any
    onclose: (e: Event) => any
    onerror: (e: Event) => any
  }


  export class Sockette {
    constructor(options: Options);

    send(data: any): any;
    close(code: number, reason?: string): any;
    json(data: object): any;
    reconnect(): any;
    open(): any;
  }

}
