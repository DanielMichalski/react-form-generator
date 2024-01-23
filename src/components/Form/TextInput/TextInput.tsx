import React, {FC} from 'react';
import styles from './TextInput.module.scss';
import {FormElement} from "../../../conteiners/FormElementsGenerator/FormElements/FormElement.model";

interface TextInputProps {
    model: FormElement;
}

const TextInput: FC<TextInputProps> = (props: TextInputProps) => {

    const {model} = props;

    return (
        <div className={styles.TextInput}>
            <label htmlFor={model.label}>{model.label}</label>
            <input name={model.label}
                   id={model.label}
                   placeholder={model.metadata}
                   type="text"
            />
        </div>
    );
};

export default TextInput;
