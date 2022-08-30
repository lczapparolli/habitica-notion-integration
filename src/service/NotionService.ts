import { NotionQueryParams } from "../type/NotionQueryParams";
import { NotionQueryResult } from "../type/NotionQueryResult";
import { HttpRequestParam, HttpService } from "./gasWrapper/HttpService";
import { PropertyService } from "./gasWrapper/PropertyService";

export namespace NotionService {
    const NOTION_DATA = {
        BASE_URL: "https://api.notion.com/v1/databases",
        API_VERSION: "2022-02-22"
    };

    /**
     * Generates the URL for notion database query
     * 
     * @returns The URL for database access
     */
    function getUrl(): string {
        return `${NOTION_DATA.BASE_URL}/${PropertyService.getProperty("NOTION_DATABASE_ID")}/query`;
    }

    /**
     * Queries Notion database for pending tasks
     * 
     * @returns Return the database content
     */
    export function loadTasks(start_cursor?: string): NotionQueryResult {
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
                "Authorization": "Bearer " + PropertyService.getProperty("NOTION_API_TOKEN"),
                "Notion-Version": NOTION_DATA.API_VERSION
            }
        };

        let response = HttpService.post(getUrl(), JSON.stringify(payload), params);
        return JSON.parse(response.body);
    }

}

/*


function listUncompletedTasks() {
  let url = NOTION_DATA.BASE_URL + NOTION_DATA.DATABASE_ID + "/query";
  var payload = {
    "filter": {
        "and": [
            {
                "property": "Status",
                "select": { "does_not_equal": "Feito 🙌" }
            },
            {
                "property": "Tipo",
                "select": { "equals": "Tarefa" }
            },
            {
                "property": "Para a semana",
                "checkbox": { "equals": true }
            }
        ]
    }
  };

  var headers = {
    "Notion-Version": NOTION_DATA.API_VERSION,
    "Authorization": "Bearer " + NOTION_DATA.API_TOKEN
  };

  var params = {
    "headers": headers,
    "method" : "post",
    "payload" : JSON.stringify(payload),
    "contentType": "application/json",
    "muteHttpExceptions" : true,
  };

  var result = UrlFetchApp.fetch(url, params);
  var json = JSON.parse(result.getContentText());
  var tasks = json.results.map(task => transformTask(task))
  console.log({ tasks });
  criarTarefas(tasks);
}

function transformTask(task) {
  var id = task.id;
  var link = task.url;
  var title = task.properties.Name.title.length === 0 ? "" : task.properties.Name.title[0].plain_text;
  var date = task.properties.Data.date.start;
  return {id, link, title, date };
}
*/