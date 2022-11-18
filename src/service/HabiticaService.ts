import { get, HttpRequestParam, HttpResponse } from "./gasWrapper/HttpService";
import { HabiticaQueryResult, HabiticaTask } from "../type/HabiticaQueryResult";
import { getProperty } from "./gasWrapper/PropertyService";

const HABITICA_DATA = {
    BASE_URL: "https://habitica.com/api/v3/tasks",
    X_CLIENT: "d36c7f74-2e9c-4b63-a49f-42a00cc5fd1f-HabiticaNotionIntegration"
};

/**
 * Finds all incomplete tasks
 * 
 * @returns Returns the list of tasks returned by Habitica API
 */
export function loadTasks(): Array<HabiticaTask> {
    const params: HttpRequestParam = {
        headers: {
            "x-client": HABITICA_DATA.X_CLIENT,
            "x-api-user": getProperty("HABITICA_API_USER")!,
            "x-api-key": getProperty("HABITICA_API_KEY")!
        },
        contentType: "application/json"
    };

    const result: HabiticaQueryResult = JSON.parse(get(getUrl(), params).body);
    if (result.success) {
        return result.data;
    }
    return [];
}

/**
 * Generate the URL to access Habitica API
 *
 * @returns Returns the generated URL
 */
function getUrl(): string {
    return `${HABITICA_DATA.BASE_URL}/user?type=todos`;
}