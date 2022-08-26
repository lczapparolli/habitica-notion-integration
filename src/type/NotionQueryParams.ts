export interface NotionQueryParams {
    filter: NotionFilterParams;
    start_cursor?: string;
    page_size?: number;
}

interface NotionFilterParams {
    and: Array<NotionFilterParam>;
}

interface NotionFilterParam {
    property: string;
    select?: {
        equals?: string;
        does_not_equal?: string;
    };
    checkbox?: {
        equals: boolean;
    };
}