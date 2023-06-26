import { useRef, useEffect } from "react";


export const useOutsideClick = (
    targetRef: React.RefObject<HTMLElement>,
    onOutsideClick: () => void
) => {
    useEffect(() => {
        function handler(event: MouseEvent) {
            const elem = targetRef.current;
            if (elem && event.target && elem.contains(event.target as Node)) return;
            onOutsideClick();
        }

        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        }
    }, [])
}