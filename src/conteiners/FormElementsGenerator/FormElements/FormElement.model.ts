export interface FormElement {
    row: number,
    column: number,
    label: string,
    type: FormElementType,
    metadata: string,
}

export enum FormElementType {
    TEXT_INPUT = "TEXT_INPUT",
    TEXT_AREA = "TEXT_AREA",
    SELECT = "SELECT",
}

export interface FormElementByRowsAndCols {
    [row: number]: {
        [column: number]: FormElement
    }
}
