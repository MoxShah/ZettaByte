import { Teams } from "./Teams";

export class Groups {
    _id: string;
    name: string;
    groupId: string;
    description: string;
    techStack: string;
    Teams: Teams[];
}

export interface IAlert {
    id: number;
    type: string;
    message: string;
}