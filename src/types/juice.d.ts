declare module 'juice' {
  function juice(html: string, options?: { [key: string]: unknown }): string;
  export = juice;
}
