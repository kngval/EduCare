import { JwtHeader } from "jwt-decode";

export interface JwtDecodeType extends JwtHeader {
  role : string; 
}
