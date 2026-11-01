import { type ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
    children: ReactNode; //shown inside the button
    onClick: () => void; //what happens when button is clicked
    variant?: 'primary' | 'secondary' | 'danger'; //which style to use 
    size?: 'small' | 'med' | 'large';
    disabled?: boolean; //block clicking the button
    className?: string;
}

export const Button = ({ children, onClick, variant = 'primary', size = 'med', disabled = false, className = '' }: ButtonProps) => { 
    return (
        <button 
            type="button" 
            className={`button button-${variant} button-${size} ${className}`} 
            onClick={onClick} 
            disabled={disabled}
        > 
            {children}
        </button>
    );
};