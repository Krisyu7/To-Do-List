import React, { useEffect, useRef } from "react";


interface CountdownTimerProps {
    remainingTime: number;
    isRunning: boolean;
    onTimeChange: (newTime: number) => void;
    onToggle: () => void;
    onComplete: () => void;
    showTimeButtons?: boolean;
    initialTime?: number;
}

// 定义时间按钮接口
interface TimeButton {
    label: string;
    hours: number;
    minutes: number;
    color: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
                                                           remainingTime,
                                                           isRunning,
                                                           onTimeChange,
                                                           onToggle,
                                                           onComplete,
                                                           showTimeButtons = true,
                                                           initialTime = 0
                                                       }) => {
    const intervalIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (isRunning && remainingTime > 0) {
            intervalIdRef.current = setInterval(() => {
                const newTime = remainingTime - 1000;
                if (newTime <= 0) {
                    alert("⏰ Congratulations on completing another focused goal!");
                    onComplete();
                } else {
                    onTimeChange(newTime);
                }
            }, 1000);
        } else {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        }

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [isRunning, remainingTime, onComplete, onTimeChange]);

    const addTime = (hours: number, minutes: number): void => {
        const addMilliseconds = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
        onTimeChange(remainingTime + addMilliseconds);
    };

    const formatTime = (): string => {
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);

        const hoursStr = String(hours).padStart(2, '0');
        const minutesStr = String(minutes).padStart(2, '0');
        const secondsStr = String(seconds).padStart(2, '0');

        return `${hoursStr}:${minutesStr}:${secondsStr}`;
    };

    const getTimerColor = (): string => {
        if (remainingTime === 0) return "text-gray-500";
        if (remainingTime <= 60000) return "text-red-600"; // Last minute
        if (remainingTime <= 300000) return "text-orange-600"; // Last 5 minutes
        return "text-gray-800";
    };

    const timeButtons: TimeButton[] = [
        { label: "+5min", hours: 0, minutes: 5, color: "bg-green-100 text-green-700 hover:bg-green-200" },
        { label: "+10min", hours: 0, minutes: 10, color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
        { label: "+15min", hours: 0, minutes: 15, color: "bg-purple-100 text-purple-700 hover:bg-purple-200" },
        { label: "+1hr", hours: 1, minutes: 0, color: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200" }
    ];


    return (
        <div className="countdown-timer space-y-2">
            {/* Time setting buttons */}
            {showTimeButtons && (
                <div className="flex gap-1 justify-center flex-wrap">
                    {timeButtons.map(({ label, hours, minutes, color }) => (
                        <button
                            key={label}
                            onClick={() => addTime(hours, minutes)}
                            disabled={isRunning}
                            className={`px-2 py-1 text-xs rounded-md transition-colors font-medium
                                      disabled:opacity-50 disabled:cursor-not-allowed ${color}`}
                            title={`Add ${label.substring(1)}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            )}

            {/* Time display */}
            <div className="text-center">
                <div className={`text-2xl font-mono font-bold rounded-lg py-3 px-4 
                                bg-gray-50 border border-gray-200 transition-all duration-300 ${getTimerColor()}
                                ${isRunning ? 'animate-pulse' : ''}
                                ${remainingTime <= 60000 && remainingTime > 0 ? 'ring-2 ring-red-300' : ''}`}>
                    {formatTime()}
                </div>
                
                {/* Time status indicator */}
                {remainingTime > 0 && (
                    <div className="mt-2 text-sm text-gray-500">
                        {isRunning ? (
                            <span className="flex items-center justify-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Running
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                Paused
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Control buttons */}
            <div className="flex justify-center gap-2">
                <button
                    onClick={onToggle}
                    disabled={remainingTime === 0}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors
                              disabled:opacity-50 disabled:cursor-not-allowed
                              ${isRunning
                                  ? 'bg-red-500 hover:bg-red-600 text-white'
                                  : 'bg-green-500 hover:bg-green-600 text-white'
                              }`}
                >
                    {isRunning ? (
                        <span className="flex items-center gap-1">
                            ⏸️ <span>Pause</span>
                        </span>
                    ) : (
                        <span className="flex items-center gap-1">
                            ▶️ <span>Start</span>
                        </span>
                    )}
                </button>

                {/* Reset button */}
                {remainingTime > 0 && !isRunning && (
                    <button
                        onClick={() => onTimeChange(0)}
                        className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        title="Reset timer"
                    >
                        🔄 Reset
                    </button>
                )}
            </div>

            {/* Progress indicator */}
            {remainingTime > 0 && initialTime > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                        style={{
                            width: `${Math.max(0, Math.min(100, ((remainingTime / initialTime) * 100)))}%`
                        }}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default CountdownTimer;