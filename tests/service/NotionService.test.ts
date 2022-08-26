import { jest, test, expect } from "@jest/globals";
import { NotionService } from "../../src/service/NotionService";

jest.mock("../../src/service/gasWrapper/HttpService", () => ({
    __esModule: true,
    HttpService: {
        post: jest.fn(() => ({responseCode: 200, body: "{\"test\": true}"}))
    }
}));

jest.mock("../../src/service/gasWrapper/PropertyService", () => ({
    __esModule: true,
    PropertyService: {
        getProperty: jest.fn(() => "propertyvalue")
    }
}));

test("tests are working", () => {
    let result = NotionService.loadTasks();
    expect(result).not.toBeNull();
});