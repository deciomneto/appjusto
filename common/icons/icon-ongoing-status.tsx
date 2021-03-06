import * as React from 'react';
import Svg, { Circle, G, Mask, Path, Rect, SvgProps } from 'react-native-svg';

export const IconOngoingStatus = (props: SvgProps) => {
  return (
    <Svg width={65} height={65} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle
        cx={32.25}
        cy={32.25}
        r={31.694}
        fill="#6CE787"
        stroke="#6CE787"
        strokeWidth={1.112}
      />
      <Mask id="prefix__a" maskUnits="userSpaceOnUse" x={0} y={-17} width={65} height={82}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M64.5-16.125H0v50.599h.075C1.218 51.248 15.186 64.5 32.25 64.5c17.064 0 31.032-13.252 32.174-30.026h.076v-50.599z"
          fill="#C4C4C4"
        />
      </Mask>
      <G mask="url(#prefix__a)">
        <Path
          d="M12.372 17.69a.691.691 0 011.137-.527l2.9 2.45c.353.297.84.375 1.268.204l4.04-1.616a.691.691 0 01.514 0l4.18 1.673c.328.13.695.117 1.011-.038l4.148-2.027a.691.691 0 01.584-.011l4.134 1.837c.322.143.69.143 1.013 0l4.153-1.846a.691.691 0 01.56 0l4.009 1.781c.426.19.921.126 1.285-.165l2.906-2.325a.691.691 0 011.122.54v53.452a.69.69 0 01-.69.691H13.062a.691.691 0 01-.691-.69V17.69z"
          fill="#fff"
          stroke="#000"
          strokeWidth={0.556}
        />
        <Rect
          x={16.995}
          y={62.59}
          width={14.385}
          height={2.153}
          rx={1.076}
          fill="#fff"
          stroke="#000"
          strokeWidth={0.485}
        />
        <Rect
          x={16.995}
          y={57.585}
          width={28.842}
          height={2.153}
          rx={1.076}
          fill="#fff"
          stroke="#000"
          strokeWidth={0.485}
        />
        <Rect
          x={16.995}
          y={52.025}
          width={28.842}
          height={2.153}
          rx={1.076}
          fill="#fff"
          stroke="#000"
          strokeWidth={0.485}
        />
        <Circle cx={23.91} cy={38.922} r={8.341} fill="#6CE787" />
        <Mask
          id="prefix__b"
          maskUnits="userSpaceOnUse"
          x={19.389}
          y={30.518}
          width={17}
          height={12}
          fill="#000"
        >
          <Path fill="#fff" d="M19.389 30.518h17v12h-17z" />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.255 41.298c.027.086.064.17.11.248.315.528.954.64 1.428.249l9.87-8.133c.474-.39.603-1.135.29-1.662-.315-.528-.954-.64-1.428-.249l-9.2 7.58-2.338-1.926c-.474-.39-1.113-.279-1.427.249-.314.528-.184 1.272.29 1.663l2.404 1.981z"
          />
        </Mask>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.255 41.298c.027.086.064.17.11.248.315.528.954.64 1.428.249l9.87-8.133c.474-.39.603-1.135.29-1.662-.315-.528-.954-.64-1.428-.249l-9.2 7.58-2.338-1.926c-.474-.39-1.113-.279-1.427.249-.314.528-.184 1.272.29 1.663l2.404 1.981z"
          fill="#fff"
        />
        <Path
          d="M23.366 41.546l-.417.248.417-.248zm-.111-.248l.461-.147-.043-.136-.11-.09-.308.373zm1.538.497l.308.374-.308-.374zm9.87-8.133l.308.374-.308-.373zm.29-1.662l.416-.248-.417.248zm-1.428-.249l-.308-.374.308.374zm-9.2 7.58l-.308.375.308.253.308-.253-.308-.374zm-2.338-1.926l.308-.373-.308.373zm-1.427.249l.417.248-.417-.248zm.29 1.663l-.308.374.308-.374zm2.932 1.981a.707.707 0 01-.066-.147l-.923.294c.038.12.09.237.156.349l.833-.496zm.702.123c-.244.202-.54.15-.702-.123l-.833.496c.466.783 1.448.954 2.152.375l-.617-.748zm9.87-8.133l-9.87 8.133.617.748 9.87-8.133-.616-.748zm.182-1.04a.854.854 0 01-.181 1.04l.616.748c.658-.542.834-1.55.398-2.284l-.833.495zm-.703-.123c.245-.202.54-.15.703.122l.833-.495c-.466-.783-1.449-.954-2.152-.375l.616.748zm-9.2 7.58l9.2-7.58-.616-.748-9.2 7.58.616.749zm-2.954-1.926l2.338 1.927.616-.748-2.338-1.926-.616.747zm-.702.123c.162-.273.457-.324.702-.123l.616-.748c-.703-.579-1.685-.408-2.151.375l.833.496zm.18 1.04a.854.854 0 01-.18-1.04l-.833-.496c-.437.733-.261 1.742.398 2.285l.616-.748zm2.406 1.982l-2.405-1.981-.616.748 2.404 1.981.617-.748z"
          fill="#000"
          mask="url(#prefix__b)"
        />
      </G>
    </Svg>
  );
};
