import { jest, describe, test, expect } from "@jest/globals";
import { get } from "../../src/service/gasWrapper/HttpService";
import fs from "fs";
import { loadTasks } from "../../src/service/HabiticaService";

jest.mock("../../src/service/gasWrapper/HttpService");
jest.mock("../../src/service/gasWrapper/PropertyService", () => ({
    __esModule: true,
    getProperty: jest.fn(() => "propertyvalue")
}));

const mockedGet = jest.mocked(get);

describe("HabiticaService", () => {
    describe("loadTasks", () => {
        test("method should return a list of tasks", () => {
            mockedGet.mockReturnValueOnce({ responseCode: 200, body: fs.readFileSync(`${__dirname}/testData/habiticaTaskList.json`)});
            
            var result = loadTasks();
            
            expect(result).toHaveLength(2);
            expect(get).toHaveBeenCalledTimes(1);
        });
    });
});