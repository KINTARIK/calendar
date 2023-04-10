import React from "react";
import { useCalendar } from "../hooks/useCalendar";

interface CalendarProps {
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = (
    locale = 'default',
    selectDate,
    selectedDate) => {
    const {} = useCalendar({
       locale,
       selectedDate
    })
    return(
        <h1>Календарь</h1>
    )
}

export default Calendar;