import { useId } from 'react';

interface SwitchProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

export const Switch = ({ label, checked, onChange, disabled = false }: SwitchProps) => {
    //unique id that links label to button, so clicking the label flips the switch
    const id = useId();

    return (
        <div className="inline-flex items-center gap-2">
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-[#2563eb]' : 'bg-[#888]'}`}
            >
                {/*the knob, slides right when checked*/}
                <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`}
                />
            </button>
            <label htmlFor={id} className="text-sm font-semibold text-[#111]">{label}</label>
        </div>
    );
};
