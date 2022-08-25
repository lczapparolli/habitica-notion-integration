export interface NotionQueryResult {
    object: "list";
    results: Array<NotionTask>;
    next_cursor: string;
    has_more: boolean;
    type: "page";
    page: any;
}

interface NotionTask {
    id: string;
    created_time: Date;
    last_edited_time: Date;
    properties: NotionProperties;
    created_by: {
        object: "user";
        id: string;
    };
    last_edited_by: {
        object: "user";
        id: string;
    };
    cover: any;
    icon: any;
    parent: {
        type: "database_id";
        database_id: string;
    };
    archived: boolean;
    url: string;
}

interface NotionProperties {
    "Date Created": NotionCreatedTimeProperty;
    "Dia da semana": NotionFormulaProperty;
    "Projeto": NotionRichTextProperty;
    "Categoria": NotionSelectProperty;
    "Tipo": NotionSelectProperty;
    "Intervalo": NotionRichTextProperty;
    "Data": NotionDateProperty;
    "Status": NotionSelectProperty;
    "Para a semana": NotionFormulaProperty;
    "Recorrente": NotionCheckBoxProperty;
    "Name": NotionTitleProperty;
}

interface NotionProperty {
    id: string;
    type: "created_time" | "formula" | "rich_text" | "select" | "date" | "checkbox" | "title";
}

interface NotionCreatedTimeProperty extends NotionProperty {
    created_time: Date
}

interface NotionFormulaProperty extends NotionProperty {
    formula: {
        type: "string" | "boolean";
        string: string;
        boolean: boolean;
    };
}

interface NotionRichTextProperty extends NotionProperty {
    rich_text: Array<NotionRichTextContent>
}

interface NotionSelectProperty extends NotionProperty {
    select: {
        id: string;
        name: string;
        color: string;
    }
}

interface NotionDateProperty extends NotionProperty {
    date: {
        start: Date;
        end: Date | null;
        time_zone: string | null;
    }
}

interface NotionCheckBoxProperty extends NotionProperty {
    checkbox: boolean | null;
}

interface NotionTitleProperty extends NotionProperty {
    title: Array<NotionRichTextContent>
}

interface NotionRichTextContent {
    type: "text";
    text: {
        content?: string | null;
        link?: string;
    };
    annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
    };
    plain_text: string;
    href?: string | null;
}