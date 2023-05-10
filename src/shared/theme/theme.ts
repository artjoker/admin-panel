export const COLORS = {
  WHITE: '#ffffff',
  BLACK: '#121212',
  BLUE_PRIMARY: '#26A2BA',
  BLUE_PRIMARY_HOVER: '#36bdda',
  BLUE_PRIMARY_ACTIVE: '#1e909f',
  LIGHT_BLUE: '#85BFCD',
  VIOLET_PRIMARY: '#a436f0',
  VIOLET_PRIMARY_HOVER: '#bb39ff',
  VIOLET_PRIMARY_ACTIVE: '#812abd',
  DARKEST_GRAY: '#333532',
  DARK_GRAY: '#808080',
  LIGHTEST_GRAY: '#FBFBFB',
  LIGHT_GRAY: '#EDEDED',
  DIVIDER: '#D6D6D6',
  RED: '#EB5757',
  RED_HOVER: '#b74444',
  YELLOW: '#F6C16B',
  GREEN: '#27AE60',
  CELL_GREEN: '#d2e4e1',
  CELL_RED: '#f6dade',
  MAIN_BG: '#E7F2F5',
  HIGHLIGHTED: '#ffc069',
};

export const FONT_WEIGHTS = {
  BOLD: 700,
  SEMI_BOLD: 600,
  NORMAL: 400,
};

export const FONT_SIZES = {
  '12': '0.75rem',
  '14': '0.875rem',
  '16': '1rem',
  '18': '1.125rem',
  '20': '1.25rem',
  '22': '1.375rem',
  '24': '1.5rem',
  '26': '1.6rem',
  '28': '1.75rem',
  '30': '1.875rem',
  '32': '2rem',
  '36': '2.25rem',
  '40': '2.5rem',
  '46': '2.9rem',
  '48': '3rem',
  '56': '3.5rem',
};

export const MOBILE_LAYOUT_MAX_WIDTH = 1024;

const SCREEN_SIZES = {
  MOBILE_S: '320px',
  MOBILE: '375px',
  MOBILE_L: '425px',
  MOBILE_XL: '480px',
  TABLET_S: '641px',
  TABLET: '834px',
  LAPTOP_S: '1025px',
  LAPTOP_M: '1366px',
  LAPTOP: '1440px',
  DESKTOP: '1920px',
  DESKTOP_L: '2560px',
};

export const DEVICES = {
  MOBILE_S: `(min-width: ${SCREEN_SIZES.MOBILE_S})`,
  MOBILE: `(min-width: ${SCREEN_SIZES.MOBILE})`,
  MOBILE_L: `(min-width: ${SCREEN_SIZES.MOBILE_L})`,
  MOBILE_XL: `(min-width: ${SCREEN_SIZES.MOBILE_XL})`,
  TABLET_S: `(min-width: ${SCREEN_SIZES.TABLET_S})`,
  TABLET: `(min-width: ${SCREEN_SIZES.TABLET})`,
  LAPTOP_S: `(min-width: ${SCREEN_SIZES.LAPTOP_S})`,
  LAPTOP_M: `(min-width: ${SCREEN_SIZES.LAPTOP_M})`,
  LAPTOP: `(min-width: ${SCREEN_SIZES.LAPTOP})`,
  DESKTOP: `(min-width: ${SCREEN_SIZES.DESKTOP})`,
  DESKTOP_L: `(min-width: ${SCREEN_SIZES.DESKTOP_L})`,
};
