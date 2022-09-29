import { NotionQueryParams } from "../type/NotionQueryParams";
import { NotionQueryResult, NotionTask } from "../type/NotionQueryResult";
import { HttpRequestParam, post } from "./gasWrapper/HttpService";
import { getProperty } from "./gasWrapper/PropertyService";

const NOTION_DATA = {
    BASE_URL: "https://api.notion.com/v1/databases",
    API_VERSION: "2022-02-22"
};

/**
 * Finds all tasks scheduled for the current week
 * 
 * @returns Returns the list of tasks returned by the Notion API
 */
export function loadTasks(): Array<NotionTask> {
    let result: Array<NotionTask> = [];
    
    let queryResult: NotionQueryResult = queryNotion();
    result = result.concat(queryResult.results);
    while (queryResult.has_more) {
        queryResult = queryNotion(queryResult.next_cursor);
        result = result.concat(queryResult.results);
    }

    return result;
}

/**
 * Generates the URL for notion database query
 * 
 * @returns The URL for database access
 */
function getUrl(): string {
    return `${NOTION_DATA.BASE_URL}/${getProperty("NOTION_DATABASE_ID")}/query`;
}

/**
 * Queries Notion database for pending tasks
 * 
 * @returns Return the database content
 */
function queryNotion(start_cursor?: string): NotionQueryResult {
    let payload: NotionQueryParams = {
        filter: {
            and: [
                {
                    property: "Status",
                    select: { does_not_equal: "Feito 🙌" }
                },
                {
                    property: "Tipo",
                    select: { equals: "Tarefa" }
                },
                {
                    property: "Para a semana",
                    checkbox: { equals: true }
                }
            ]
        },
        start_cursor: start_cursor
    };

    let params: HttpRequestParam = {
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + getProperty("NOTION_API_TOKEN"),
            "Notion-Version": NOTION_DATA.API_VERSION
        }
    };

    let response = post(getUrl(), JSON.stringify(payload), params);
    return JSON.parse(response.body);
}
