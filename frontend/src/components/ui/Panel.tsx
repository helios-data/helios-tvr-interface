import { type ReactNode } from "react";

//define the props interface including ReactNode
interface PanelProps {
    title?: string;
    children: ReactNode; //allows text, HTML & other React components
    className?: string;
}

//build panel component
//changed to arrow function without using React.FC
export const Panel = ({ title, children, className = '' }: PanelProps) => {
    return (
        <div className={`my-4 overflow-hidden rounded-[5px] border border-[#ccc] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] ${className}`}>
            {title && (
                <div className="border-b border-[#ccc] bg-[#f5f5f5] px-4 py-3">
                    <h3 className="m-0 text-xl">{title}</h3>
                </div>
            )}
            <div className="p-4">
                {/*this renders the ReactNode*/}
                {children}
            </div>
        </div>
    );
};
