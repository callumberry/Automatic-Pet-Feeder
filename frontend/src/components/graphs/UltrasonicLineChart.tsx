// LineChart.tsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface LineChartProps {
  data: number[];
  labels: string[];
}

const UltrasonicLineChart: React.FC<LineChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        // Destroy the previous chart instance (if it exists)
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Create a new chart instance
        const newChartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                data,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'category',
                labels,
              },
              y: {
                beginAtZero: true,
                min: 0,
                max: 100,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });

        // Store the new chart instance
        chartInstanceRef.current = newChartInstance;
      }
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

export default UltrasonicLineChart;