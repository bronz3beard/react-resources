import React, { PureComponent } from "react";

class WindowWidth extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { 
        width: window.innerWidth,
       };
    }
    componentDidMount() {   
        window.addEventListener("resize", this.resizeWindow);
    }
      componentWillUnmount() {
          window.removeEventListener("resize", this.resizeWindow);
    }
    resizeWindow = () => {
        this.setState({
          width: window.innerWidth
        });
        //console.log(window.innerWidth);
    };
    render() {
      return (
        <div>
          {this.props.render(this.state)}
        </div>
      );
    }
  }

  export default WindowWidth;