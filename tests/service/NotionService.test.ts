import { jest, test, expect, describe } from "@jest/globals";
import { post } from "../../src/service/gasWrapper/HttpService";
import { loadTasks } from "../../src/service/NotionService";
import fs from "fs";

jest.mock("../../src/service/gasWrapper/HttpService");
jest.mock("../../src/service/gasWrapper/PropertyService", () => ({
    __esModule: true,
    getProperty: jest.fn(() => "propertyvalue")
}));

const mockedPost = jest.mocked(post);

describe("NotionService", () => {
    describe("loadTasks", () => {
        test("method should return a list of tasks", () => {
            mockedPost.mockReturnValueOnce({ responseCode: 200, body: fs.readFileSync(`${__dirname}/testData/notionTaskList_noMore.json`)});
            
            let result = loadTasks();
            
            expect(result).toHaveLength(2);
            expect(post).toHaveBeenCalledTimes(1);
        });

        test("method should query database while have more data", () => {
            mockedPost.mockReturnValueOnce({ responseCode: 200, body: fs.readFileSync(`${__dirname}/testData/notionTaskList_more.json`)})
                .mockReturnValueOnce({ responseCode: 200, body: fs.readFileSync(`${__dirname}/testData/notionTaskList_noMore.json`)});
            
            let result = loadTasks();
            
            expect(result).toHaveLength(4);
            expect(post).toHaveBeenCalledTimes(2);
        });
    });
});