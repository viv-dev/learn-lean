export const xxs = '320px';
export const xs = '600px';
export const sm = '960px';
export const md = '1280px';
export const lg = '1920px';
export const xl = '2560px';
export const xxl = '5000px';

export const ltXs = '(max-width: 599px)';
export const ltSm = '(max-width: 959px)';
export const ltMd = '(max-width: 1279px)';
export const ltLg = '(max-width: 1920px)';
export const gtLg = '(min-width: 1921px)';

export enum BreakPointEnum {
  MOBILE = 'mobile', // < 600px
  TABLET = 'tablet', // >= 600px  && < 960px
  MEDIUM = 'medium', // >= 960px && < 1280px
  DESKTOP = 'desktop', // >= 1280px && <= 1920px
  WIDE = 'wide', // > 1920px
}
