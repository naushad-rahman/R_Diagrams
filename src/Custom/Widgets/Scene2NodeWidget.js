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
        this.state = {
            hsArray: []
        };
    }

    _addElement = () => {
        let hsLength = this.state.hsArray.length;
        let nextNum =  (hsLength>0)?this.state.hsArray[hsLength-1].hsNum+1:1;
        let newHsArray = Object.assign([],this.state.hsArray);
        newHsArray.push({hsNum: nextNum});
        this.setState({
            hsArray: newHsArray
        });
        this.props.node.addNextPort("N");
    };
    _removeElement = () => {
        let newHsArray = Object.assign([],this.state.hsArray);
        newHsArray.pop();
        this.setState({
            hsArray: newHsArray
        });
        if(this.props.node.getNextPorts().length !== 0)
            this.props.node.removePort(this.props.node.getNextPorts().pop());
    };
    _generateElement = () => {
        return this.state.hsArray.map((hotspot,index)=> (
            <div key={index}>HS {hotspot.hsNum} {this.generatePort(this.props.node.getNextPorts()[index])}</div>
        ));
    };

    generatePort(port) {
        return <SRD.DefaultPortLabel model={port} key={port.id}/>;
    }

    render() {
        return (
            <div>
                <div>Scene</div>
                <div onClick={this._addElement}>+</div>
                <div onClick={this._removeElement}>-</div>
                <div>{this._generateElement()}</div>
            </div>);
    }
}
