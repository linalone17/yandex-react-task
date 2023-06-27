import React, { useState, useRef, useMemo, useEffect } from 'react';

import { isNullable } from '@/lib/utils';
import { TextFieldBase } from '../TextFieldBase/TextFieldBase';
import { DropdownArrow } from '../DropdownArrow/DropdownArrow';
import { useOutsideClick } from '@/hooks/useOutsideClick';

import styles from './SelectField.module.scss';

import { createPortal } from 'react-dom';

type Choices = string[];

const Dropdown: React.FC<{
    containerRef: React.RefObject<Element>,
    targetRef: React.RefObject<Element>,
    choices: Choices, 
    onSelected: (i: number) => void,
    emptyValue?: string
}> = ({choices, onSelected, emptyValue, containerRef, targetRef}) => {

    const offset = useMemo(() => {
        if (!targetRef.current || !containerRef.current) return;

        const targetTop = targetRef.current.getBoundingClientRect().top;
        const containerTop = containerRef.current.getBoundingClientRect().top;

        return targetTop - containerTop + targetRef.current.clientHeight + 4;
    }, [containerRef.current, targetRef.current])
    
    if (!targetRef.current || !containerRef.current) return null;
    // если честно, здесь портал вообще не нужен
    return <>{createPortal(
        <div className={styles.dropdown} style={{top: `${offset}px`}}>
        {[emptyValue, ...choices].map((choice, i) => {
            if (isNullable(choice)) return;

            return (
                <div 
                    key={choice}
                    className={styles.dropdownItem}
                    onClick={() => {
                        onSelected(i)
                    }}
                >
                    {choice}
                </div>
            )
        })}
    </div>,
    containerRef.current
    )}</>
}

type SelectFieldProps = {
    legend?: string | number;
    placeholder?: string;
    choices: Choices;
    value: string;
    onSelected: (value: number | null) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({legend, choices, value, onSelected, placeholder}) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputWrapperRef = useRef<HTMLDivElement>(null);

    const emptyValue = 'Не выбрано';

    function open() {
        setIsTouched(true);
        setIsActive(true);
    }

    function close() {
        setIsActive(false);
        inputRef.current?.blur();
    }

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return;
            setIsActive(false);
        }

        document.addEventListener('keydown', handler);
        return () => {
            document.removeEventListener('keydown', handler)
        };
    },[])

    useOutsideClick(ref, close);


    return <div ref={ref}>
        {!isNullable(legend) && <legend className={styles.legend}>{legend}</legend>}
        <div className={styles.inputWrapper} ref={inputWrapperRef}>
            <TextFieldBase 
                onFocus={open}
                ref={inputRef}
                value={
                    value !== ''
                    ? value
                    : isTouched
                    ? emptyValue
                    : ''
                }
                placeholder={placeholder}
                readOnly
            />
            <div 
                className={styles.icon}
                onClick={close}
            >
                <DropdownArrow 
                    isActive={isActive}
                    width={'20px'}
                    height={'20px'}
                />
            </div>
            {isActive && 
                <Dropdown 
                    containerRef={inputWrapperRef}
                    targetRef={inputRef}
                    choices={choices}
                    onSelected={(i) => {
                        setIsTouched(true);
                        if (i === 0) {
                            onSelected(null);
                        } else {
                            onSelected(i - 1);
                        }
                        close();
                    }}
                    emptyValue={emptyValue}
                />
            }
        </div>
    </div>
}