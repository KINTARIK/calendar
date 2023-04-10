import { create } from "domain";
import React from "react";
import { createDate, createMonth, getMonthesNames } from "../../utils/helpers/date/index";

interface useCalendarParams {
    locale?: string;
    selectedDate:Date;
}

export const useCalendar = ({locale, selectedDate: date} :useCalendarParams) => {
    const [mode, setMode] = React.useState<'days' | 'monthes' | 'years'>('days')

    const [selectedDate, setSelectedDay] = React.useState(createDate({date}))
    const [selectedMonth, setSelectedMonth] = React.useState(
        createMonth({date: new Date(selectedDate.year, selectedDate.monthIndex), locale})
        );
    const [selectedYear, setSelectedYear] = React.useState(
        selectedDate.year
    )
    const monthesNames = React.useMemo(() => getMonthesNames(locale), [])
    const weekDaysNames = React.useMemo(() => getMonthesNames(locale), [])
    return {};
}