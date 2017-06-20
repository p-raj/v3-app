import React from 'react';
import RN from 'react-native';
import Drawer from 'react-native-drawer';

import { Label } from 're-render';
import VerticalLayout from '../../../../platform/components/layouts/VerticalLayout/index';


class SidebarItem extends React.Component {
    render() {
        const {title} = this.props;
        return (
            <RN.TouchableOpacity
                style={{borderBottomWidth: 1, borderColor: 'white', width: '100%', padding: 10}}
                onPress={ this.onSideBarItemPress}>
                <Label style={{textAlign: 'center', color: 'white', fontSize: 30}}
                       value={title}/>
            </RN.TouchableOpacity>
        )
    }

    onSideBarItemPress = () => {
        this.props.onPress(this.props.itemId);
    };
}


class Sidebar extends React.Component {
    render() {
        const items = this.props.items.map((item) => {
            return (
                <SidebarItem
                    key={item.key}
                    itemId={item.key}
                    title={item.title}
                    onPress={this.onItemClick}
                />
            )
        });
        return (
            //TODO: fix the layouting od Drawer and the static height given to VerticalLayout
            <Drawer
                {...this.props}
                openDrawerOffset={150}
                type={'displace'}
                styles={{drawer: {backgroundColor: 'steelblue', height: '100%'}}}
                content={
                    <VerticalLayout style={{
                        alignItems: 'center',
                        backgroundColor: 'steelblue', padding: 10, height: 1100
                    }}>
                        {items}
                    </VerticalLayout>
                }>
            </Drawer>
        );
    }

    onItemClick = (key) => {
        this.props.onItemClick(key);
    };
}

Sidebar.propTypes = {
    ...Drawer.propTypes,
    items: React.PropTypes.array.isRequired,
    onItemClick: React.PropTypes.func.isRequired
};
Sidebar.defaultProps = {};

export default Sidebar;
