import { jest, test, expect } from "@jest/globals";
import { post } from "../../src/service/gasWrapper/HttpService";
import { loadTasks } from "../../src/service/NotionService";

jest.mock("../../src/service/gasWrapper/HttpService");
jest.mock("../../src/service/gasWrapper/PropertyService", () => ({
    __esModule: true,
    getProperty: jest.fn(() => "propertyvalue")
}));

const mockedPost = jest.mocked(post);

test("tests are working", () => {
    mockedPost.mockReturnValue({responseCode: 200, body: "{\"test\": true}"});
    let result = loadTasks();
    expect(result).toStrictEqual({ test: true });
});