export type Status = 'ok' | 'warning' | 'error' | 'nodata'; 

const statusStyles: Record<Status, string> = {
  ok: 'bg-[#e6f4ea] text-[#1e7b34]',
  warning: 'bg-[#fff4d6] text-[#8a6100]',
  error: 'bg-[#fde8e8] text-[#b42318]',
  nodata: 'bg-[#f0f0f0] text-[#666]',
};

interface StatusBadgeProps { 
    status: Status; //pick the color
    label: string;  // text for status 
}

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
    return (
        //before: classes draw the colored dot, bg-current uses the same color as the text
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider before:size-2 before:rounded-full before:bg-current ${statusStyles[status]}`}>
            {label}
        </span>
    );
};