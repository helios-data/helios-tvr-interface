import './Readout.css';

//define the props interface
interface ReadoutProps {
    label: string;
    value: number | null;   //null = unknown = no data show as '-'
    unit?: string;
    decimals?: number;      //digits after decimal point 
    stale?: boolean;        //true = data is old, update needed
}

//build readout component
export const Readout = ({ label, value, unit, decimals, stale}: ReadoutProps) => {
    //false when theres no data yet or the reading is broken (NaN, Inf)
    const hasValue = value !== null && Number.isFinite(value);

    let displayValue = '-'; 
    if (hasValue) {
        displayValue = decimals !== undefined ? value.toFixed(decimals) : value.toString();
    }

    return ( 
        <div className={`readout-container ${stale ? 'readout-stale' : ''}`}>
            <span className="readout-label">{label}</span>
            <span className="readout-value">
                {displayValue}
                {hasValue && unit && <span className="readout-unit"> {unit}</span>}
            </span>
        </div>
    )
}