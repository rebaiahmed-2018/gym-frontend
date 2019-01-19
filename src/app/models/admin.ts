import { RolesEnum } from "../utils/roles-enum.enum";

export class Admin {
  constructor (public nom: String, public prenom: String, public dateNaissance: Date, public email: String,
    public username: String, public password: String, public roles: Array<RolesEnum>) { }
}
