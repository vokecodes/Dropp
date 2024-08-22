import {onLCP, onINP, onCLS, Metric } from 'web-vitals';

type ReportHandler = (metric: Metric) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onINP(onPerfEntry);
    onCLS(onPerfEntry);
    onLCP(onPerfEntry);
  }
};

export default reportWebVitals;