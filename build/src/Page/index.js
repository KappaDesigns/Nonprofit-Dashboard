import React from "react";
import "es6-map/implement";
import "whatwg-fetch";
import ActionButton from "./ActionButton";

export default class Page extends React.Component {

  constructor() {
    super();
    this.indexMap = new Map();
    this.index = 0;
    this.state = {

    }
    this.renderDOM = this.renderDOM.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchDOM = this.fetchDOM.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  componentWillMount() {
    this.fetchDOM();
    this.addCloseHandling();
    this.createTemplate();
  }

  componentWillUnmount() {
    this.removeCloseHandling()
  }

  createTemplate() {

  }

  addCloseHandling() {
    let self = this;
    $(window).on("beforeunload", function () {
      self.saveData();
    })
    $(window).on("unload", function () {
      self.saveData();
    })
  }

  saveData() {
    fetch("/api", {
      method: "post",
      credentials:'same-origin',
      body: JSON.stringify(this.state.dom),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  removeCloseHandling() {
    window.onbeforeunload = null;
    window.onunload = null;
  }

  fetchDOM() {
    fetch(`/api/`, {
      credentials:'same-origin'
    }).then((res) => {
      return res.json();
    })
    .then((json) => {
      if (json.hasOwnProperty("redirectToLogin")) {
        window.location.href = "/login";
      }
      let htmlIndex = 0
      if (json.DOM[0].data.includes("!")) {
        htmlIndex = 1
      }
      let body = json.DOM[htmlIndex].children[1];
      let head = json.DOM[htmlIndex].children[0];
      this.setState({
        head: head,
        body: body,
        dom: json
      })
      this.getCSS(head);
      this.getScripts(json.DOM);
      this.setState({
        fetched: true
      })
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
    if (this.state.fetched) {
      return (
        <div>
          {this.state.body.children.map(this.renderDOM)}
          <ActionButton></ActionButton>
        </div>
      )
    }
    return (
      <div className="admin-panel-loading">
        <h1 className="admin-panel-loading-text">Loading</h1>
          <div class="sk-folding-cube">
            <div class="sk-cube1 sk-cube"></div>
            <div class="sk-cube2 sk-cube"></div>
            <div class="sk-cube4 sk-cube"></div>
            <div class="sk-cube3 sk-cube"></div>
          </div>
      </div>
    )
  }

  renderDOM(item) {
    this.index++;
    let index = this.index;
    let opts = this.getAttributes(item);
    let backgroundImage = {
      backgroundImage: opts.backgroundImage
    }
    this.indexMap.set(index, item);
    if (!item.hasOwnProperty("children") && item.type == "tag") {
      let Tag = "" + item.name;
      return (
        <Tag key={index} style={backgroundImage} src={opts.src} data-index={index} id={opts.id} href={opts.href} class={opts.class}></Tag>
      )
    } else if (item.hasOwnProperty("children")) {
      let Tag = "" + item.name;
      return (
        <Tag style={backgroundImage} onClick={this.handleClick} data-index={index} key={index} id={opts.id} href={opts.href} src={opts.src} class={opts.class}>
          {
            item.children.map(this.renderDOM)
          }
        </Tag>
      )
    } else if (item.type == "text") {
      return (
        <span class="admin-panel-editable-text" data-index={index} key={index} contentEditable onInput={this.handleChange}>{item.data}</span>
      );
    }
  }

  handleChange(e) {
    let index = parseInt(e.target.dataset['index']);
    let node = this.indexMap.get(index);
    node.data = e.target.textContent
  }

  handleClick(e) {
    e.preventDefault();
    this.handleImageClick(e);
  }

  handleImageClick(e) {
    let tag = e.target.tagName;
    let $target = $(e.target);
    let bgUrl = $target.css("background-image");
    let url = tag == "IMG" ? e.target.src : bgUrl;
    if (url !== "none") {
      if (url.includes("url(")) {
        url = url.substring(0, url.length - 2);
        url = url.substring(5, url.length);
      }
      this.renderImageEdit(e, $target, url);
    }
  }

  getAttributes(item) {
    let opts = {}
    if (item.hasOwnProperty("attribs")) {
      opts = {
        class: item.attribs.class !== undefined ? item.attribs.class : "",
        id: item.attribs.id !== undefined ? item.attribs.id : "",
        href: item.attribs.href !== undefined ? item.attribs.href : "#admin-panel-page-action",
        src: item.attribs.src !== undefined ? item.attribs.src : "",
        backgroundImage: item.attribs.backgroundImage !== undefined ? item.attribs.backgroundImage : ""
      }
    } else {
      opts = {
        class: "",
        id: "",
        href: "#admin-panel-page-action",
        src: "",
        backgroundImage: ""
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

  renderImageEdit(e, ele, url) {
    $('.admin-panel-image-panel').remove();
    let template = '<div class="admin-panel-image-panel"><h3 class="admin-panel-header">Change Url</h3><input value='+url+' type="text" placeholder="Input Url Here..." class="admin-panel-image-input">' +
    '<img src="' + url + '" alt="" class="admin-panel-image-preview"><button id="admin-panel-cancel-btn" class="admin-panel-image-btn">Cancel</button>' +
    '<button id="admin-panel-ok-btn" class="admin-panel-image-btn">Ok</button></div>';

    if (ele[0].nodeName == "IMG") {
      ele.parent().append(template);
    } else {
      ele.append(template);
    }

    let index = parseInt(ele.data("index"));

    let $child = $(ele).parent().find(".admin-panel-image-panel");
    let width = $child.width();
    let height = $child.height();
    let top = e.pageY - height > 0 ? e.pageY - height : 0;
    $child.offset({
      left: e.pageX - (width / 2),
      top: top
    })

    let input = document.getElementsByClassName('admin-panel-image-input')[0];
    input.addEventListener("keyup", (e) => {
      url = e.target.value;
      $child.find(".admin-panel-image-preview").attr({
        src: url
      })
    })

    let okButton = $('#admin-panel-ok-btn');
    let cancelButton = $('#admin-panel-cancel-btn');

    okButton.click(() => {
      let node = this.indexMap.get(index);
      if (ele[0].nodeName === "IMG") {
        ele.attr({
          src: url
        })
        node.attribs.src = url;
      } else {
        ele.css({
          "background-image": "url("+url+")"
        })
        node.attribs.backgroundImage = "url("+url+")";
      }
      this.saveData();
      $child.remove();
    })

    cancelButton.click(() => {
      console.log("nerrrrr");
      $child.remove();
    })
  }
}
