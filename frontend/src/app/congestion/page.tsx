import React from 'react';
import Header from '../../../components/Header';
import DateTime from '../../../components/DateTime';
import Footer from '../../../components/Footer';

const Congestion: React.FC = () => {
  return (
    <React.Fragment>
      <header>
        <Header></Header>
      </header>
      <div>
        <div className="text">現在の状況</div>
        <div className="congestion-icon-left"></div>
        <div className="congestion-text-right">大変混雑している</div>
        <div className="current-time">
          <DateTime></DateTime>
        </div>
        <div className="graph-container">
          /*グラフの表示 */
          <div className="graph"></div>
        </div>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </React.Fragment>
  );
};

export default Congestion;
