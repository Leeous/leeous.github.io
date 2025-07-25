const BlueskyIcon = ({
  width = '1.5rem',
  height = '1.5rem',
  style = {
    fill: 'white',
    display: 'inline-block',
    marginLeft: '.5rem',
  },
  stroke = "white",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width={width}
    height={height}
    style={style}
    {...props}
  >
    <g
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M19.9,3.5 C20.85,3.5 21.34875,4.4025 21.39625,5.350125 L21.4,5.5 
           C21.4,6.05446404 21.3269891,7.48313344 21.1809945,9.78600994 
           C21.0389293,12.0167035 19.2882204,13.7824621 17.1020899,13.9813405 
           C18.5799137,14.403371 20,15.1676683 20,16.5 
           C20,18 16.5,21.5 15,21.5 
           C13.5972917,21.5 12.4306943,19.6111131 11.5002078,15.8333394 
           L11.3283556,16.4993931 
           C10.4270327,19.833131 9.31769565,21.5 8,21.5 
           C6.5,21.5 3,18 3,16.5 
           C3,15.1736779 4.40730428,14.4102775 5.87800492,13.9858141 
           C3.65451601,13.8252583 1.86279501,12.0437791 1.71900553,9.78600994 
           L1.58393127,7.53475816 
           C1.52797925,6.52149222 1.5,5.84323964 1.5,5.5 
           C1.5,4.5 2,3.5 3,3.5 
           C6.93646865,3.5 10.388694,9.79516282 11.4504675,11.4247893 
           L11.7721074,10.9140922 
           C13.1024262,8.76924222 16.29855,3.5 19.9,3.5 Z"
        stroke={stroke}
      />
    </g>
  </svg>
);

export default BlueskyIcon;