import { useId } from 'react';

interface DropdownOption {
    value: string; //what the code uses
    label: string; //what displays on screen
}

interface DropdownProps {
    label: string;
    options: DropdownOption[];
    value: string; //which option is selected
    onChange: (value: string) => void;
    disabled?: boolean;
    className?: string;
}

export const Dropdown = ({ label, options, value, onChange, disabled = false, className = '' }: DropdownProps) => {
    //unique id that links the label to the select, so clicking the label focuses it
    const id = useId();

    return (
        <div className={`inline-flex items-center gap-2 ${className}`}>
            <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-[#666]">
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="cursor-pointer rounded-[5px] border border-[#ccc] bg-white px-3 py-2 text-sm text-[#111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50"
            >
                {/*one <option> per item in the options array*/}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
