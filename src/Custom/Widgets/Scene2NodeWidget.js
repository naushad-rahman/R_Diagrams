import * as SRD from "storm-react-diagrams";
import * as React from "react";
import * as _ from "lodash";
import PropTypes from 'prop-types';

export class Scene2NodeWidget extends React.Component {
    static propTypes = {
        node: PropTypes.any,
    };

    constructor(props) {
        super(props);
        console.log(props);
        this.headerRef =  React.createRef();
    }

    _clickHeader = () => {
        this.headerRef.current.contentEditable = true;
    };
    _blurHeader = (e) => {
        this.headerRef.current.contentEditable = false;
        this.props.node.updateName(e.target.innerHTML);
    };

    generatePort(port) {
        return <SRD.DefaultPortLabel model={port} key={port.id}/>;
    }

    render() {
        return (
            <div className="Scene2">
                <div className="left-port">
                    {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
                </div>
                <div onDoubleClick={this._clickHeader} onBlur={this._blurHeader} ref={this.headerRef} contentEditable={false} className="scene">
                    {this.props.node.name}
                </div>
                <div className="right-port">
                    {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
                </div>
            </div>);
    }
}
