import * as SRD from "storm-react-diagrams";
import * as React from "react";
import * as _ from "lodash";
import PropTypes from 'prop-types';

export class SceneHotspotNodeWidget extends React.Component {
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
        return (<div className="widget-div" style={{backgroundColor:"#7b00ff"}}>
            <div className="widget-label">SC : </div>
            <div>
                <label>ID : </label>
                <input type="text"/>
            </div>
            <div>
                <label>Default HS : </label>
                <input type="text"/>
            </div>
            <button>+</button>
            <div className="widget-port">
                <div className="left-port">
                    {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
                </div>
                <div className="right-port">
                    {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
                </div>
            </div>
        </div>);
    }
}
