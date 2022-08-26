export namespace HttpService {

    /**
     * Makes a HTTP POST request to a given URL
     * 
     * @param url URL of the request
     * @param body Body to be sent
     * @param parameters Parameters of the request
     * @returns Return the response of the service
     */
    export function post(url: string, body: any, parameters: HttpRequestParam): HttpResponse {
        let params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
            method: "post",
            payload: body,
            contentType: parameters.contentType,
            headers: parameters.headers
        };

        let response = UrlFetchApp.fetch(url, params);
        return {
            responseCode: response.getResponseCode(),
            body: response.getContentText()
        };
    }

}

export interface HttpRequestParam {
    headers: { [header: string]: string };
    contentType: "application/json";
}

interface HttpResponse {
    responseCode: number;
    body: any;
}