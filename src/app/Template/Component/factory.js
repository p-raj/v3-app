import {
    Animation,
    AutoComplete,
    Button,
    CheckBox,
    Dropdown,
    Text,
    Spinner,
    Icon,
    Image,
    TextArea,
    TextInput,
    RecyclerView
} from 'components';

import Divider from 'components/Divider';
import HorizontalLayout from 'components/HorizontalLayout';
import VerticalLayout from 'components/VerticalLayout';

import { withValues } from './apis/values';
import { withVariables } from './apis/variables';
import { withFormat } from './apis/format';
import { withStyle } from './apis/style';

import { withAnimationProps } from './apis/animation';
import { withAutoCompleteProps } from './apis/auto-complete';
import { withButtonProps } from './apis/button';
import { withCheckBoxProps } from './apis/check-box';
import { withDividerProps } from './apis/divider';
import { withDropdownProps } from './apis/dropdown';
import { withImageProps } from './apis/image';
import { withIconProps } from './apis/icon';
import { withLayoutProps } from './apis/layout';
import { withRecyclerViewProps } from './apis/list';
import { withSpinnerProps } from './apis/spinner';
import { withTextProps } from './apis/text';
import { withTextAreaProps } from './apis/text-area';
import { withTextInputProps } from './apis/text-input';

import { compose } from 'recompose';

// the order is important for these HOCs
const enhanced = compose(
    withValues,
    withVariables,
    withFormat,
    withStyle
);

/*
 * TODO
 * Find a better way as this
 * may grow fucking exponentially :/
 *
 * The only reason its here is it helps
 * keep the main component clean.
 */
class ComponentFactory {
    static get(type) {
        const Component = this.find(type);
        return enhanced(Component);
    }

    static find(type) {
        switch (type) {
            case 'label':
            case 'text':
                return withTextProps(Text);
            case 'icon':
                return withIconProps(Icon);
            case 'image':
                return withImageProps(Image);
            case 'spinner':
                return withSpinnerProps(Spinner);
            case 'list':
                return withRecyclerViewProps(RecyclerView);

            case 'vertical':
                return withLayoutProps(VerticalLayout);
            case 'horizontal':
                return withLayoutProps(HorizontalLayout);

            case 'animation':
                return withAnimationProps(Animation);

            case 'textarea':
            case 'text-area':
                return withTextAreaProps(TextArea);
            case 'textfield':
            case 'text-input':
                return withTextInputProps(TextInput);
            case 'auto-complete':
                return withAutoCompleteProps(AutoComplete);
            case 'button':
                return withButtonProps(Button);
            case 'checkbox':
                return withCheckBoxProps(CheckBox);
            case 'divider':
                return withDividerProps(Divider);
            case 'dropdown':
                return withDropdownProps(Dropdown);
            default:
                return Text;
        }
    }
}

export default ComponentFactory;
