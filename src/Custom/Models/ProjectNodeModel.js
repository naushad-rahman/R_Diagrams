import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

export class ProjectNodeModel extends NodeModel {
    constructor() {
        super("Project");
        this.Config = "";
    }

    updateConfig = (e) => {
        let jObj = JSON.parse(e.target.value);
        let pretty = JSON.stringify(jObj);
        this.Config = pretty;
        console.log(this.Config);
    };

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
