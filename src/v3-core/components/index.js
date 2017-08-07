import { Image } from 'react-native';

import {
    AutoComplete,
    Button,
    CheckBox,
    Dropdown,
    Text,
    Spinner,
    Icon,
    TextArea,
    TextInput,
    RecyclerView
} from '../re-render';

import Divider from '../components/ui/Divider';
import HorizontalLayout from './layouts/HorizontalLayout';
import VerticalLayout from './layouts/VerticalLayout';

import { withValues } from './hoc/withValues';
import { withFormat } from './hoc/withFormat';
import { withStyle } from './hoc/withStyle';

import { withButtonProps } from './hoc/Button/Props';
import { withTextInputProps } from './hoc/TextInput/Props';
import { withTextProps } from './hoc/Text/Props';
import { withImageProps } from './hoc/Image/Props';
import { withTextAreaProps } from './hoc/TextArea/Props';
import { withAutoCompleteProps } from './hoc/AutoComplete/Props';
import { withCheckBoxProps } from './hoc/CheckBox/Props';
import { withDropdownProps } from './hoc/Dropdown/Props';
import { withDividerProps } from './hoc/Divider/Props';
import { withIconProps } from './hoc/Icon/Props';
import { withSpinnerProps } from './hoc/Spinner/Props';
import { withRecyclerViewProps } from './hoc/RecyclerView/Props';
import { withLayoutProps } from './hoc/HorizontalLayout/Props';

import { compose } from 'recompose';


const enhanced = compose(
    // withEnv
    withValues,
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
    static get (type) {
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

            case 'textarea':
                return withTextAreaProps(TextArea);
            case 'textfield':
                return withTextInputProps(TextInput);
            case 'autocomplete':
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
