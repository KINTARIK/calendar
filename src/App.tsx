import React from 'react';
import './static/css/global.css'
import Calendar from './components/Calendar/Calendar';
import './utils/helpers/date/index'
import { formatDate } from './utils/helpers/date/formatDate';

export const App: React.FC = () => {
    const [selectedDate, setSelectedDay] = React.useState(new Date())
    return (
    <div className='app__container'>
        <div className='date__container'>
            {formatDate(selectedDate, 'DD MM YYYY')}
        </div>
        <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)} />    </div>
    )
}

export default App;
