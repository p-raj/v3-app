import React from 'react';
import 'react-native';
import AuthScreen from '../../src/screens/AuthScreen';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


test('IconComponent to display AppIcon and give onPress callback', () => {
    // Render an Icon with label
    const mockCallback = jest.fn();

    // The mock function is called twice
    const tree = renderer.create(
        <AuthScreen/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});