declare module 'ejs' {
  function render(template: string, data?: Record<string, unknown>, options?: { [key: string]: unknown }): string;
  function renderFile(path: string, data?: Record<string, unknown>, options?: { [key: string]: unknown }): Promise<string>;
  export = { render, renderFile };
}
