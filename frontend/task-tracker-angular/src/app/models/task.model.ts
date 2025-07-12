// This is an interface of the task model to be used in this project
export interface Task {
    id: number,
    title: string,
    description: string,
    status: 0 | 1 | 2 | 3 | 4,
    priority?: 'high' | 'medium' | 'low',
    dueDate?: string,
    createdDate?: string,
    updatedDate?: string,
    userName?: string,
    tags?: string[],
    blockedDesc?: string
}