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
        this.state = {
            hotspot_ids: []
        };
    }

    generatePort(port) {
        return <SRD.DefaultPortLabel model={port} key={port.id}/>;
    }

    _addElement = () => {
        let newH = Object.assign([], this.state.hotspot_ids);
        let next_id = (newH.length>0)?newH[newH.length-1].hotspot_id+1:1;
        newH.push({hotspot_id: next_id});
        this.setState({
            hotspot_ids: newH
        });
        console.log("ADD",newH);
        this.props.node.addNextPort("Next");
    };

    _removeHotspot = (hotspot, hsIndex) => {
        let prevH = Object.assign([], this.state.hotspot_ids);
        prevH = _.filter(prevH, (item) => item.hotspot_id !== hotspot.hotspot_id);
        console.log("SUB",prevH);
        this.setState({hotspot_ids: prevH});
        this.props.node.removePort(this.props.node.getNextPorts()[hsIndex]);
        this.props.node.removeHsId(hotspot.hotspot_id);
    };

    _generateHotspots = ()=> {
        return this.state.hotspot_ids.map((hotspot,index)=> (
            <div key={hotspot.hotspot_id}>
                <label>HS {hotspot.hotspot_id} : </label>
                <input onBlur={(e)=>{this.props.node.updateHsId(e,hotspot.hotspot_id)}} type="text"/>
                <button onClick={()=>{this._removeHotspot(hotspot,index+1)}}>-</button>
                <div>{this.generatePort(this.props.node.getNextPorts()[index+1])}</div>
            </div>
        ));
    };

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
                <div>{this.generatePort(this.props.node.getNextPorts()[0])}</div>
            </div>
            {this._generateHotspots()}
            <button onClick={this._addElement}>+</button>
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
