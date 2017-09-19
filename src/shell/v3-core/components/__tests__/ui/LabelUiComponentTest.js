import React from 'react';
import renderer from 'react-test-renderer';
import { Label } from 're-render';


describe('Suite for testing label component:', () => {
    it('renders a label as expected (matches the snapshot)', () => {
        const title = "Label";
        let onPress = () => {
            console.log("Label pressed")
        };
        const LabelShot = renderer.create(
            <Label
                value={title}
                onPress={onPress}
            />
        );
        expect(LabelShot).toMatchSnapshot();
    });
});

