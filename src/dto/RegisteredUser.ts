import { Documnets } from "./documents";
import { Address } from "./address";
import { EmergencyContact } from "./emergencyContact";
import { Sacraments } from "./sacraments";

export type RegisteredUser = {
  id: number;
  username: string;
  password: string;
  active: boolean;
  created: Date;
  updated: Date;
  userType: UserType | undefined;
  access?: number;
  email?: string;
  phone?: string;
  marriage?: MarriageStatus | undefined;
  documents?: Documnets | undefined;
  address?: Address | undefined;
  emergency?: EmergencyContact[] | undefined;
  sacraments?: Sacraments | undefined;
};

export enum UserType {
  Father = "Father",
  Deacon = "Deacon",
  TeamMember = "TeamMember",
  Candidate = "Candidate",
  Catechumen = "Catechumen",
  Sponsor = "Sponsor",
  Other = "Other",
}

export enum MarriageStatus {
  Single = "Single",
  Cohabitation = "Cohabitation",
  Civilly = "Civilly",
  CatholicChurch = "Catholic Church",
}
