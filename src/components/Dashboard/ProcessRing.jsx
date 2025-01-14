import { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';
import { Card } from 'antd';
import PropTypes from 'prop-types';

const ProcessRing = ({ progress }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart({
      container: chartRef.current,
      width: 100,
      height: 100,
    });

    chart.coordinate({ type: 'theta', innerRadius: 0.7 });

    chart
      .interval()
      .data([1, progress])
      .encode('y', (d) => d)
      .encode('color', (d, idx) => idx)
      .scale('y', { domain: [0, 1] })
      .scale('color', { range: ['#d3d3d3', '#a0ff03'] }) // Light gray color for the background
      .animate('enter', { type: 'waveIn' })
      .axis(false)
      .legend(false)
      .label(false);

    chart.text().style({
      text: `${progress * 100}%`,
      x: '50%',
      y: '50%',
      textAlign: 'center',
      fontSize: 16,
      fontStyle: 'bold',
    });

    chart.interaction('tooltip', false);

    chart.render();

    return () => {
      chart.destroy();
    };
  }, [progress]);

  return (
    <div
      ref={chartRef}
    ></div>
  );
};

ProcessRing.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProcessRing;
