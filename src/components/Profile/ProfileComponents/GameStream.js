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
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.state.gameArray.push(doc.data());
        });
        // this.listenForNewGames(gamePath);
        this.renderGames();
      });
  }

  //   listenForNewGames(gamePath) {
  //     fire
  //       .firestore()
  //       .collection(gamePath)
  //       .onSnapshot(function(querySnapshot) {
  //         querySnapshot.forEach(doc => {
  //           this.state.gameArray.push(doc.data());
  //           console.log(doc.data());
  //         });
  //       });
  //   }

  renderGames() {
    const returnList = this.state.gameArray.map(item => (
      <p style={{ color: "white" }}>{item.name}</p>
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
