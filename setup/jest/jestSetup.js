import { shallow, render, mount } from 'enzyme';
global.shallow = shallow;
global.render = render;
global.mount = mount;

jest.mock('TouchableNativeFeedback', () => {
    return {
        SelectableBackground: jest.fn(),

    }
});