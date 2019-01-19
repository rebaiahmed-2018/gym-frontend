import { Exercice } from "./exercice";
import { Member } from "./member";
import { Coach } from "./coach";

export class TrainingSession {
    constructor(public exercices: Exercice[], public member: Member, public coach: Coach, public date: Date) { }
}
