import { Coach } from "./coach";
import { Member } from "./member";

export class Event {
    id: String;
    name: String;
    members: Member[];
    coaches: Coach[];
    constructor(name: String, members: Member[], coaches: Coach[]) {
            this.members = members;
            this.coaches = coaches;
            this.name = name;
        }
}
