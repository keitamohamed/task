
export const ApiPath = {
    LOGIN: ('login'),
    REGISTER: ('user/register'),
    GET_CUSTOM_DATA: ('user/custom-data'),
    USER_PROJECT: (id: string) => `user/${id}/projects`,
    USER_TASK: (identifier: string) => `user/${identifier}/task-due-soon`,
    DELETE_PROJECT: (identifier: string) => `project/delete/${identifier}`,
    FIND_PROJECT: (identifier: string) => `project/find-by-identifier/${identifier}`,
    LOAD_TASK: (identifier: string) => `project/project-task/${identifier}`,
    DELETE_TASK: (taskID: number) => `project/delete-task${taskID}`
}