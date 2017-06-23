import React from 'react';
import renderer from 'react-test-renderer';
import { Image } from 're-render';

describe('Suite for testing image component:', () => {
    it('renders the image component as expected (matches the snapshot)', () => {

        const Images = renderer.create(
            <Image
                style={{width: 50, height: 50}}
                url="https://facebook.github.io/react/img/logo_og.png"
            />
        );
        expect(Images).toMatchSnapshot();
    });
});