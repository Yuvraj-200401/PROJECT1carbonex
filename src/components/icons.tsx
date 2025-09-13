import * as React from 'react';

export function CarboNexLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.752 8.413l-1.99 3.447 1.99 3.446h3.978l1.99-3.446-1.99-3.447H8.752zm6.248 7.146l1.99-3.446-1.99-3.447h-3.978L9.032 12l1.99 3.446h3.978z"
        fill="currentColor"
      />
    </svg>
  );
}
