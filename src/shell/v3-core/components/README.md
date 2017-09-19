# Components

# Index
 - [Intro](#intro) 
 - [UI Components](#ui-components) 
      - [AutoComplete](#autocomplete)
      - [Button](#button)
      - [CheckBox](#checkbox)
      - [Divider](#divider)
      - [Dropdown](#dropdown)
      - [IconButton](#iconbutton)
      - [Image](#image)
      - [Label](#label)
      - [TextArea](#textarea)
      - [TextInput](#textinput)
 - [Picker Components](#picker-components) 
      - ImagePicker via gallery
      - ImagePicker via Camera
 - [Layout Components](#layout-components)
      - [HorizontalLayout](#horizontallayout)
      - [VerticalLayout](#verticallayout)
       

## Intro
Components are user interface elements that can be used to create a widget.
There are basically 3 types of components in veris platform: **`UI`**, **`Pickers`** and **`Layouts`**.
 
UI components are components which can be rendered directly by defining their schema in json.
   
Pickers are components which are rendered only with the help of an action.
 
Layouts are used to define how a parent component should lay out its child components.
 It could either be horizontal or vertical.

-----------------

#### UI Components
##### _AutoComplete_
###### Allowed Props **`placeholder`** **`list`** **`ignoreCase`** **`action`**

**`placeholder`** _`string`_ : Placeholder text to be displayed in the view.

**`list`** _`array of strings`_ : List of data over which auto completion will be shown.

**`ignoreCase`** _`boolean`_ : Whether to ignore case while comparing entered query against **`list`** of data.

**`action`** _`$actionName`_ : The action is bound to **`onItemSelected`** event.

###### Usage 
```json
{
  "type": "autocomplete",
  "placeholder": "Search your favourite fruit",
  "list": [
    "Apple",
    "Mango",
    "Guava"
  ],
  "ignoreCase": false,
  "name": "fruit"
}
```


##### _Button_
###### Allowed Props **`value`** **`action`**

**`value`** _`string`_ : Text to be displayed on the button.

**`action`** _`$actionName`_ : The action is bound to **`onPress`** event.

###### Usage
```json
{
  "type": "button",
  "value": "Submit",
  "name": "login"
}
```

##### _CheckBox_
###### Allowed Props **`label`** **`value`** **`color`** **`action`**

**`label`** _`string`_ : Text to be displayed beside the checkbox.

**`value`** _`boolean`_ : Specifies whether the checkbox is checked or unchecked by default.

**`color`** _`string`_ : Color of the check box. Defined as HEX value : **`#ff4444`** 
or color string: **`red`**.

**`action`** _`$actionName`_ : The action is bound to **`onCheckedChange`** event.

###### Usage
```json
{
  "type": "checkbox",
  "label": "I accept terms and condition",
  "value": true,
  "color": "#252525",
  "name": "checkbox"
}
```

##### _Divider_
Used to add separator.
###### Allowed Props **`thickness`** **`color`** **`orientation`**

**`thickness`** _`number`_ : Thickness of the divider.

**`color`** _`string`_ : Color of the divider. **_`DEFAULT`_ `#000`**

**`orientation`** _`string`_ : Can be **`horizontal`** or **`vertical`**.
**_`DEFAULT`_ `horizontal`**

###### Usage
```json
{
  "type": "divider",
  "thickness": 2,
  "color": "#252525",
  "orientation":"horizontal"
}
```

##### _Dropdown_
###### Allowed Props **`thickness`** **`color`** **`orientation`** **`action`**

**`placeholder`** _`string`_ : The default text to be shown when nothing is selected.

**`list`** _`array of objects`_ : An array of objects of the format {key:1,value:''}.

**`itemStyle`** _`object`_ : Style of single list item.

**`placeholderBackground`** _`string`_ : Background color of dropdown's placeholder in collapsed state.

**`placeholderColor`** _`string`_ : Text and icon color of dropdown in collapsed state.
**_`DEFAULT`_ `black`**

**`listHeight`** _`number`_ : Height of the dropdown list 
**_`DEFAULT`_ `200`**

**`action`** _`$actionName`_ : The action is bound to **`onItemClicked`** event.

###### Usage
```json
{
  "type": "dropdown",
  "placeholder": "--Choose--",
  "list": [{"key":1,"value":"Apple"},{"key":2,"value":"Banana"}],
  "itemStyle": "#252525",
  "placeholderBackground": "#252525",
  "placeholderColor": "#252525",
  "listHeight":100
}
```

##### _IconButton_
###### Allowed Props **`iconName`** **`containerStyle`** **`color`** **`action`**

**`iconName`** _`string`_ : The name of the icon. Could be any of [these](http://fontawesome.io/icons/)

**`color`** _`string`_ : Color of the button. Can be defined as HEX value : **`#ff4444`** 
or color string: **`red`**.

**`containerStyle`** _`object(style)`_ : Adds styling to container holding icon.

**`action`** _`$actionName`_ : The action is bound to **`onPress`** event.

###### Usage
```json
{
  "type": "iconbutton",
  "iconName": "bath",
  "color": "red",
  "containerStyle":{
    "backgroundColor":"blue",
    "width":100,
    "height":100
  }
}
```

##### _Image_
###### Allowed Props **`value`** **`height`** **`width`** **`style`** **`action`**

**`value`** _`string`_ : The url of image to be displayed

**`height`** _`number`_ : Height of Image to be displayed

**`width`** _`number`_ : Width of Image to be displayed

**`style`** _`object(style)`_ : Adds styling to image view.

**`action`** _`$actionName`_ : The action is bound to **`onPress`** event.

###### Usage
```json
{
  "type": "image",
  "value": "http://placehold.it/350x150",
  "height": 200,
  "width": 200,
  "style": {
    "borderRadius": 10
  },
  "action": {
      "type": "$image.pick",
      "options": {
        "via": "camera",
        "name": "image"
      }
    },
  "name": "image"
}
```

##### _Label_
###### Allowed Props **`value`** **`style`** **`action`**

**`value`** _`string`_ : The url of image to be displayed

**`style`** _`object(style)`_ : Adds styling to view.

**`action`** _`$actionName`_ : The action is bound to **`onPress`** event.

###### Usage
```json
{
  "type": "label",
  "value": "Some dummy text",
  "style": {
    "color": "red",
    "fontSize": 20
  }
}
```

##### _TextArea_
###### Allowed Props **`value`** **`placeholder`** **`disabled`** **`style`** **`action`**

**`value`** _`string`_ : Default text to set.

**`placeholder`** _`string`_ : Text to show when nothing is typed.

**`disabled`** _`bool`_ : Enable/disable the component

**`style`** _`object(style)`_ : Adds styling to view.

**`action`** _`$actionName`_ : The action is bound to **`onChangeText`** event.

###### Usage
```json
{
  "type": "textarea",
  "value": "Text Area"
}
```


##### _TextInput_
###### Allowed Props **`value`** **`placeholder`** **`disabled`** **`secure`** **`style`** **`action`**

**`value`** _`string`_ : Default text to set.

**`placeholder`** _`string`_ : Text to show when nothing is typed.

**`disabled`** _`bool`_ : Enable/disable the component

**`secure`** _`bool`_ : true means password field. **_`DEFAULT`_** **`false`**

**`style`** _`object(style)`_ : Adds styling to view.

**`action`** _`$actionName`_ : The action is bound to **`onChangeText`** event.

###### Usage
```json
{
  "type": "textfield",
  "value": "Text Input",
  "name": "textfield"
}
```
-------------------

#### Picker Components

##### _Image Picker_
Image picker can be used by defining **`$image.pick`** action on any ui component.
> **NOTE** Refer actions documentation to see how $image.pick works.

###### Component to trigger `$image.pick` action
```json
{
  "type":"button",
  "value":"Pick an Image",
  "action": {
      "type": "$image.pick",
      "options": {
        "via": "camera",
        "name": "image"
      }
    }
}
```
> **NOTE:** In options we have defined the name as **`image`**.
So the picked image will be saved against key "image" in redux.
If we have a component with same name, its value will be set the the url of picked image.

###### Component where the picked image will be displayed
```json
{
  "type": "image",
  "value": "http://placehold.it/350x150",
  "height": 200,
  "width": 200,
  "style": {
    "borderRadius": 10
  },
  "name": "image"
}
```
> **NOTE:** we set the name of this component as **`image`**.
So the picked image will be displayed in this component

--------------

##### Layout Components

##### _HorizontalLayout_
A container component used to layout the child horizontally

###### Usage
```json
{
  "type": "horizontal",
  "components": [
    {
      "value": "Hi ",
      "type": "label"
    },
    {
      "value": "Name",
      "type": "label",
      "name": "data.name"
    }
  ],
  "style": {
     "justifyContent": "center",
     "alignItems": "center"
  }
}
```

##### _VerticalLayout_
A container component used to layout the child vertically

###### Usage
```json
{
  "type": "vertical",
  "components": [
    {
      "type": "textfield",
      "placeholder": "Enter your name",
      "name": "data.name"
    },
    {
      "type": "textfield",
      "placeholder": "Enter email Id",
      "name": "data.email"
    },
    {
      "type": "button",
      "value": "Submit"
    }
  ],
  "style": {
     "backgroundColor": "green",
     "padding": 100
  }
}
```
