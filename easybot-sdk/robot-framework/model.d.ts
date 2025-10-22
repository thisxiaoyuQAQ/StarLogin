/// <reference path="index.d.ts" />

declare class UserProfile {
    Id: string;
    Name: string;
    Nick?: string;
}

declare class MemberInfo {
    GroupId: number;
    UserId: number;
    NickName: string;
    Card: string;
    Sex: string;
    Age: number;
    Role: string;
    Title: string;
}

declare class RobotProfile {
    Id: string;
    Name: string;
    IsActive: boolean;
}
