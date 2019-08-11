import { ApiResult } from "./apiResult";
import { Logger } from "./logger";

const mockResponse = () => {
    const res: {
        status?: any,
        json?: any
    } = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('ApiResult Error', () => {

    test('should 500 with correct error message', () => {
        // Setup
        const error = { message: "error" };
        const res = mockResponse();

        // Execute
        ApiResult.Error(res as any, error);

        // Result
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "error"
        });
    });

    test('Logger should be call', () => {
        // Setup
        const error = { message: "error" };
        const res = mockResponse();
        const spy = jest.spyOn(Logger, "Log");

        // Execute
        ApiResult.Error(res as any, error);

        // Result
        expect(spy).toHaveBeenCalledWith(error);
    });
})

describe('ApiResult BadRequest', () => {

    test('should 400 with correct message', () => {
        // Setup
        const res = mockResponse();

        // Execute
        ApiResult.BadRequest(res as any, "parameter is missing");

        // Result
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "parameter is missing"
        });
    });

    test('Logger should be call', () => {
        // Setup
        const res = mockResponse();
        const spy = jest.spyOn(Logger, 'Log');

        // Execute
        ApiResult.BadRequest(res as any, "parameter is missing");

        // Result
        expect(spy).toHaveBeenCalledWith("parameter is missing");
    });
})

describe('ApiResult NotFound', () => {

    test('should 404 with correct message', () => {
        // Setup
        const res = mockResponse();

        // Execute
        ApiResult.NotFound(res as any, "Record not found");

        // Result
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "Record not found"
        });
    });

    test('Logger should be call', () => {
        // Setup
        const res = mockResponse();
        const spy = jest.spyOn(Logger, 'Log');

        // Execute
        ApiResult.NotFound(res as any, "Record not found");

        // Result
        expect(spy).toHaveBeenCalledWith("Record not found");
    });
})


describe('ApiResult OK', () => {

    test('should 204 without json', () => {
        // Setup
        const res = mockResponse();

        // Execute
        ApiResult.OK(res as any);

        // Result
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith(null);
    });

    test('should 200 with json', () => {
        // Setup
        const res = mockResponse();
        const result = {name:"john"};

        // Execute
        ApiResult.OK(res as any, result);

        // Result
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(result);
    });
})