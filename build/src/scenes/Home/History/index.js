import React from "react";
import HistoryItem from "./HistoryItem/index";
import 'whatwg-fetch';

export default class History extends React.Component {
  constructor() {
    super();
    this.state = {
      "history": []
    }
  }

  componentWillMount() {
    let self = this;
    fetch('/api/history/1').then((res) => {
      return res.json();
    }).then((json) => {
      self.handleHistory(json);
    })
  }

  handleHistory(jsonArray) {
    let historyItems = [];
    for (let i = 0; i < jsonArray.length; i++) {
      let historyObj = JSON.parse(jsonArray[i]);
      historyItems.push(historyObj);
    }
    this.setState({
      "history": historyItems
    })
  }

  render() {
    let i = 0;
    return (
      <div className="dashboard-component" id="history">
        <h1>Recent Changes</h1>
        {
          this.state.history.map((item) => {
            i++;
            return (
              <HistoryItem key={i} time={item.date} type={item.type}></HistoryItem>
            )
          })
        }
      </div>
    )
  }
}
