import React, {FC, ReactElement, useEffect} from "react";
import {FormElement, FormElementByRowsAndCols, FormElementType,} from "./FormElement.model";
import {Col, Row} from "react-bootstrap";
import styles from "./FormElements.module.scss";
import TextInput from "../../../components/Form/TextInput/TextInput";
import Select from "../../../components/Form/Select/Select";
import TextArea from "../../../components/Form/TextArea/TextArea";

interface FormElementsProperties {
    formElements: FormElement[]
    maxColumns: number
}

const FormElements: FC<FormElementsProperties> = (props: FormElementsProperties) => {

    const {formElements, maxColumns} = props;

    useEffect(
        () => {
            console.log(`Creating [FormElements] component`);

            return () => {
                console.log('Destroying [FormElements] component');
            };
        },
        []
    );

    const renderFormElement = (formElement: FormElement): ReactElement => {
        switch (formElement.type) {
            case FormElementType.TEXT_INPUT:
                return <TextInput model={formElement}/>;
            case FormElementType.TEXT_AREA:
                return <TextArea model={formElement}/>;
            case FormElementType.SELECT:
                return <Select model={formElement}/>;
        }
    }

    const renderColumn = (rowNumber: number,
                          colNumber: number,
                          formElementByRowsAndCols: FormElementByRowsAndCols): ReactElement => {
        return <Col sm={12}
                    lg={12 / maxColumns}
                    key={`row${rowNumber}col${colNumber}`}>
            <div>
                {formElementByRowsAndCols[rowNumber]?.[colNumber] !== undefined
                    ? <div className={styles.formElement}>
                        {renderFormElement(formElementByRowsAndCols[rowNumber][colNumber])}
                    </div>
                    : <></>}
            </div>
        </Col>;
    }

    const renderColumns = (formElementByRowsAndCols: FormElementByRowsAndCols,
                           rowNumber: number,
                           maxColumn: number): ReactElement[] => {
        const columns: ReactElement[] = [];
        for (let columnNumber = 1; columnNumber <= maxColumn; columnNumber++) {
            columns.push(renderColumn(rowNumber, columnNumber, formElementByRowsAndCols));
        }
        return columns;
    }

    const renderRow = (formElementByRowsAndCols: FormElementByRowsAndCols,
                       rowNumber: number,
                       maxColumn: number): ReactElement => {
        return <Row key={`row${rowNumber}`}>
            {renderColumns(formElementByRowsAndCols, rowNumber, maxColumn)}
        </Row>;
    }

    const renderFormElements = (formElementByRowsAndCols: FormElementByRowsAndCols,
                                maxRowNumber: number,
                                maxColumnNumber: number): ReactElement[] => {
        const rows: ReactElement[] = [];
        for (let rowNumber = 1; rowNumber <= maxRowNumber; rowNumber++) {
            rows.push(renderRow(formElementByRowsAndCols, rowNumber, maxColumnNumber));
        }
        return rows;
    }

    const renderForm = (): ReactElement => {
        let maxRowNumber = 0;
        let maxColumnNumber = 0;
        const formElementByRowsAndCols: FormElementByRowsAndCols = {};

        formElements.filter(formElement => formElement !== undefined)
            .forEach(formElement => {
                if (maxRowNumber < formElement.row) {
                    maxRowNumber = formElement.row;
                }
                if (maxColumnNumber < formElement.column) {
                    maxColumnNumber = formElement.column;
                }

                if (formElementByRowsAndCols[formElement.row] === undefined) {
                    formElementByRowsAndCols[formElement.row] = {};
                }
                formElementByRowsAndCols[formElement.row][formElement.column] = formElement;
            });

        return (<>
            {renderFormElements(formElementByRowsAndCols, maxRowNumber, maxColumnNumber)}
        </>);
    }

    return (
        renderForm()
    );
}


export default FormElements;
