import React, {FC, useEffect} from 'react';
import styles from './TextArea.module.scss';
import {FormElement} from "../../../conteiners/FormElementsGenerator/FormElements/FormElement.model";

interface TextAreaProps {
    model: FormElement;
}

const TextArea: FC<TextAreaProps> = (props: TextAreaProps) => {

    const {model} = props;

    useEffect(
        () => {
            console.log(`Creating [TextArea] component with label [${model.label}]`);

            return () => {
                console.log(`Destroying [TextArea] component with label [${model.label}]`);
            };
        },
        [model.label]
    );

    return (
        <div className={styles.TextArea}>
            <label htmlFor={model.label}>{model.label}</label>
            <textarea name={model.label}
                      id={model.label}
                      placeholder={model.metadata}
                      rows={5}
                      cols={40}
            />
        </div>
    );
};

export default TextArea;
