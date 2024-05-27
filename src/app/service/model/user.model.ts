import { Subscription } from "./subscription";

export interface User {
  fisrtName?: string;
  lastName?: string;
  email?: string;
  subscription?: Subscription;
  imageUrl?:string;
}
