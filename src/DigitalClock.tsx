import {useState, useEffect, type JSX} from "react";

function DigitalClock(): JSX.Element {

    const [time , setTime] = useState<Date>(new Date());

    useEffect(()=>{

        const intervalId: ReturnType<typeof setInterval> = setInterval(()=>{
            setTime(new Date());
        },1000);
        return () => clearInterval(intervalId);
    },[])

    function formatTime(){
        let hours :number = time.getHours();
        const minutes :number = time.getMinutes();
        const seconds :number = time.getSeconds();
        const meridiem :string = hours>=12 ?"PM":"AM";

        hours = hours % 12 || 12;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
    }

    function padZero(number: number):string {
        return (number<10 ? "0" + number : number.toString());
    }
    return (
        <div className="inline-flex items-center justify-center p-4 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="text-2xl font-mono font-bold text-gray-800 tracking-wider">
                {formatTime()}
            </div>
        </div>
    );
}

export default DigitalClock;