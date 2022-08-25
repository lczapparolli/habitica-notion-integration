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
    return `${NOTION_DATA.BASE_URL}/${PropertiesService.getScriptProperties().getProperty("NOTION_DATABASE_ID")}/query`;
  }

  /**
   * Queries Notion database for pending tasks
   * 
   * @returns Return the database content
   */
  export function loadTasks(): any {
    let payload = {
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

    let params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      payload: JSON.stringify(payload),
      contentType: "application/json",
      headers: {
        "Authorization": "Bearer " + PropertiesService.getScriptProperties().getProperty("NOTION_API_TOKEN"),
        "Notion-Version": NOTION_DATA.API_VERSION
      }
    };

    let response = UrlFetchApp.fetch(getUrl(), params);
    return JSON.parse(response.getContentText());
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