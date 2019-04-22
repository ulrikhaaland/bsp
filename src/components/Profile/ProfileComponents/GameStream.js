import React from "react";
import fire from "../../../db/fire";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
    // backgroundColor: theme.palette.background.paper
  },
  gridList: {
    background: "linear-gradient(to bottom, #1c222e 0, #333d54 100%)",

    width: 500,
    height: 120
  }
});

class GameStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      p: null,
      gameArray: [],
      displayArray: []
    };
    // this.listenForNewGames = this.listenForNewGames.bind(this);
    this.getGames(this.props.gamePath);
    this.getGames = this.getGames.bind(this);
    this.ImageGridList = this.ImageGridList.bind(this);
    this.renderGames = this.renderGames.bind(this);
  }

  getGames(gamePath) {
    console.log(gamePath);
    fire
      .firestore()
      .collection(gamePath)
      .orderBy("date")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            this.state.gameArray.push({
              id: change.doc.id,
              item: change.doc.data()
            });
            this.ImageGridList();
          }
        });
      });
  }

  ImageGridList(props) {
    const { classes } = this.props;
    let d;
    var height = 0;

    if (this.state.gameArray.length > 0) {
      console.log("Not empty");

      this.state.gameArray.forEach(item => {
        height += 65;
        console.log(height);
      });

      d = (
        <div className={classes.root}>
          <GridList
            spacing={2}
            cellHeight={60}
            style={{
              background: "linear-gradient(to bottom, #1c222e 0, #333d54 100%)",

              width: 500,
              height: height
            }}
            cols={1}
          >
            {this.state.gameArray.map(item => (
              <GridListTile key={item.id} cols={1}>
                <div
                  onClick={() => console.log(item.id)}
                  style={{
                    borderStyle: "solid solid solid solid",
                    width: "inherit",
                    height: 60,
                    marginBottom: 5,

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
                        {item.item.game}
                      </p>
                      <p style={{ color: "#4caf50", display: "table-cell" }}>
                        {item.item.outcome}
                      </p>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        height: "50%",
                        display: "table-row"
                      }}
                    >
                      <p style={{ color: "white" }}>
                        {item.item.date
                          .toDate()
                          .toString()
                          .substring(0, 21)}
                      </p>
                      <p style={{ color: "#4caf50", display: "table-cell" }}>
                        {item.item.odds}
                      </p>
                    </div>

                    <p style={{ color: "white" }}>{console.log(item.date)}</p>
                  </div>
                </div>
              </GridListTile>
            ))}
          </GridList>
        </div>
      );
    } else {
      console.log("empty");

      return <p>Empty</p>;
    }
    this.setState({
      p: d
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
    console.log(this.state.p);
    return <div>{this.state.p}</div>;
  }
}

GameStream.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameStream);
