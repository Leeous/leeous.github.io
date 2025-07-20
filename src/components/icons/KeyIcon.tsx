const KeyIcon = ({
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
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width={width}
    height={height}
    style={style}
    {...props}
  >
    <polyline
      points="28.081,29.919 24,34 22,34 22,36 20,38 18,38 18,40 15,43 12,43 12,46 9,49 3,49 1,47 1,41 19.96,22.04"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
    <path
      d="M49,16c0,8.281-6.719,15-15,15s-15-6.719-15-15c0-8.282,6.719-15,15-15S49,7.718,49,16z"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
    <path
      d="M41.071,23.071L26.929,8.929c3.904-3.904,10.238-3.904,14.143,0S44.976,19.167,41.071,23.071z"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
    <line
      x1="1.61"
      y1="46.39"
      x2="18.282"
      y2="29.718"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
  </svg>
);

export default KeyIcon;