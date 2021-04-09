import {} from "styled-components";
import { theme } from "globalStyles";

// Make usage of TS's type inference to declare the Theme shape as extension of SC declaration
declare module "styled-components" {
  type DefaultTheme = typeof theme;
  export type Theme = DefaultTheme & {};
}
