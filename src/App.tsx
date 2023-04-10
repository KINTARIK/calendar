import React from 'react';
import './static/css/global.css'
import Calendar from './components/Calendar/Calendar';
import './utils/helpers/date/index'

export const App: React.FC = () => {
    const [selectedDate, selectDate] = React.useState(new Date())
    return (
    <div className='app__container'>
        <Calendar selectDate={selectDate} selectedDate={selectedDate} />
    </div>
    )
}

export default App;
