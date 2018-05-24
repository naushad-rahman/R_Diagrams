import * as React from "react";

import { BodyWidget } from "./Custom/Widgets/BodyWidget";
import { Application } from "./Application";

import "./Sass/main.css"

export default () => {
    let app = new Application();

    return <BodyWidget app={app} />;
};

