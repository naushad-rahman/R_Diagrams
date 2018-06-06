import * as SRD from "storm-react-diagrams";
import * as React from "react";
// import * as _ from "lodash";
import PropTypes from 'prop-types';

export class ProjectNodeWidget extends React.Component {
    static propTypes = {
        node: PropTypes.any,
    };

    constructor(props) {
        super(props);
        console.log(props);
        this.textRef = React.createRef();
    }

    generatePort(port) {
        return <SRD.DefaultPortLabel model={port} key={port.id}/>;
    }

    toggleTextArea() {
        let textNode = this.textRef.current;
        if(textNode.style.display === "none")
            textNode.style.display = "block";
        else
            textNode.style.display = "none";
    }

    render() {
        return (<div className="Project">
            <div className="project-header">Project</div>
            <div className="project-content">
                <div className="project-name">
                    <label>Name : </label>
                    <input onBlur={this.props.node.updateName} type="text"/>
                </div>
                <div className="project-config">
                    <label>Config : </label>
                    <button onClick={this.toggleTextArea.bind(this)}>Toggle</button>
                    <textarea style={{display:"none"}} onBlur={this.props.node.updateConfig} ref={this.textRef} rows="3"/>
                </div>
            </div>
        </div>);
    }
}
