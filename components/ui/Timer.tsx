import { Timer } from 'lucide-react';

export const TimerIcon = ({
    elapseTime,
    done,
} : {
    elapseTime : number;
    done : boolean;
})=>{
    return(
        <div>
            <Timer width={40} height={40}/> {done ? "0" : elapseTime}s
        </div>
    )
};