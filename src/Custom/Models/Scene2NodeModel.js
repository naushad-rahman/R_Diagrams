import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import { NextPortModel } from "./NextPortModel";
import * as _ from "lodash";

export class Scene2NodeModel extends NodeModel {
    constructor() {
        super("Scene2");
    }
    addInPort(label) {
        return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
    }
    addOutPort(label) {
        return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
    }
    addNextPort(label) {
        return this.addPort(new NextPortModel(true, Toolkit.UID(), label));
    }

    getInPorts() {
        return _.filter(this.ports, portModel => {
            return portModel.in;
        });
    }
    getOutPorts() {
        return _.filter(this.ports, portModel => {
            return (!portModel.in && !portModel.next);
        });
    }
    getNextPorts() {
        return _.filter(this.ports, portModel => {
            return portModel.next;
        });
    }
}