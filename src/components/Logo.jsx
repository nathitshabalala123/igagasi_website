export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Igagasi Primary School crest"
    >
      <circle cx="50" cy="50" r="48" fill="#0b3556" stroke="#e3b23c" strokeWidth="3" />
      <path
        d="M20 26 L27 12 L34 26 L41 12 L48 26 L41 26 L34 18 L27 26 Z"
        fill="#e3b23c"
        transform="translate(11 0)"
      />
      <g fill="none" stroke="#f2ede1" strokeWidth="3.2" strokeLinecap="round">
        <path d="M14 56c6-7 11-7 17 0s11 7 17 0 11-7 17-0" />
        <path d="M14 68c6-7 11-7 17 0s11 7 17 0 11-7 17-0" />
      </g>
      <path
        d="M50 78c-9-3-15-10-15-19 0-6 4-10 8-10 3 0 5 2 7 5 2-3 4-5 7-5 4 0 8 4 8 10 0 9-6 16-15 19z"
        fill="#1e8a72"
      />
      <text
        x="50"
        y="46"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="700"
        fontSize="12"
        fill="#f2ede1"
      >
        IPS
      </text>
    </svg>
  )
}
