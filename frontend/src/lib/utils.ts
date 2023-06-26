export function isNullable(value: any): value is (null | undefined){
    return value === null || typeof value === 'undefined';
}
type AnyFunc = (...args: any[]) => any;

export function pipe(initialArg: any, ...funcs: AnyFunc[]) {
    return funcs.reduce((acc, func) => {
        return func(acc)
    }, initialArg)
}