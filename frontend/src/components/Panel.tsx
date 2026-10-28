import { type ReactNode } from "react";
import './Panel.css';

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
        <div className={`panel-container ${className}`}>
            {title && (
                <div className="panel-header">
                    <h3 className="panel-title">{title}</h3>
                </div>
            )}
            <div className="panel-body">
                {/*this renders the ReactNode*/}
                {children}
            </div>
        </div>
    );
};
