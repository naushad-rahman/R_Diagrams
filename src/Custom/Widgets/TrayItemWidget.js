import * as React from "react";

export class TrayItemWidget extends React.Component {
    render() {
        return (
            <div
                style={{ borderColor: this.props.color }}
                draggable={true}
                onDragStart={event => {
                    event.dataTransfer.setData("storm-diagram-node", JSON.stringify(this.props.model));
                }}
                className="tray-item"
            >
                {this.props.name}
            </div>
        );
    }
}
