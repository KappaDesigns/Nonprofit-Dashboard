import React from "react";
import "whatwg-fetch";
import Editor from "./Editor";

const OverlayState = {
    Overlay: 0,
    Editor: 1,
}

export default class Overlay extends React.Component {
    constructor(props) {
        super();
        this.state = {
            overlayState: OverlayState.Overlay,
            style: {
                opacity: 0
            }
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.show = this.show.bind(this);
        this.leave = this.leave.bind(this);
    }

    render() {
        let content = null;
        if (this.state.overlayState == OverlayState.Overlay) {
            content = <p className="desc">{this.props.event.desc}</p>
        } else {
            content = <Editor handleClose={this.handleClose} event={this.props.event}/>
        }
        return (
            <div style={this.state.style} onMouseEnter={this.show} onMouseLeave={this.leave} onClick={this.handleClick} className={`overlay setting-${this.state.overlayState}`}>
                {content}
            </div>
        )
    }

    handleClick(e) {
        if (this.state.overlayState == OverlayState.Overlay) {
            this.props.classCallback('static');
            this.setState({
                overlayState: OverlayState.Editor,
            });
        }
    }

    handleClose(e) {
        this.props.classCallback('relative');
        this.setState({
            overlayState: OverlayState.Overlay,
        }, () => {
            this.leave();
        });
    }

    show() {
        let style = this.state.style;
        style.opacity = 1;
        this.setState({
            style: style,
        });
    }

    leave() {
        if (this.state.overlayState == OverlayState.Overlay) {
            let style = this.state.style;
            style.opacity = 0;
            this.setState({
                style: style,
            });
        }
    }
}