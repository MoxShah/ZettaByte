import { TeamMembers } from "./TeamMembers";

export interface Teams {
    _id: string,
    name: string,
    description: string,
    techStack: string,
    groupId: string,
    teamMembers: TeamMembers[]
}