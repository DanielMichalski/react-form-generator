import styles from './FormElementsGenerator.module.scss';
import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import {parseRequirements} from "./FormElementsGenerator.service";
import {FormElement} from "./FormElements/FormElement.model";
import FormElements from "./FormElements/FormElements";
import {Alert, Container} from "react-bootstrap";

interface FormElementsGeneratorProperties {
    headerText: string
}

const MAX_COLUMNS = 4;
const INITIAL_TEXT_AREA_VALUE = '1;1;First Name;TEXT_INPUT;Enter your first name\n' +
    '1;2;Last Name;TEXT_INPUT;Enter your last name\n' +
    '2;1;Email;TEXT_INPUT;Enter email\n' +
    '2;2;Phone;TEXT_INPUT;500 600 700\n' +
    '3;1;Subject;SELECT;Request,Suggestion,Complaint,Proposal\n' +
    '4;1;Message;TEXT_AREA;How we can help you?';

const FormElementsGenerator: FC<FormElementsGeneratorProperties> = (props: FormElementsGeneratorProperties) => {

    const [textAreaValue, setTextAreaValue] = useState<string>(INITIAL_TEXT_AREA_VALUE);
    const [formElements, setFormElements] = useState<FormElement[]>([]);
    const [columnLimitReached, setColumnLimitReached] = useState<boolean>(false);

    useEffect(
        () => {
            generateForm(textAreaValue);
        }
    );

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        const textAreaValue = event.target.value;
        setTextAreaValue(textAreaValue);
        generateForm(textAreaValue);
    }

    const generateForm = (textAreaValue: string): void => {
        setColumnLimitReached(false);
        const formElements: FormElement[] = parseRequirements(textAreaValue);
        if (requirementsAreValid(formElements)) {
            setFormElements(formElements);
        } else {
            setFormElements([]);
        }
    }

    const requirementsAreValid = (formElements: FormElement[]): boolean => {
        const columnLimitReached = formElements.some(element => element?.column > MAX_COLUMNS);
        setColumnLimitReached(columnLimitReached);
        return !columnLimitReached;
    }

    const displayValidationAlert = (): ReactElement => {
        return <Alert variant="danger"
                      dismissible={false}>
            The maximum number for column is {MAX_COLUMNS}.
        </Alert>
    }

    return (
        <>
            <Header headerText={props.headerText}/>
            <Container>
                <div className={styles.requirementsTextArea}>
                    {columnLimitReached && displayValidationAlert()}
                    <textarea value={textAreaValue}
                              className={styles.requirements}
                              id="requirements"
                              onChange={handleTextChange}
                              placeholder="Add form elements definition here..."
                              rows={6}
                              cols={50}
                    />
                </div>

                <FormElements formElements={formElements}
                              maxColumns={MAX_COLUMNS}/>
            </Container>
        </>
    );
}

export default FormElementsGenerator;
