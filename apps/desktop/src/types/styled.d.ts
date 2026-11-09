import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
      primary: string;
      content: string;
    };
    fonts: {
      color: {
        primary: string;
        secondary: string;
      };
    };
    general: {
      borderRadius: string;
    };
  }
}
