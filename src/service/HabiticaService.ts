import { get } from "./gasWrapper/HttpService";


export function loadTasks(): Array<HabiticaTask> {
    return get()
}