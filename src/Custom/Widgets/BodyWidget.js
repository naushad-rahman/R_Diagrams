import * as React from "react";
import * as _ from "lodash";

import { TrayItemWidget } from "./TrayItemWidget";
import { TrayWidget } from "./TrayWidget";

import { DefaultNodeModel, DiagramModel } from "storm-react-diagrams";
import { SceneNodeModel } from "../Models/SceneNodeModel";
import { HotspotNodeModel } from "../Models/HotspotNodeModel";
import { JsonNodeModel } from "../Models/JsonNodeModel";
import { SceneHotspotNodeModel } from "../Models/SceneHotspotNodeModel";
import { Scene2NodeModel } from "../Models/Scene2NodeModel";

import { CustomDiagramWidget } from "./CustomDiagramWidget";

let strModel = "";

export class BodyWidget extends React.Component {
    showDiagramJSON = (model) => {
        let finalJson = {};
        finalJson.scenes = [];
        console.log("MOD",model);
        let projectNode = _.find(model.nodes,function(o) { return o.type === "Project"; });
        let sceneNode = _.filter(model.nodes,function(o) { return o.type === "ScHotspot"; });
        finalJson.config = projectNode.Config;
        for(let scene of sceneNode){
            let scObj = {};
            scObj.scene_id = scene.scene_id;
            scObj.next_scene_id = scene.next_scene_id;
            scObj.hotspots = [];
            for(let hs of scene.hotspot_ids){
                let findPort = _.find(scene.ports,function(o) { return o.id === hs.port_id; });
                let findLink = findPort.links[Object.keys(findPort.links)[0]];
                scObj.hotspots.push({
                    hotspot_id: hs.hotspot_id || "",
                    next_scene_id: findLink.targetPort.parent.scene_id
                });
            }
            finalJson.scenes.push(scObj);
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
                        <TrayItemWidget model={{ type: "Scene" }} name="Scene Node" color="rgb(255,255,255)" />
                        <TrayItemWidget model={{ type: "Hotspot" }} name="Hotspot Node" color="rgb(180,180,180)" />
                        <TrayItemWidget model={{ type: "JsonNode" }} name="Json Node" color="rgb(180,100,100)" />
                        <TrayItemWidget model={{ type: "ScHotspot" }} name="SceneHotspot Node" color="rgb(80,80,200)" />
                        <TrayItemWidget model={{ type: "Scene2" }} name="Scene2 Node" color="rgb(80,200,200)" />
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
                                    node.addOutPort("Out");
                                    node.addInPort("In");
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
