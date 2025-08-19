interface AppIconProps {
  className?: string;
}

export const AppIcon = ({ className }: AppIconProps) => {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="120" height="120" fill="black" />
      <mask
        id="mask0_1_3"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="23"
        y="16"
        width="75"
        height="88"
      >
        <path
          d="M50.5555 23.1111L70.1111 16V23.1111V96.8889L50.5555 104V96.8889V23.1111Z"
          fill="#D9D9D9"
        />
        <path
          d="M23 36.1391L42.5556 31.1111V36.1391V88.3052L23 93.3333V88.3052V36.1391Z"
          fill="#D9D9D9"
        />
        <path
          d="M78.1111 36.1391L97.6667 31.1111V36.1391V88.3052L78.1111 93.3333V88.3052V36.1391Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_1_3)">
        <rect
          x="14"
          y="14"
          width="92"
          height="92"
          fill="url(#paint0_linear_1_3)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1_3"
          x1="14"
          y1="60"
          x2="106"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00D3F2" />
          <stop offset="1" stop-color="#1447E6" />
        </linearGradient>
      </defs>
    </svg>
  );
};
