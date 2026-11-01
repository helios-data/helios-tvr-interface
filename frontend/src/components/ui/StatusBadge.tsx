import './StatusBadge.css';

export type Status = 'ok' | 'warning' | 'error' | 'nodata'; 

interface StatusBadgeProps { 
    status: Status; //pick the color
    label: string;  // text for status 
}

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
    return (
        <span className={`status-badge status-${status}`}>
            {label}
        </span>
    );
};