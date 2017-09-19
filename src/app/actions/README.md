# Actions

> __NOTE__: The actions defined in this directory are __not__ to be confused with redux actions.
  Refer: http://docs.jasonette.com/actions/

# Contents
 - [Intro](#intro) 
 - [Syntax](#syntax) 
 - [Types of Actions](#types-of-actions)  
     - [$prop.change](#changeproperty) 
     - [$get](#get) 
     - [$image.pick](#image.pick) 
     - [$operation](#operation)
     - [$set](#set) 
 - [Binding action with component](#binding-action-with-component)
 - [Chaining multiple Actions](#chaining-multiple-actions)
 
# Intro
Actions allow you to express functions that actually do something, entirely in JSON.
Every component has a specific event that can be bound to an action.
eg We could bind an action to a Button component's onClick event.
> __NOTE__: Refer components docs to see which event of a component is bound to actions.
------------


# Syntax
Actions can take the following 4 attributes :-
 - **`type`** : _`(required)`_ A string value which specifies the [name](#types-of-actions) of the action.
 - **`options`** : _`(required)`_ Options are extra params to be passed to an action. 
                   Options differ for every action.
 - **`success`** : _`(optional)`_ Another action to be called when the current action finishes successfully. 
                   This can be used to chain multiple actions.
 - **`error`** : _`(optional)`_ Another action to be called when current action fails.
 ------------

 
# Types of actions

## $prop.change
This action is handled in _`Widget.js`_ and the implementation in change.property.js is empty.
> __NOTE__: This is a temporary solution 

Since the implementation in change.property.js is empty the action's promise always resolves (never rejects).
###### JSON schema
```json
{
  "type": "$prop.change",
  "options": {
    "componentName": "username",
    "property": {
      "backgroundColor": "red"
    }
  }
}
```
**`componentName`** _`string`_ : name of the component whose property needs to be changed.

**`property`** _`object`_ : new property to be applied on the component.


## $get
This action returns a components value from **Redux**.
###### JSON schema
```json
{
  "type": "$get",
  "options": {
    "key": "profilePicture",
    "as": "url"
  }
}
```
**`key`** _`string`_ : name of the component whose property to get.

**`as`** _`string`_ : name with which the value will be returned.

The above snippet will get the value of _`profilePicture`_ component from redux and return it
as `{ url : 'value'}`


## $image.pick
This action is used to pick image from gallery or take a new picture using camera.
###### JSON schema
```json
{
  "type": "$image.pick",
  "options": {
    "via": "camera",
    "name":"profile"
  }
}
```
**`via`** _`string`_: can be either **_`camera`_** or **_`gallery`_**. _`DEFAULT`_ **_`gallery`_**

**`name`** _`string`_: name of the key with which the image will be saved in redux.

## $operation
This action allows you to execute a **_`process`_**.

###### JSON schema
```json
{
  "type": "$operation",
  "options": {
    "operationId": "dgy3b-3b7i3b2d-f43b7f4"
  }
}
```
**`operationId`** _`string`_ : Id of the the process to be executed.
> __NOTE__: **`operationId`** is mapped from the swagger schema of the process selected.


## $set
Allows you to set a `key:value` pair in redux. 
The implementation dispatches **`UPDATE_COMPONENT_DATA`** redux action.

###### JSON schema
```json
{
  "type": "$set",
  "options": {
    "key": "username",
    "value": "ppap@veris.in"
  }
}
```
**`key`** _`string`_ : name of the key to set.

**`value`** _`string`_ : value to be set.
    
The key can be a component's name, 
this allows you to set/change the value of a component.

------------


# Binding action with component
Action is defined by adding an **`action`** property to a components schema

###### Schema with component and action
```json
{
  "type": "button",
  "name": "submit",
  "value": "Click to submit",
  "action": {
    "type": "$operation",
    "options": {
      "operationId": "curfg-f43t-gf43gf-45v5443"
    }
  }
}
```
-------------

# Chaining multiple Actions
In order to chain multiple actions, we can use **`success`** or **`error`** attributes of an action.
###### Schema with nested actions
```json
{
  "type": "button",
  "name": "submit",
  "value": "Click to submit",
  "action": {
    "type": "$operation",
    "options": {
      "operationId": "likdf-f43t-gf43gf-45v5443"
    },
    "success": {
      "type": "$set",
      "options": {
        "key": "isLoggedIn",
        "value": true
      }
    },
    "error": {
      "type": "$set",
      "options": {
        "key": "isLoggedIn",
        "value": false
      }
    }
  }
}
```

