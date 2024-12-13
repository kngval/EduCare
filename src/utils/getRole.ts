import { jwtDecode } from "jwt-decode";
import { JwtDecodeType } from "../types/JwtDecode.types";

export function getRole(token:string): string | null { 
  if(token != null){
    const role = jwtDecode<JwtDecodeType>(token).role
    return role;
  }
  return null;
}
