import React, {FC, useEffect} from 'react';
import styles from './Select.module.scss';
import {FormElement} from "../../../conteiners/FormElementsGenerator/FormElements/FormElement.model";

interface SelectProps {
    model: FormElement;
}

const OPTIONS_SEPARATOR = ',';

const Select: FC<SelectProps> = (props: SelectProps) => {

    const {model} = props;
    const options = model.metadata.split(OPTIONS_SEPARATOR)

    useEffect(
        () => {
            console.log(`Creating [Select] component with label [${model.label}]`);

            return () => {
                console.log(`Destroying [Select] component with label [${model.label}]`);
            };
        },
        [model.label]
    );

    return (
        <div className={styles.Select}>
            <label htmlFor={model.label}>
                {model.label}
            </label>
            <select name={model.label}
                    id={model.label}>
                {options.map(option => (
                    <option key={option}
                            value="">{option}</option>
                ))}
            </select>
        </div>
    );
}

export default Select;
