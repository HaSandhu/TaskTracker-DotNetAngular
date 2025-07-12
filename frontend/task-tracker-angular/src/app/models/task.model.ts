// This is an interface of the task model to be used in this project
export interface Task {
    id: number,
    title: string,
    description: string,
    status: 'ToDo' | 'InProgress' | 'Blocked' | 'Done' | 'Deleted'
    priority?: 'High' | 'Medium' | 'Low',
    dueDate?: string,
    createdDate?: string,
    updatedDate?: string,
    userName?: string,
    tags?: string[],
    blockedDesc?: string
}