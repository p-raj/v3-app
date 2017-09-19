import React from 'react';
import renderer from 'react-test-renderer';
import IOSButton from '../../hoc/Button/index.ios';
import WebButton from '../../hoc/Button/index';

describe('Suite for testing button component:', () => {
    const title = "Button";
    let onPress = () => {
        console.log("button pressed")
    };

    it('renders button on iOS as expected (matches the snapshot)', () => {
        const IOSButtonShot = renderer.create(
            <IOSButton
                style={{width: 50, height: 50}}
                title={title}
                onPress={onPress}
            />
        );
        expect(IOSButtonShot).toMatchSnapshot();
    });
    it('renders button on android as expected (matches the snapshot)', () => {
        const AndroidButtonShot = shallow(
            <Button
                style={{width: 50, height: 50}}
                title={title}
                onPress={onPress}
            />
        );
        expect(AndroidButtonShot).toMatchSnapshot();
    });
    it('renders button on web as expected (matches the snapshot)', () => {
        const WebButtonShot = renderer.create(
            <WebButton
                style={{width: 50, height: 50}}
                title={title}
                onPress={onPress}
            />
        );
        expect(WebButtonShot).toMatchSnapshot();
    });
});