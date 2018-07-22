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

interface ApiAuth {
  username: string;
  password: string
}

declare var ENV: string;
declare var API_URL_TMPL: string;
declare var API_AUTH: ApiAuth | undefined;

interface GlobalEnvironment {
  ENV:any;
  API_URL_TMPL:"production" | "development"
}

