import * as SRD from "storm-react-diagrams";
import * as React from "react";
// import * as _ from "lodash";
import PropTypes from 'prop-types';

export class Scene2NodeWidget extends React.Component {
    static propTypes = {
        node: PropTypes.any,
    };

    constructor(props) {
        super(props);
        console.log(props);
    }

    generatePort(port) {
        return <SRD.DefaultPortLabel model={port} key={port.id}/>;
    }

    render() {
        return (<div>dsmfk</div>);
    }
}
