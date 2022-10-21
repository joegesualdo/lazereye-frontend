import React from 'react'
import { css, cx } from '@emotion/css'

interface LogoProps {}

const Logo: React.FC<LogoProps> = ({}: LogoProps) => (
  <div style={{ width: '100%', maxWidth: 500, margin: 'auto' }}>
    <svg
      width="100%"
      height="auto"
      preserveAspectRatio={true}
      viewBox="0 0 572 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 88V3.99999H24.48V71.02H60.96V88H7.5ZM12.18 83.44H56.4V75.7H19.86V8.5H12.18V83.44ZM84.4678 88L72.1078 75.64V58.54L84.4678 46.18H117.108V43.84L113.448 40.18H72.9478V23.2H121.728L134.088 35.56V75.64L121.728 88H84.4678ZM90.6478 75.7L84.4678 69.58V63.22L89.6878 58H122.088V69.28L115.668 75.7H90.6478ZM86.8678 83.38H119.448L129.828 73V37.9L119.688 27.76H77.8678V35.44H115.908L122.088 41.62V50.62H86.5678L76.7878 60.34V73.3L86.8678 83.38ZM92.7478 71.02H113.448L117.108 67.36V62.56H91.5478L89.0278 65.08V67.36L92.7478 71.02ZM152.802 83.26H193.962V75.58H162.462V67.6L193.062 45.94V27.76H152.922V35.5H183.582V43.66L152.802 65.62V83.26ZM147.342 88V64.06L178.242 41.98V40.18H148.482V23.2H198.342V47.62L167.862 69.1V71.02H198.342V88H147.342ZM261.181 23.2L273.541 35.56V52.66L261.181 65.02H228.541V67.36L232.201 71.02H272.701V88H223.921L211.561 75.64V35.56L223.921 23.2H261.181ZM255.001 35.5L261.181 41.62V47.98L255.961 53.2H223.561V41.92L229.981 35.5H255.001ZM258.781 27.82H226.201L215.821 38.2V73.3L225.961 83.44H267.781V75.76H229.741L223.561 69.58V60.58H259.081L268.861 50.86V37.9L258.781 27.82ZM252.901 40.18H232.201L228.541 43.84V48.64H254.101L256.621 46.12V43.84L252.901 40.18ZM286.795 88V71.08H298.435V41.02L297.535 40.12H286.915V23.2H302.095L306.175 28L310.795 23.2H334.135L347.275 36.34L334.195 49.06L325.915 40.18H319.075L315.415 43.84V71.14H327.055V88H286.795ZM291.175 83.38H322.735V75.7H310.795V41.2L316.375 35.62H328.615L334.855 42.46L340.795 36.64L332.335 27.94H312.595L306.475 34.18L300.775 27.94H291.235V35.62H299.035L303.055 40V75.7H291.175V83.38ZM405.322 23.2L417.682 35.56V52.66L405.322 65.02H372.682V67.36L376.342 71.02H416.842V88H368.062L355.702 75.64V35.56L368.062 23.2H405.322ZM399.142 35.5L405.322 41.62V47.98L400.102 53.2H367.702V41.92L374.122 35.5H399.142ZM402.922 27.82H370.342L359.962 38.2V73.3L370.102 83.44H411.922V75.76H373.882L367.702 69.58V60.58H403.222L413.002 50.86V37.9L402.922 27.82ZM397.042 40.18H376.342L372.682 43.84V48.64H398.242L400.762 46.12V43.84L397.042 40.18ZM443.296 88L430.936 75.64V23.2H447.916V67.36L451.576 71.02H466.276L472.276 65.02V23.2H489.196V99.64L476.836 112H433.936V95.08H467.416L472.276 90.22V86.8L471.076 88H443.296ZM439.156 107.5H474.076L484.636 96.7V27.76H476.956V66.46L467.716 75.58H449.356L443.296 69.52V27.76H435.556V73.24L445.576 83.32H469.756L476.956 76.12V92.44L469.756 99.76H439.156V107.5ZM552.861 23.2L565.221 35.56V52.66L552.861 65.02H520.221V67.36L523.881 71.02H564.381V88H515.601L503.241 75.64V35.56L515.601 23.2H552.861ZM546.681 35.5L552.861 41.62V47.98L547.641 53.2H515.241V41.92L521.661 35.5H546.681ZM550.461 27.82H517.881L507.501 38.2V73.3L517.641 83.44H559.461V75.76H521.421L515.241 69.58V60.58H550.761L560.541 50.86V37.9L550.461 27.82ZM544.581 40.18H523.881L520.221 43.84V48.64H545.781L548.301 46.12V43.84L544.581 40.18Z"
        fill="#FF2D55"
      />
      <g filter="url(#filter0_d_83_32)">
        <line
          x1="411.5"
          y1="104.5"
          x2="8.5"
          y2="104.5"
          stroke="#FF2D55"
          stroke-width="5"
          stroke-linecap="round"
        />
      </g>
      <g filter="url(#filter1_d_83_32)">
        <path
          d="M565 6L45 6"
          stroke="#FF2D55"
          stroke-width="5"
          stroke-linecap="round"
        />
      </g>
      <g filter="url(#filter2_d_83_32)">
        <line
          x1="563.5"
          y1="104.5"
          x2="504.5"
          y2="104.5"
          stroke="#FF2D55"
          stroke-width="5"
          stroke-linecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_83_32"
          x="3"
          y="99"
          width="414"
          height="11"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.176471 0 0 0 0 0.333333 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_83_32"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_83_32"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_83_32"
          x="39.5"
          y="0.5"
          width="531"
          height="11"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.176471 0 0 0 0 0.333333 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_83_32"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_83_32"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_83_32"
          x="499"
          y="99"
          width="70"
          height="11"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.176471 0 0 0 0 0.333333 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_83_32"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_83_32"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </div>
)

export default Logo
