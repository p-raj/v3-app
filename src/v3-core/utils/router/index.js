import * as Routing from 'react-router-dom';
export default Routing;
export const Link = Routing.Link;
export const Route = Routing.Route;
export const Router = Routing.BrowserRouter;


const R = Routing.Redirect;
const getConfig = ({push, from, to}) => {
    return {
        push, from, to
    }
};


export class Redirect extends R {
    shouldComponentUpdate(nextProps) {
        // this should be slow as heck,
        // will change the implementation asap once validated
        return JSON.stringify(getConfig(this.props)) !== JSON.stringify(getConfig(nextProps));
    }

    componentDidUpdate() {
        if (!this.isStatic())
            this.perform()
    }
}