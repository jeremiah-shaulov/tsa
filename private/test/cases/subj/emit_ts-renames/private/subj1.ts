const {Deno} = globalThis as any;
export const hasNoColor = typeof Deno?.noColor === "boolean";
