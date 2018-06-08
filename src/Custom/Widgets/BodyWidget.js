import * as React from "react";
import * as _ from "lodash";

import { TrayItemWidget } from "./TrayItemWidget";
import { TrayWidget } from "./TrayWidget";

import { DefaultNodeModel, DiagramModel } from "storm-react-diagrams";
import { Scene2NodeModel } from "../Models/Scene2NodeModel";

import { CustomDiagramWidget } from "./CustomDiagramWidget";

let strModel = "";

export class BodyWidget extends React.Component {
    showDiagramJSON = (model) => {
        let finalJson = {};
        finalJson.scenes = [];
        console.log("MOD",model);
        let projectNode = _.find(model.nodes,function(o) { return o.type === "Project"; });
        let sceneNode = _.filter(model.nodes,function(o) { return o.type === "Scene2"; });
        finalJson.project_name = projectNode.name;
        finalJson.config = JSON.parse(projectNode.config) || "";
        for(let scene of sceneNode){
            let sceneObject = {};
            sceneObject.scene_id = scene.name;
            let outPort = _.find(scene.ports,function(o) {return o.in === false;});
            let hsId = 0;
            sceneObject.hotspots = _.map(outPort.links,function(o){
                return {
                    next_scene_id: o.targetPort.parent.name,
                    hotspot_id: hsId++
                };
            });
            finalJson.scenes.push(sceneObject);
        }
        console.log("FIN",finalJson);
    };

    addDiagram = (model) => {
        console.log("add",model);
        strModel = JSON.stringify(model.serializeDiagram());
    };

    applyDiagram = (engine) => {
        let tempModel = new DiagramModel();
        tempModel.deSerializeDiagram(JSON.parse(strModel), engine);
        engine.setDiagramModel(tempModel);
        console.log("apply",tempModel);
        this.forceUpdate();
    };

    render() {
        return (
            <div className="body">
                <div className="content">
                    <TrayWidget>
                        <button onClick={()=>{this.showDiagramJSON(this.props.app.getDiagramEngine().getDiagramModel())}}>Serialize</button>
                        <button onClick={()=>{this.addDiagram(this.props.app.getDiagramEngine().getDiagramModel())}}>Add</button>
                        <button onClick={()=>{this.applyDiagram(this.props.app.getDiagramEngine())}}>Apply</button>
                        <TrayItemWidget model={{ type: "in" }} name="In Node" color="rgb(192,255,0)" />
                        <TrayItemWidget model={{ type: "out" }} name="Out Node" color="rgb(0,192,255)" />
                        <TrayItemWidget model={{ type: "Scene2" }} name="Scene2 Node" color="rgb(200,0,0)" />
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
                                case "Scene2":
                                    node = new Scene2NodeModel();
                                    node.addOutPort(" ");
                                    node.addInPort(" ");
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
