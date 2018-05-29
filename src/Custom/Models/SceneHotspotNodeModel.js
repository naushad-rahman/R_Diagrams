import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import { NextPortModel } from "./NextPortModel";
import * as _ from "lodash";

export class SceneHotspotNodeModel extends NodeModel {
    constructor() {
        super("ScHotspot");
        this.hotspot_ids = {};
    }
    removeHsId = (id) => {
        this.hotspot_ids = _.omit(this.hotspot_ids,"hotspot_"+id);
    };
    updateHsId = (e,id) => {
        console.log(e.target.value,id);
        this.hotspot_ids["hotspot_"+id] = e.target.value;
    };

    serialize() {
        return _.merge(super.serialize(), {
            hotspot_ids: this.hotspot_ids
        });
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
