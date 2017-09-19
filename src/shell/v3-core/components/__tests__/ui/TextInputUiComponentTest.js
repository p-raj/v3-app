import React from 'react';
import renderer from 'react-test-renderer';
import { TextInput } from 're-render';


describe('Suite for testing textInput component:', () => {
    const defalutValue = "TextInput";
    const isSecure = true;
    it('renders textInput on iOS as expected (matches the snapshot)', () => {
        const IOSTextInputShot = renderer.create(
            <TextInputIOS
                style={{width: 50, height: 50}}
                defaultValue={defalutValue}
                secureTextEntry={isSecure}
            />
        );
        expect(IOSTextInputShot).toMatchSnapshot();
    });
    it('renders textInput on android as expected (matches the snapshot)', () => {
        const AndroidTextInputShot = renderer.create(
            <TextInputAndroid
                style={{width: 50, height: 50}}
                defaultValue={defalutValue}
                secureTextEntry={isSecure}
            />
        );
        expect(AndroidTextInputShot).toMatchSnapshot();
    });
    it('renders textInput on web as expected (matches the snapshot)', () => {
        const WebTextInputShot = renderer.create(
            <TextInputWeb
                style={{width: 50, height: 50}}
                defaultValue={defalutValue}
                secureTextEntry={isSecure}
            />
        );
        expect(WebTextInputShot).toMatchSnapshot();
    });
});