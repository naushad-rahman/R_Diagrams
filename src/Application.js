import * as SRD from "storm-react-diagrams";
import {HotspotNodeFactory} from "./Custom/Factories/HotspotNodeFactory";
import {SceneNodeFactory} from "./Custom/Factories/SceneNodeFactory";
import {JsonNodeFactory} from "./Custom/Factories/JsonNodeFactory";
import {ProjectNodeFactory} from "./Custom/Factories/ProjectNodeFactory";
import {ProjectNodeModel} from "./Custom/Models/ProjectNodeModel";

export class Application {
    constructor() {
        this.diagramEngine = new SRD.DiagramEngine();
        this.diagramEngine.installDefaultFactories();
        this.diagramEngine.registerNodeFactory(new SceneNodeFactory());
        this.diagramEngine.registerNodeFactory(new HotspotNodeFactory());
        this.diagramEngine.registerNodeFactory(new JsonNodeFactory());
        this.diagramEngine.registerNodeFactory(new ProjectNodeFactory());

        this.newModel();
    }
    newModel() {
        this.activeModel = new SRD.DiagramModel();
        this.diagramEngine.setDiagramModel(this.activeModel);
        //initial map model
        let node1 = new ProjectNodeModel();
        node1.setPosition(80,80);
        this.activeModel.addAll(node1);
    }
    getActiveDiagram() {
        return this.activeModel;
    }

    getDiagramEngine() {
        return this.diagramEngine;
    }
}
