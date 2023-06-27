import { Arguments } from "@/types/utils";

export function isNullable(value: any): value is (null | undefined){
    return value === null || typeof value === 'undefined';
}

 

export function debounce<T extends Function>(func: T, timeout: number) {
    // let allowed = true;
    let onExpire: Function | null = null;
    let timer: NodeJS.Timeout | null = null;
    return (...args: Arguments<T>) => {
        if (timer !== null) {
            onExpire = () => {
                func(...args);
                onExpire = null;
            };

            clearTimeout(timer);
            timer = setTimeout(() => {
                onExpire?.();
                timer = null;
            }, timeout)

            return;
        }

        func(...args);
        timer = setTimeout(() => {
            timer = null;
        }, timeout)
    }
}