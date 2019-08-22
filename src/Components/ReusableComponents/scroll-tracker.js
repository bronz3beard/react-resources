import React, { PureComponent } from "react";

class OnScrollTracker extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { 
        lastScrollFireTime: 0,
        show: true,
        offSetTop: 0,
       };
    }
    componentDidMount() {
        document.addEventListener('scroll', this.onScroll);
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll);
    }
    onScroll = () => {
      const { lastScrollFireTime } = this.state;

      const testOffset = document.body.getBoundingClientRect();
      const offSetTop = Math.abs(testOffset.top);
        this.setState({
          offSetTop
        });

        const minScrollTime = 400;
        const now = new Date().getTime();
        let scrollTimer;
        if (!scrollTimer) {
            if (now - lastScrollFireTime > (3 * minScrollTime)) {
                this.setState({
                  lastScrollFireTime: now,
                  show: true,
                });
            }
            scrollTimer = setTimeout(() => {
                scrollTimer = null;
                this.setState({
                  lastScrollFireTime: new Date().getTime(),
                  show: true,
                });
            }, minScrollTime);
            this.setState({
              show: false,
            });
        }
      };
    render() {
      return (
        <div>
          {this.props.render(this.state)}
        </div>
      );
    }
  }

  export default OnScrollTracker;