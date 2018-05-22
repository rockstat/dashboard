/** Global definitions for developement **/

// for style loader
declare module '*.css' {
  const content: any;
  export = content;
}

declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}
