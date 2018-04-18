import React from 'react';
import 'react-native';
import IconComponent from '../../../src/components/ui-components/IconComponent';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


test('IconComponent to display AppIcon and give onPress callback', () => {
    // Render an Icon with label
    const mockCallback = jest.fn();

    // The mock function is called twice
    const tree = renderer.create(
        <IconComponent iconText="App name" onIconPress={mockCallback}/>
    ).toJSON();
    expect(mockCallback.mock.calls.length).toBe(0);
    expect(tree).toMatchSnapshot();
});