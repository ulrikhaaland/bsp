import React from "react";
import fire from "../../../db/fire";

class GameStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameArray: [],
      displayArray: []
    };
    // this.listenForNewGames = this.listenForNewGames.bind(this);
    this.getGames(this.props.gamePath);
    this.getGames = this.getGames.bind(this);
    this.renderGames = this.renderGames.bind(this);
  }

  getGames(gamePath) {
    console.log(gamePath);
    fire
      .firestore()
      .collection(gamePath)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            this.state.gameArray.push(change.doc.data());
            this.renderGames();
          }
        });
      });
  }

  renderGames() {
    this.state.displayArray = [];
    const returnList = this.state.gameArray.map(item => (
      <div
        style={{
          borderStyle: "solid solid solid solid",
          width: "inherit",
          height: 60,
          marginBottom: 5,
          marginRight: "5px",
          borderColor: "#E5E5E5",
          borderWidth: 1
        }}
      >
        <div
          style={{
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5,
            marginLeft: 5,
            height: "100%",
            width: "100%",
            display: "table"
          }}
        >
          <div
            style={{
              width: "50%",
              height: "50%",
              display: "table-row"
            }}
          >
            <p
              style={{
                color: "white",
                textAlign: "left",
                marginRight: 5,
                display: "table-cell"
              }}
            >
              {item.game}
            </p>
            <p style={{ color: "#4caf50", display: "table-cell" }}>
              {item.outcome}
            </p>
          </div>

          <div style={{ width: "100%", height: "50%", display: "table-row" }}>
            <p style={{ color: "white" }}>
              {item.date
                .toDate()
                .toString()
                .substring(0, 21)}
            </p>
            <p style={{ color: "#4caf50", display: "table-cell" }}>
              {item.odds}
            </p>
          </div>

          <p style={{ color: "white" }}>{console.log(item.date)}</p>
        </div>
      </div>
    ));
    if (returnList.length === 0) {
      returnList.push(<p>Empty</p>);
    }
    this.setState({ displayArray: returnList });
  }

  render() {
    return <div>{this.state.displayArray}</div>;
  }
}

export default GameStream;
