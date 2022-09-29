import { BaseTask } from "../type/BaseData";
import { NotionTask } from "../type/NotionQueryResult";

/**
 * Converts a list of NotionTasks extracting the interesting data into a cleaner format
 * 
 * @param results List of tasks returned by Notion
 * @returns Returns the same list, converted
 */
export function convertNotionTasks(results: NotionTask[]): BaseTask[] {

  return results.map(task => ({
    notionId: task.id,
    category: task.properties.Categoria.select.name,
    date: new Date(task.properties.Data.date.start),
    notionTitle: task.properties.Name.title[0].plain_text,
    notionUrl: task.url
  }));

}