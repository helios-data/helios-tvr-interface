import { type ReactNode } from "react";

export type Variant = 'primary' | 'secondary' | 'danger';

//each variant sets its own border color, so it never fights a border color in the shared classes
const variantStyles: Record<Variant, string> = {
    primary: 'bg-[#2563eb] border-transparent text-[#fff] enabled:hover:bg-[#1d4ed8]',
    secondary: 'bg-[#fff] border-[#ccc] text-[#111] enabled:hover:bg-[#f5f5f5]',
    danger: 'bg-[#b42318] border-transparent text-[#fff] enabled:hover:bg-[#912018]',
};

export type Size = 'small' | 'med' | 'large';

const sizeStyles: Record<Size, string> = {
    small: 'py-1 px-2.5 text-xs',
    med: 'py-2 px-4 text-sm',
    large: 'py-3 px-5 text-base',
};


interface ButtonProps {
    children: ReactNode; //shown inside the button
    onClick: () => void; //what happens when button is clicked
    variant?: Variant; //which style to use 
    size?: Size;
    disabled?: boolean; //block clicking the button
    className?: string;
}

export const Button = ({ children, onClick, variant = 'primary', size = 'med', disabled = false, className = '' }: ButtonProps) => { 
    return (
        <button 
            type="button" 
            className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[5px] border font-semibold leading-none cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            onClick={onClick} 
            disabled={disabled}
        > 
            {children}
        </button>
    );
};