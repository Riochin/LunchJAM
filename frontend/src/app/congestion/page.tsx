import React from 'react';
import DateTime from '../../../components/DateTime';

const Congestion: React.FC = () => {
  return (
    <div>
      <div className="text">現在の状況</div>
      <div className="congestion-icon-left"></div>
      <div className="congestion-text-right">大変混雑している</div>
      <div className="current-time">
        <DateTime></DateTime>
      </div>
      <div className="graph-container">
        <div className="graph"></div>
      </div>
    </div>
  );
};

export default Congestion;
