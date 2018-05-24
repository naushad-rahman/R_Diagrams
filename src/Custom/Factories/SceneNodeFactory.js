import * as SRD from "storm-react-diagrams";
import { SceneNodeModel } from "../Models/SceneNodeModel";
import { SceneNodeWidget } from "../Widgets/SceneNodeWidget";
import * as React from "react";

export class SceneNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Scene");
    }

    generateReactWidget(diagramEngine, node) {
        return <SceneNodeWidget node={node} />;
    }

    getNewInstance() {
        return new SceneNodeModel();
    }
}


