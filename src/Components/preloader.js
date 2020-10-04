import React, { PureComponent } from "react";

//Styles
import "../Styles/preloader.css";

class Preloader extends PureComponent {
    render() {
        return (
            <div id="preload-wrapper">
                <div id="loader"></div>
            </div>
        );

    }
}

export default Preloader;
