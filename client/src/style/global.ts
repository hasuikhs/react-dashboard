import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .red_ico:after {
    content: '*';
    color: red;
  }

  .tc { text-align: center !important; }
  .tl { text-align: left !important; }
  .tr { text-align: right !important; }

  .fl { float: left !important; }
  .fr { float: right !important; }

  .fs12 { font-size: 12px;}

  .color-gray { color: gray; }
  .color-red { color: red; }
`;

export default GlobalStyles;