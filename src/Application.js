import * as SRD from "storm-react-diagrams";
import {HotspotNodeFactory} from "./Custom/Factories/HotspotNodeFactory";
import {SceneNodeFactory} from "./Custom/Factories/SceneNodeFactory";

export class Application {
    constructor() {
        this.diagramEngine = new SRD.DiagramEngine();
        this.diagramEngine.installDefaultFactories();
        this.diagramEngine.registerNodeFactory(new SceneNodeFactory());
        this.diagramEngine.registerNodeFactory(new HotspotNodeFactory());

        this.newModel();
    }
    newModel() {
        this.activeModel = new SRD.DiagramModel();
        this.diagramEngine.setDiagramModel(this.activeModel);
        //initial map model
    }
    getActiveDiagram() {
        return this.activeModel;
    }

    getDiagramEngine() {
        return this.diagramEngine;
    }
}
