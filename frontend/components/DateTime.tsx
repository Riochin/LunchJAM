'use client';
import React, { useEffect, useState } from 'react';

const DateTime: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    setInterval(() => {
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      setDate(month.toString() + '月' + day.toString() + '日');

      let hour = d.getHours().toString().padStart(2, '0');
      let minute = d.getMinutes().toString().padStart(2, '0');
      let seconds = d.getSeconds().toString().padStart(2, '0');
      setTime(hour + ':' + minute + ':' + seconds);
    }, 1000);
  }, []);

  return (
    <div className="Digit">
      <p className="digit">{date}</p>
    </div>
  );
};

export default DateTime;
