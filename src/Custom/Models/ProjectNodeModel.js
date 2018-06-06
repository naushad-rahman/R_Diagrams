import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

export class ProjectNodeModel extends NodeModel {
    constructor() {
        super("Project");
        this.name = "";
        this.config = "";
    }

    updateName = (e) => {
        this.name = e.target.value;
    };

    updateConfig = (e) => {
        this.config = e.target.value;
    };

    serialize() {
        return _.merge(super.serialize(), {
            project_name: this.name,
            config: this.config
        });
    }
    deSerialize(object, engine) {
        super.deSerialize(object, engine);
        this.name = object.project_name;
        this.config = object.config;
    }

    addInPort(label) {
        return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
    }
    addOutPort(label) {
        return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
    }

    getInPorts() {
        return _.filter(this.ports, portModel => {
            return portModel.in;
        });
    }
    getOutPorts() {
        return _.filter(this.ports, portModel => {
            return !portModel.in;
        });
    }
}
