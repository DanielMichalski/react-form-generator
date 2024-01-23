import {FormElement, FormElementType,} from "./FormElements/FormElement.model";

const NEW_LINE_CHARACTER = '\n';
const ROW_ELEMENTS_SEPARATOR = ';';
const ROW_NUMBER_INDEX = 0;
const COLUMN_NUMBER_INDEX = 1;
const LABEL_INDEX = 2;
const TYPE_INDEX = 3;
const VALUE_INDEX = 4;
export const parseRequirements = (requirements: string): FormElement[] => {
    if (!requirements) {
        return [];
    }

    const models: FormElement[] = [];

    const lines = requirements.split(NEW_LINE_CHARACTER);
    for (const line of lines) {
        const formElement = parseFormElementFromLine(line);
        models.push(formElement);
    }

    return models;
}
const parseFormElementFromLine = (line: string): FormElement => {
    const rowElements = line.split(ROW_ELEMENTS_SEPARATOR);
    const row = +rowElements[ROW_NUMBER_INDEX];
    const column = +rowElements[COLUMN_NUMBER_INDEX];
    const label = rowElements[LABEL_INDEX];
    const type: FormElementType = FormElementType[rowElements[TYPE_INDEX] as keyof typeof FormElementType];
    const metadata = rowElements[VALUE_INDEX];

    return {
        row,
        column,
        label,
        type,
        metadata
    }
}
