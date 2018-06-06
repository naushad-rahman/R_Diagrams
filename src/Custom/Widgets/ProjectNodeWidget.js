import * as React from "react";
import PropTypes from 'prop-types';

export class ProjectNodeWidget extends React.Component {
    static propTypes = {
        node: PropTypes.any,
    };

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            name: "",
            config: ""
        };
        this.textRef = React.createRef();
    }

    changeName = (e) => {
        this.setState({
            name: e.target.value
        });
        this.props.node.updateName(e);
    };
    changeConfig = (e) => {
        this.setState({
            config: e.target.value
        });
        this.props.node.updateConfig(e);
    };

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
                    <input onChange={this.changeName} type="text" value={this.props.node.name}/>
                </div>
                <div className="project-config">
                    <label>Config : </label>
                    <button onClick={this.toggleTextArea.bind(this)}>Toggle</button>
                    <textarea style={{display:"none"}} onChange={this.changeConfig} value={this.props.node.config} ref={this.textRef} rows="3"/>
                </div>
            </div>
        </div>);
    }
}
