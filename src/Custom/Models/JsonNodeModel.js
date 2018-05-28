import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

export class JsonNodeModel extends NodeModel {
    constructor() {
        super("Json");
        this.Json = {};
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
