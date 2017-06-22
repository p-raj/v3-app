export const UPDATE_COMPONENT_DATA = 'UPDATE_COMPONENT_DATA';

export default function updateComponentData(widgetUuid, componentName, value) {
    return ({
        type: UPDATE_COMPONENT_DATA,
        payload: {
            [widgetUuid]: {
                [componentName]: value
            }
        }
    })
}