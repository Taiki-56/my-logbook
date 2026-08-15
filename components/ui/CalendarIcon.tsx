/** Calendar glyph icon used to mark dates. */
const CalendarIcon = ({ size = 12 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0">
    <path
      d="M10 1H9V0H8V1H4V0H3V1H2C1.448 1 1 1.448 1 2V11C1 11.552 1.448 12 2 12H10C10.552 12 11 11.552 11 11V2C11 1.448 10.552 1 10 1ZM10 11H2V4H10V11Z"
      fill="#5E5E5E"
    />
  </svg>
);

export default CalendarIcon;
