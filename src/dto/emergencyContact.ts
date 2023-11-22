import { Address } from "./address";

export type EmergencyContact = {
  name: string;
  relation: string;
  phone?: string;
  address?: Address | undefined;
};
