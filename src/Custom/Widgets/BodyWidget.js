import * as React from "react";

import { TrayItemWidget } from "./TrayItemWidget";
import { TrayWidget } from "./TrayWidget";

import { DefaultNodeModel } from "storm-react-diagrams";
import { SceneNodeModel } from "../Models/SceneNodeModel";
import { HotspotNodeModel } from "../Models/HotspotNodeModel";
import { JsonNodeModel } from "../Models/JsonNodeModel";
import { SceneHotspotNodeModel } from "../Models/SceneHotspotNodeModel";

import { CustomDiagramWidget } from "./CustomDiagramWidget";

export class BodyWidget extends React.Component {
    render() {
        return (
            <div className="body">
                <div className="content">
                    <TrayWidget>
                        <TrayItemWidget model={{ type: "in" }} name="In Node" color="rgb(192,255,0)" />
                        <TrayItemWidget model={{ type: "out" }} name="Out Node" color="rgb(0,192,255)" />
                        <TrayItemWidget model={{ type: "Scene" }} name="Scene Node" color="rgb(255,255,255)" />
                        <TrayItemWidget model={{ type: "Hotspot" }} name="Hotspot Node" color="rgb(180,180,180)" />
                        <TrayItemWidget model={{ type: "JsonNode" }} name="Json Node" color="rgb(180,100,100)" />
                        <TrayItemWidget model={{ type: "ScHotspot" }} name="SceneHotspot Node" color="rgb(80,80,200)" />
                    </TrayWidget>
                    <div
                        className="diagram-layer"
                        onDrop={event => {
                            let data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));

                            let node = null;
                            switch(data.type){
                                case "in":
                                    node = new DefaultNodeModel("END", "rgb(192,255,0)");
                                    node.addInPort("In");
                                    break;
                                case "out":
                                    node = new DefaultNodeModel("START", "rgb(0,192,255)");
                                    node.addOutPort("Out");
                                    break;
                                case "Scene":
                                    node = new SceneNodeModel();
                                    node.addOutPort("Out");
                                    node.addInPort("In");
                                    break;
                                case "Hotspot":
                                    node = new HotspotNodeModel();
                                    node.addOutPort("Out");
                                    node.addInPort("In");
                                    break;
                                case "JsonNode":
                                    node = new JsonNodeModel();
                                    node.addOutPort("Out");
                                    node.addInPort("In");
                                    break;
                                case "ScHotspot":
                                    node = new SceneHotspotNodeModel();
                                    node.addNextPort("Next");
                                    node.addOutPort("Out");
                                    node.addInPort("In");
                                    break;
                                default :
                                    console.log("Error in Switch");
                                    break;

                            }
                            let points = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
                            node.x = points.x;
                            node.y = points.y;
                            this.props.app
                                .getDiagramEngine()
                                .getDiagramModel()
                                .addNode(node);
                            this.forceUpdate();
                        }}
                        onDragOver={event => {
                            event.preventDefault();
                        }}
                    >
                        <CustomDiagramWidget className="srd-demo-canvas" diagramEngine={this.props.app.getDiagramEngine()} />
                    </div>
                </div>
            </div>
        );
    }
}
