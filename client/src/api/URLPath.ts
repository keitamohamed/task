
export const ApiPath = {
    LOGIN: ('login'),
    REGISTER: ('user/register'),
    GET_CUSTOM_DATA: ('user/custom-data'),
    USER_PROJECT: (id: string) => `user/${id}/projects`,
    USER_TASK: (identifier: string) => `user/${identifier}/task-due-soon`,
    DELETE_PROJECT: (identifier: string) => `project/delete/${identifier}`,
    FIND_PROJECT: (identifier: string) => `project/find-by-identifier/${identifier}`,
    LOAD_PROJECT_TASK_SORT: (identifier: string) => `project/project-task/${identifier}`,
    ADD_NEW_PROJECT: (userID: number) => `project/${userID}/add`,
    UPDATE_PROJECT: (identifier: string) => `project/update/${identifier}`,
    ADD_TASK: (identifier: string) => `project/${identifier}/add-task`,
    UPDATE_TASK: (id: string) => `project/update-task/${id}`,
    LOAD_TASK: (identifier: string) => `project/project-task/${identifier}`,
    DELETE_TASK: (taskID: number) => `project/delete-task/${taskID}`
}