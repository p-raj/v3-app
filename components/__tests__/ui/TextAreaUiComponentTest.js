import React from 'react';
import renderer from 'react-test-renderer';
import { TextArea } from 're-render';


describe('Suite for testing textArea:', () => {
    it('renders a textArea as expected (matches the snapshot)', () => {
        const title = "Label";
        let onPress = () => {
            console.log("Label pressed")
        };
        const TextAreaShot = renderer.create(
            <TextArea
                value={title}
                onPress={onPress}
            />
        );
        expect(TextAreaShot).toMatchSnapshot();
    });
});

