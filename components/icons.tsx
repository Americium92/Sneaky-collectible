
import React from 'react';

export const BearbrickIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C9.24 2 7 4.24 7 7c0 1.54.69 2.9 1.76 3.82L7 11v9h10v-9l-1.76-.18C16.31 9.9 17 8.54 17 7c0-2.76-2.24-5-5-5zm-2.5 5c-.83 0-1.5-.67-1.5-1.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7z" />
  </svg>
);

export const CoinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-8.59V13h2v-1.59L15.59 9H13v1.59l-2 2zM8.41 15H11v-1.59L9 11.41V10H7v1.41L8.41 15z" />
  </svg>
);

export const BanknoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zM4 18V6h16v12H4zm8-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
  </svg>
);

export const PlushieIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2c-3.31 0-6 2.69-6 6 0 2.24 1.23 4.19 3 5.19V15c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-1.81c1.77-1 3-2.95 3-5.19 0-3.31-2.69-6-6-6zM9.5 8C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zM12 21c-2.29 0-4.4-1-6-2.62l1.45-1.3c1.1.83 2.45 1.32 3.93 1.42.3.01.62 0 .92-.05.3-.05.59-.12.87-.21.28-.1.55-.22.81-.35.26-.14.51-.3.75-.48.24-.18.47-.38.68-.59.21-.22.41-.46.59-.72.18-.26.34-.54.48-.83.14-.3.26-.61.35-.94.1-.33.16-.68.2-1.04.03-.36.05-.72.05-1.08h-2c-1.1 0-2-.9-2-2v-1h4v1c0 1.1-.9 2-2 2h-1.02c-.05 2.6-1.59 4.88-3.79 6.02A6.475 6.475 0 0 1 12 21z" />
    </svg>
);

export const OtherIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21 5.47L12 2 3 5.47v11.06L12 22l9-5.47V5.47zM12 4.3l5.94 3.2-5.94 3.2-5.94-3.2L12 4.3zM5 7.64l5 2.72v8.28l-5-2.72V7.64zm14 8.28l-5 2.72v-8.28l5-2.72v8.28z"/>
    </svg>
);

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const BarcodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h.375c.621 0 1.125.504 1.125 1.125v14.25c0 .621-.504 1.125-1.125 1.125h-.375a1.125 1.125 0 01-1.125-1.125V4.875zM8.25 12c0-.621.504-1.125 1.125-1.125h.375c.621 0 1.125.504 1.125 1.125v7.5c0 .621-.504 1.125-1.125 1.125h-.375a1.125 1.125 0 01-1.125-1.125v-7.5zM12.75 8.25c0-.621.504-1.125 1.125-1.125h.375c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-.375a1.125 1.125 0 01-1.125-1.125V8.25zM17.25 15.75c0-.621.504-1.125 1.125-1.125h.375c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-.375a1.125 1.125 0 01-1.125-1.125v-3.75z" />
    </svg>
);

export const ArrowUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
);

export const ArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);
