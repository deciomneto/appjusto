import * as React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

export const IconBetaSmall = (props: SvgProps) => {
  return (
    <Svg width={50} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect width={50} height={24} rx={12} fill="#FFBE00" />
      <Path
        d="M16.691 11.817c-.022.008-.034.023-.034.046 0 .015.012.03.034.046.707.358 1.06.975 1.06 1.851 0 .739-.248 1.299-.744 1.68-.496.373-1.147.56-1.951.56h-2.864c-.128 0-.192-.065-.192-.194V8.194c0-.13.064-.194.192-.194h2.774c1.782 0 2.672.731 2.672 2.194 0 .77-.315 1.31-.947 1.623zm-3.033-2.434c-.045 0-.068.023-.068.068v1.76c0 .046.023.069.068.069h1.308c.353 0 .628-.084.823-.251.196-.168.293-.397.293-.686 0-.297-.098-.53-.293-.697-.195-.176-.47-.263-.823-.263h-1.308zm1.398 5.223c.346 0 .617-.088.812-.263.195-.183.293-.43.293-.743 0-.312-.098-.556-.293-.731-.196-.183-.47-.275-.823-.275h-1.387c-.045 0-.068.023-.068.069v1.874c0 .046.023.069.068.069h1.398zm9.418-5.417c0 .13-.064.194-.192.194H20.65c-.045 0-.068.023-.068.068V11.2c0 .046.023.069.068.069h2.357c.127 0 .191.064.191.194v.994c0 .13-.064.194-.192.194H20.65c-.045 0-.068.023-.068.069v1.829c0 .045.023.068.068.068h3.63c.129 0 .193.065.193.194v.995c0 .13-.064.194-.192.194h-5.097c-.128 0-.192-.065-.192-.194V8.194c0-.13.064-.194.192-.194h5.097c.128 0 .192.065.192.194v.995zM30.969 8c.128 0 .191.065.191.194V9.2c0 .13-.063.194-.191.194h-1.951c-.045 0-.068.023-.068.069v6.343c0 .13-.064.194-.191.194h-1.207c-.128 0-.192-.065-.192-.194V9.463c0-.046-.022-.069-.067-.069h-1.895c-.128 0-.192-.064-.192-.194V8.194c0-.13.064-.194.192-.194h5.57zm5.554 8c-.106 0-.177-.053-.215-.16l-.315-1.063c-.008-.038-.03-.057-.068-.057h-2.763c-.037 0-.06.019-.067.057l-.316 1.063c-.038.107-.11.16-.214.16h-1.309c-.067 0-.116-.019-.146-.057-.03-.046-.034-.1-.011-.16L33.5 8.16c.037-.107.108-.16.214-.16h1.657c.106 0 .177.053.215.16l2.402 7.623a.161.161 0 01.011.068.156.156 0 01-.045.115.2.2 0 01-.124.034h-1.308zm-3.034-2.606c-.007.054.012.08.057.08h1.996c.045 0 .063-.026.056-.08L34.583 9.91c-.007-.03-.022-.046-.045-.046-.015 0-.03.015-.045.046l-1.004 3.485z"
        fill="#000"
      />
    </Svg>
  );
};