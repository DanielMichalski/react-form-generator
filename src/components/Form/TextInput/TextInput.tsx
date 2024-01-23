import React, {FC, useEffect} from 'react';
import styles from './TextInput.module.scss';
import {FormElement} from "../../../conteiners/FormElementsGenerator/FormElements/FormElement.model";

interface TextInputProps {
    model: FormElement;
}

const TextInput: FC<TextInputProps> = (props: TextInputProps) => {

    const {model} = props;

    useEffect(
        () => {
            console.log(`Creating [TextInput] component with label [${model.label}]`);

            return () => {
                console.log(`Destroying [TextInput] component with label [${model.label}]`);
            };
        },
        [model.label]
    );

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
