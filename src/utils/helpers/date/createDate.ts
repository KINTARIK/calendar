import { getWeekNumber } from "./getWeekNumber";

interface CreateDateParams {
    locale?: string;
    date?: Date;
}

export const createDate = (params?:CreateDateParams) => {
    const local = params?.locale ?? 'default';

    const d = params?.date ?? new Date();
    const dayNumber = d.getDate();
    const day = d.toLocaleString(local, {weekday: 'long'});
    const dayNumberInWeek = d.getDate() + 1;
    const dayShort = d.toLocaleDateString(local, {weekday: 'short'});
    const year = d.getFullYear();
    const yearShort = d.toLocaleDateString(local, {year: '2-digit'});
    const month = d.toLocaleString(local, {month: 'long'});
    const monthShort = d.toLocaleString(local, {month: 'short'});
    const monthNumber = d.getMonth() + 1;
    const monthIndex = d.getMonth();
    const timestamp = d.getTime();
    const week = getWeekNumber(d);

    return{
        d,
        dayNumber,
        day,
        dayNumberInWeek,
        dayShort,
        year,
        yearShort,
        month,
        monthShort,
        monthNumber,
        monthIndex,
        timestamp,
        week
    }
}