import React from 'react';
import renderer from 'react-test-renderer';
import ComponentFactory from '../../index';


const componentList = ['button', 'image', 'babel', 'textarea', 'textfield'];
const componentListData = [
    {
        'button': {
            "type": "button",
            "text": "Tap Me!",
            "style": {
                "width": "50",
                "height": "50",
                "background": "#00ff00",
                "color": "#ffffff",
                "font": "HelveticaNeue",
                "size": "12",
                "corner_radius": "25"
            }
        },
        'image': {
            "type": "image",
            "url": "http://i.imgur.com/KUJPgGV.png",
            "style": {
                "width": "50",
                "height": "50",
                "corner_radius": "25"
            }
        },
        'label': {
            "type": "label",
            "text": "Hello world",
            "style": {
                "font": "Avenir",
                "size": "30",
                "color": "rgb(200,0,0)",
                "padding": "10"
            }
        },
        'textarea': {
            "type": "textarea",
            "name": "status",
            "placeholder": "Status update",
            "value": "Eating lunch..",
            "style": {
                "background": "rgba(0,0,0,0)",
                "placeholder_color": "#cecece",
                "font": "HelveticaNeue",
                "align": "center",
                "width": "100%",
                "height": "300",
                "autocorrect": "true",
                "autocapitalize": "true",
                "spellcheck": "true",
                "size": "12"
            }
        },
        'textfield': {
            "type": "textfield",
            "name": "password",
            "value": "dhenf93f!",
            "placeholder": "Enter password",
            "style": {
                "placeholder_color": "#cecece",
                "font": "HelveticaNeue",
                "align": "center",
                "width": "200",
                "height": "60",
                "secure": "true",
                "size": "12"
            }
        }
    }];

describe('Suite for calling and rendering components from componentFactory:', () => {
    for (let i = 0; i < componentList.length; i++) {
        let Component = ComponentFactory.get(componentList[i]);
        let componentData = componentListData[componentList[i]];
        it(`renders ${componentList[i]} component as expected`, () => {
            const ComponentShot = renderer.create(
                <Component
                    {...componentData}
                />
            );
            expect(ComponentShot).toMatchSnapshot();
        });
    }
});
