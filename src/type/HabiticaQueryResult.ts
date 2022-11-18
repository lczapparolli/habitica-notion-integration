export interface HabiticaQueryResult {
    success: boolean;
    data: Array<HabiticaTask>;
    notifications: Array<any>;
    appVersion: string;
}

export interface HabiticaTask {
    challenge: any;
    group: any;
    completed: boolean;
    collapseChecklist: boolean;
    type: "todo";
    notes: string;
    tags: Array<string>;
    value: number;
    priority: number;
    attribute: string;
    byHabitica: boolean;
    checklist: Array<any>;
    reminders: Array<any>;
    createdAt: string;
    updatedAt: string;
    _id: string;
    text: string;
    userId: string;
    id: string;
}