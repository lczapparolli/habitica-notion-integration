const HABITICA_DATA = {
  BASE_URL: "https://habitica.com/api/v3/",
  USER_TASK_URL: "tasks/user"
};

const AUTHOR_ID = "d36c7f74-2e9c-4b63-a49f-42a00cc5fd1f";
const SCRIPT_NAME = "Habitica Notion Integration";
const HEADERS = {
  "x-client" : AUTHOR_ID + "-" + SCRIPT_NAME,
  "x-api-user" : HABITICA_DATA.USER_ID,
  "x-api-key" : HABITICA_DATA.API_TOKEN,
}

function criarTarefas(tarefas) {
  let url = HABITICA_DATA.BASE_URL + HABITICA_DATA.USER_TASK_URL;
  for (var tarefa of tarefas) {
    let payload = {
      "text": tarefa.title,
      "type": "todo"
    };
    let params = {
      "headers": HEADERS,
      "method" : "post",
      "payload" : JSON.stringify(payload),
      "contentType": "application/json",
      "muteHttpExceptions" : true,
    };

    let result = UrlFetchApp.fetch(url, params);
    let json = JSON.parse(result.getContentText());
    console.log({ json });
    if (tarefas.length > 1) {
      Utilities.sleep(2000);
    }
  }
}
