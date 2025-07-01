const EmailIcon = ({
  width = '1.5rem',
  height = '1.5rem',
  style = {
    fill: 'none',
    stroke: 'white',
    display: 'inline-block',
    marginLeft: '.5rem',
  },
  ...props
}) => (
  <svg
    viewBox="0 0 439.371 331.469"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width={width}
    height={height}
    style={style}
    {...props}
  >
    <g transform="translate(-145.3305,-145.3305)">
      <path
        d="M569.374,461.472 L569.374,160.658 L160.658,160.658 L160.658,461.472 Z"
        strokeWidth="15"
      />
      <path
        d="M164.46,164.49 L340.78,343.158 C353.849,356.328 377.63,356.172 390.423,343.278 L566.622,165.928"
        strokeWidth="15"
      />
      <path
        d="M170.515,451.566 L305.61,313.46"
        strokeWidth="15"
      />
      <path
        d="M557.968,449.974 L426.515,315.375"
        strokeWidth="15"
      />
    </g>
  </svg>
);

export default EmailIcon;