import { describe, test, expect } from "@jest/globals";
import { convertNotionTasks } from "../../src/service/ConversionService";
import { NotionTask } from "../../src/type/NotionQueryResult";
import fs from "fs";

describe("ConversionService", () => {
    describe("convertNotionTasks", () => {
        test("method should extract data from Notion Task", () => {
            const testNotionTask : NotionTask = JSON.parse(fs.readFileSync(`${__dirname}/testData/notionTask.json`, "utf8"));

            const result = convertNotionTasks([ testNotionTask ]);
            
            expect(result).toHaveLength(1);
            expect(result[0]).toHaveProperty("notionId", "5c2056eb-4a52-44c8-aeb1-58eeb2a15802");
            expect(result[0]).toHaveProperty("notionTitle", "Fix rack");
            expect(result[0]).toHaveProperty("notionUrl", "https://www.notion.so/Fix-rack-5c2056eb4a5244c8aeb158eeb2a15802");
            expect(result[0]).toHaveProperty("date", new Date("2022-10-01"));
            expect(result[0]).toHaveProperty("category", "Home");
        });

        test("method should return an array with the same size of the input", () => {
            const testNotionTask : NotionTask = JSON.parse(fs.readFileSync(`${__dirname}/testData/notionTask.json`, "utf8"));

            const result = convertNotionTasks([ testNotionTask, testNotionTask, testNotionTask ]);
            
            expect(result).toHaveLength(3);
        });
    });
});