export const CONFIG_WIDGET = 'CONFIG_WIDGET';

export const saveWidgetConfig = (config) => {
  return {
      type: CONFIG_WIDGET,
      payload: config
  }
};