import { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';
import PropTypes from 'prop-types';

const Donut = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    const nameKey = Object.keys(data[0])[0];
    const valueKey = Object.keys(data[0])[1];

    const chart = new Chart({
      container: chartRef.current,
    });

    chart.coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 });

    chart
      .interval()
      .transform({ type: 'stackY' })
      .data(data)
      .encode('y', valueKey)
      .encode('color', nameKey)
      .style('stroke', 'white')
      .style('inset', 1)
      .style('radius', 10)
      .label({ text: nameKey, fontSize: 16, fontWeight: 'bolder' }) // Increased font size
      .animate('enter', { type: 'waveIn' })
      .legend(true)
      .label({
      text: valueKey,
      position: 'spider',
      connectorDistance: 0,
      fontWeight: 'bolder',
      textBaseline: 'bottom',
      dy: -4,
      fontSize: 16, // Increased font size
      });

    chart.render();

    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div ref={chartRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}></div>
  );
};

Donut.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
};

export default Donut;
