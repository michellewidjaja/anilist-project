import React, { useState } from 'react';
import { InputWrapper, Label } from '../../pages/globalStyles';

export default function Input(props: any) {
    return (
        <>
            <InputWrapper>
                <Label>{props.label}</Label>
                <input {...props} />
            </InputWrapper>
        </>
    )
}