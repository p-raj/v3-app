# v3-app
This project manages the web and native(android & ios) interfaces for v3 and there are high chances that it'll also manage VR in future.

##

###Problem
- The very first problem that we had was to manage multiple platforms with a single codebase, or as we call it, write one user anywhere.
- Next being to render/install applications at runtime.

##
###Solution
- At the time we began this project (December of 2016), react-native along with [react-native-web](https://github.com/necolas/react-native-web) was the obvious and best way to go with to solve the problem of write once use everywhere.
- Implementation of  [Jasonette](https://docs.jasonette.com/) is what we were inspired from and mostly followed to solve the problem of rendering at runtime.

##
###Installation

 1. Add the remote `v3-core` repository
 2. git subtree add --prefix `src/v3-core` `remote-of-core-repository` master

```
Fork and clone this repo (never direclty clone and push to main repo)

//Install all the project dependencies
npm i
or
yarn install
```

##
###Usage


##
###Code of conduct
