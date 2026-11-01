//define the props interface
interface ReadoutProps {
    label: string;
    value: number | null;   //null = unknown = no data show as '-'
    unit?: string;
    decimals?: number;      //digits after decimal point, default 2
    stale?: boolean;        //true = data is old, update needed
}

//build readout component
export const Readout = ({ label, value, unit, decimals = 2, stale = false }: ReadoutProps) => {
    //false when theres no data yet or the reading is broken (NaN, Inf)
    const hasValue = Number.isFinite(value);
    const displayValue = hasValue ? value.toFixed(decimals) : '-';
    
    return (
        <div className={`flex flex-col gap-0.5 py-2 ${stale ? 'opacity-40' : ''}`}>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#666]">{label}</span>
            <span className="text-2xl font-semibold tabular-nums text-[#111]">
                {displayValue}
                {hasValue && unit && <span className="text-sm font-normal text-[#666]"> {unit}</span>}
            </span>
        </div>
    );
};