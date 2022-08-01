const NOTION_DATA = {
  BASE_URL: "https://api.notion.com/v1/databases/",
  API_VERSION: "2022-02-22"
};


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