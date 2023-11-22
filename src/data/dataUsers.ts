import { RegisteredUser, UserType } from "../dto/RegisteredUser";

export const USERS: RegisteredUser[] = [];

export function addUser(newUser: RegisteredUser) {
  USERS.push(newUser);
}

export function getUserExistsByUsername(username: string) {
  let user = USERS.find(
    (element) => element.username.toLowerCase() == username.toLowerCase()
  );

  if (user) return false;
  else return true;
}

export function getUserByUsername(username: string) {
  let user = USERS.find(
    (element) =>
      element.username.toLowerCase() == username.toLowerCase() &&
      element.active == true
  );

  return user;
}

export function assignUserType(usertype: string) {
  if (usertype.toLowerCase() == UserType.Father.toString().toLowerCase())
    return UserType.Father;
  if (usertype.toLowerCase() == UserType.Deacon.toString().toLowerCase())
    return UserType.Deacon;
  if (usertype.toLowerCase() == UserType.TeamMember.toString().toLowerCase())
    return UserType.TeamMember;
  if (usertype.toLowerCase() == UserType.Candidate.toString().toLowerCase())
    return UserType.Candidate;
  if (usertype.toLowerCase() == UserType.Catechumen.toString().toLowerCase())
    return UserType.Catechumen;
  if (usertype.toLowerCase() == UserType.Sponsor.toString().toLowerCase())
    return UserType.Sponsor;

  // if all else fails
  return UserType.Other;
}
