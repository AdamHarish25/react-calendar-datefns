import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Calendar } from './lib/components/Calendar';

ReactDOM.render(
  <React.StrictMode>
    <Calendar
      language='en-US'
      padding='15px'
      bgColor='#FFF'
      borderRadius='20px'
      colorArrows='#333'
      colorTextHeader='#333'
      colorTextdaysOfTheWeek='gray'
      bgMonth='#FFF'
      colorDays='#000'
      wDay='60px'
      hDay='50px'
      sizeArrow='25'
      fontWeightMonthAndYear='bold'
    />
  </React.StrictMode>,
  document.getElementById('root')
);