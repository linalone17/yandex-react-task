export type AnyFunc = (...args: any) => any;

export type Arguments<T> = T extends (...args: infer A) => any ? A : never;  