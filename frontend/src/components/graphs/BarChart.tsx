// BarChart.tsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface BarChartProps {
  data: number[];
  labels: string[];
}

const BarChart: React.FC<BarChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<"bar"> | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy the previous chart instance (if it exists)
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new chart instance
      const newChartInstance = new Chart(ctx as CanvasRenderingContext2D, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          animation: {
            duration: 0, // Disable animation on initial appearance
          },
        },
      });

      // Store the new chart instance
      chartInstanceRef.current = newChartInstance;
    }

    // Cleanup: Destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, labels]);

  return <canvas ref={chartRef} width={600} height={250} />;
};

export default BarChart;