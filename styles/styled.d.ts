import "styled-components";

declare module "styled-components"{
  export interface DefaultTheme{
    bgColor : string;
    fontColor : string;
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
    };
  }
}
