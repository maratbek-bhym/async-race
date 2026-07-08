type Props = {
  color: string;
};

export default function CarSvg({ color }: Props) {
  return (
    <svg className="car-svg" viewBox="0 0 120 50" aria-hidden="true" focusable="false">
      <path
        fill={color}
        stroke="rgba(0, 0, 0, 0.35)"
        strokeWidth="2"
        d="M8 36 C6 28 12 24 20 23 L36 13 C40 10 46 9 54 9 L68 9 C78 9 86 13 92 19
           L97 23 C106 24 112 27 112 33 L111 37 C110 39 108 40 105 40 L15 40 C11 40 9 39 8 36 Z"
      />
      <path
        fill="rgba(255, 255, 255, 0.4)"
        d="M40 15 L52 12 L52 22 L34 22 Z M56 12 L66 12 C72 12 78 15 82 19 L84 22 L56 22 Z"
      />
      <circle cx="30" cy="40" r="8" fill="#15171c" stroke="#3a3f4c" strokeWidth="2" />
      <circle cx="30" cy="40" r="3" fill="#8f96a3" />
      <circle cx="90" cy="40" r="8" fill="#15171c" stroke="#3a3f4c" strokeWidth="2" />
      <circle cx="90" cy="40" r="3" fill="#8f96a3" />
    </svg>
  );
}
