import { create } from "domain";
import React from "react";
import { 
    getMonthesNames,
    createMonth,
    getWeekDaysNames,
    getMonthNumberOfDays,
    createDate
} from "../../utils/helpers/date";

  interface useCalendarParams {
    locale?: string;
    selectedDate:Date;
    firstWeekDay: number;
}

const getYearsInterval = (year:number) =>{
    const startYear = Math.floor(year/10) * 10
    return [...Array(10)].map((_, index) => startYear + index)
}

export const useCalendar = ({firstWeekDay = 2, locale, selectedDate: date} :useCalendarParams) => {
    const [mode, setMode] = React.useState<'days' | 'monthes' | 'years'>('days')

    const [selectedDate, setSelectedDay] = React.useState(createDate({date}))
    const [selectedMonth, setSelectedMonth] = React.useState(
        createMonth({date: new Date(selectedDate.year, selectedDate.monthIndex), locale})
        );
    const [selectedYear, setSelectedYear] = React.useState(
        selectedDate.year
    )
    const [selectedYearInterval, setSelectedYearInterval] = React.useState(
        getYearsInterval(selectedDate.year)
    )
    const monthesNames = React.useMemo(() => getMonthesNames(locale), [])
    const weekDaysNames = React.useMemo(() => getWeekDaysNames(firstWeekDay, locale), [])

    const days = React.useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear]);
    const calendarDays = React.useMemo(() => {
        const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);
        const prevMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex - 1),
            locale
        }).createMonthDays()

        const nextMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex + 1),
            locale
        }).createMonthDays()

        const firstDay = days[0]
        const lastDay = days[monthNumberOfDays - 1]
        const shiftIndex = firstWeekDay - 1

        const numberOfPrevDays = firstDay.dayNumberInWeek - 1 - shiftIndex < 0 ? 7 - (firstWeekDay - firstDay.dayNumberInWeek) : firstDay.dayNumberInWeek - 1 - shiftIndex
        const numberOfnextDays = 7 - lastDay.dayNumberInWeek + shiftIndex > 6 ? 7 - lastDay.dayNumberInWeek - (7- shiftIndex) : 7 - lastDay.dayNumberInWeek + shiftIndex
        const totalCalendaryDays = days.length + numberOfnextDays + numberOfPrevDays
        const result = []
        for(let i = 0; i < numberOfPrevDays; i+=1){
            const inverted = numberOfPrevDays - i
            result[i] = prevMonthDays[prevMonthDays.length - inverted]
        }
        for(let i = numberOfPrevDays; i < totalCalendaryDays-numberOfnextDays; i+=1){
            result[i] = days[i - numberOfPrevDays]
        }
        for(let i = totalCalendaryDays-numberOfnextDays; i < totalCalendaryDays; i+=1){
            result[i] = nextMonthDays[i - totalCalendaryDays + numberOfnextDays]
        }
    }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

    const onClickArrow = (direction: 'right' | 'left') => {
        if (mode === 'years' && direction === 'left') {
          return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] - 10));
        }
    
        if (mode === 'years' && direction === 'right') {
          return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] + 10));
        }
    
        if (mode === 'monthes' && direction === 'left') {
          const year = selectedYear - 1;
          if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year));
          return setSelectedYear(selectedYear - 1);
        }
    
        if (mode === 'monthes' && direction === 'right') {
          const year = selectedYear + 1;
          if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year));
          return setSelectedYear(selectedYear + 1);
        }
    
        if (mode === 'days') {
          const monthIndex =
            direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;
          if (monthIndex === -1) {
            const year = selectedYear - 1;
            setSelectedYear(year);
            if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year));
            return setSelectedMonth(createMonth({ date: new Date(selectedYear - 1, 11), locale }));
          }
    
          if (monthIndex === 12) {
            const year = selectedYear + 1;
            setSelectedYear(year);
            if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year));
            return setSelectedMonth(createMonth({ date: new Date(year, 0), locale }));
          }
    
          setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
        }
      };

      const setSelectedMonthByIndex = (monthIndex: number) => {
        setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
      };

    return {
        state: {
            mode,
            calendarDays,
            weekDaysNames,
            monthesNames,
            selectedDate,
            selectedMonth,
            selectedYear,
            selectedYearInterval,
            
        },
        functions: {
            setMode,
            setSelectedDay,
            onClickArrow,
            setSelectedMonthByIndex,
            setSelectedYear
        }
    };
}