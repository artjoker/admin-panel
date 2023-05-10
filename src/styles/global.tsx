import { COLORS, DEVICES } from '@/theme';

const GlobalStyles = () => (
  <style>
    {`
      body {
        color: ${COLORS.DARKEST_GRAY};
      }
      body a {
        text-decoration: none;
      }
      #root{
        height: 100%;
      }

      .toast-notification {
        text-align: end;
        margin: 0 1rem;

        &:first-child {
          margin: 3.5rem 1rem 0;
        }

        @media screen and ${DEVICES.LAPTOP_S} {
          margin: 0 3rem;

          &:first-child {
            margin: 4rem 3rem 0;
          }
        }
      }
    `}
  </style>
);

export default GlobalStyles;
