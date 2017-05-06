import React from "react";
import "es6-map/implement";
import "whatwg-fetch";

export default class Page extends React.Component {

  constructor() {
    super();
    this.nesting = 0;
    this.textMap = {};
    this.state = {
      textMap: this.textMap
    }
    this.renderDOM = this.renderDOM.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    fetch(`/api/`).then((res) => {
      return res.json();
    })
    .then((json) => {
      if (json.DOM[0].data.includes("!")) {
        json.DOM.splice(0,1);
      }
      let body = json.DOM[0].children[1];
      let head = json.DOM[0].children[0];
      this.setState({
        head: head,
        body: body,
        dom: json,
        fetched: true
      })
      this.getCSS(head);
      this.getScripts(json.DOM);
    })
  }

  getScripts(DOM) {
    for (let i = 0; i < DOM.length; i++) {
      if (DOM[i].name == "script") {
        if (DOM[i].attribs.hasOwnProperty("src")) {
          let src = DOM[i].attribs.src;
          if (!src.includes("http")) {
            src = src.replace(this.state.dom.path);
            src = "http://" + this.state.dom.path + "/" + src;
          }
          let htmlString = `<script src=${src}></script>`;
          $('body').append(htmlString)
        } else {
          // handle script tag no src

        }
      }
      if (DOM[i].hasOwnProperty("children")) {
        this.getScripts(DOM[i].children);
      }
    }
  }

  getCSS(head) {
    for (let i = 0; i < head.children.length; i++) {
      if (head.children[i].type == "tag" && head.children[i].name == "link") {
        let link = head.children[i];
        let href = link.attribs.href;
        let rel = link.attribs.rel;
        if (!href.includes("http")) {
          href = href.replace(this.state.dom.path);
          href = "http://" + this.state.dom.path + "/" + href;
        }
        let htmlString = `<${link.name} href=${href} rel=${rel}></${link.name}>`;
        $('head').append(htmlString);
      }
    }
  }

  render() {
    this.nesting = 0;
    if (this.state.fetched) {
      return (
        <div>
          {this.state.body.children.map(this.renderDOM)}
        </div>
      )
    }
    return (<div></div>)
  }

  renderDOM(item) {
    let index = this.nesting++;
    let opts = this.getAttributes(item);

    if (!item.hasOwnProperty("children") && item.type == "tag") {
      let Tag = "" + item.name;
      return (
        <Tag key={index} src={opts.src} id={opts.id} href={opts.href} class={opts.class}></Tag>
      )
    } else if (item.hasOwnProperty("children")) {
      let Tag = "" + item.name;
      return (
        <Tag key={index} id={opts.id} href={opts.href} src={opts.src} class={opts.class}>
          {
            item.children.map(this.renderDOM)
          }
        </Tag>
      )
    } else if (item.type == "text") {
      this.textMap[index] = item
      return (<span key={index} onKeyDown={this.handleChange} data-index={index} class="admin-panel-editable-text" contentEditable="true">{item.data}</span>);
    }
  }

  handleChange(e) {
    console.log("bark");
    let index = parseInt(e.target.dataset.index);
    let map = this.state.textMap
    map[index].data = e.target.textContent;
    console.log(map[index].data);
    this.setState({
      textMap: map
    })
  }

  getAttributes(item) {
    let opts = {}
    if (item.hasOwnProperty("attribs")) {
      opts = {
        class: item.attribs.class !== undefined ? item.attribs.class : "",
        id: item.attribs.id !== undefined ? item.attribs.id : "",
        href: item.attribs.href !== undefined ? item.attribs.href : "#admin-panel-page-action",
        src: item.attribs.src !== undefined ? item.attribs.src : ""
      }
    } else {
      opts = {
        class: "",
        id: "",
        href: "#admin-panel-page-action",
        src: ""
      }
    }
    if (opts.src !== "") {
      if (!opts.src.includes("http")) {
        opts.src = opts.src.replace(this.state.dom.path);
        opts.src = "http://" + this.state.dom.path + "/" + opts.src;
      }
    }
    return opts;
  }
}
