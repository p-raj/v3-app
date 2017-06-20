import React from 'react';
import { Label } from 're-render';

const Title = ({value, ...props}) => {
    return (
        <Label
            value={value}
            {...props}
            style={{
                fontWeight: '400',
                fontSize: 28,
                marginBottom: 16,
                marginTop: 16
            }}
        />
    )
};


export default Title;
