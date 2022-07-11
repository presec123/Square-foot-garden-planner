import React, { useEffect, useState, Component, Alert, Image } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import defaults from './Defaults';
import { firebase } from '.././src/firebase/config';
import Cell from './Cell';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customSize: 4,
      plantData: null,
    };
    this.sqrfootWidth = defaults.cellSize * defaults.boardSize;
    this.grid = Array.apply(
      null,
      Array((defaults.boardSize = this.state.customSize))
    ).map(() => {
      return Array.apply(
        null,
        Array((defaults.boardSize = this.state.customSize))
      ).map(() => {
        return null;
      });
    });
  }

  onRemove = (x, y) => {
    if ((this.grid[x][y].state.containsPlant = true)) {
      for (let i = -1; i <= 1; i++) {
        if (x + i >= 0 && x + i <= this.state.customSize - 1 && x + i != x) {
          if ((this.grid[x + i][y].state.containsPlant = true)) {
            for (let j = -1; j <= 1; j++) {
              if (
                x + i + j >= 0 &&
                x + i + j <= this.state.customSize - 1 &&
                x + i + j != x
              ) {
                if (
                  (this.grid[x + i + j][y].state.containsPlant =
                    true &&
                    this.grid[x + i + j][y].state.plantName !=
                      this.grid[x + i][y].state.plantName)
                ) {
                  console.log(this.grid[x + i + j][y].state);
                  console.log(this.grid[x + i][y].state);
                  if (this.grid[x + i + j][y].state.badCell == true) {
                    this.grid[x + i][y].setState({
                      backgroundColor: '#800000',
                    });
                  }
                  if (
                    this.grid[x + i + j][y].state.badCell == false &&
                    this.grid[x + i + j][y].state.goodCell == true
                  ) {
                    this.grid[x + i][y].setState({
                      backgroundColor: 'green',
                    });
                  }
                  if (
                    this.grid[x + i + j][y].state.badCell == false &&
                    this.grid[x + i + j][y].state.goodCell == false &&
                    this.grid[x + i + j][y].state.containsPlant == true
                  ) {
                    this.grid[x + i][y].setState({
                      backgroundColor: '#5d3727',
                    });
                  }
                  if (
                    this.grid[x + i + j][y].state.badCell == false &&
                    this.grid[x + i + j][y].state.goodCell == false &&
                    this.grid[x + i + j][y].state.plantName == ''
                  ) {
                    this.grid[x + i][y].setState({
                      backgroundColor: '#5d3727',
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
    if ((this.grid[x][y].state.containsPlant = true)) {
      for (let i = -1; i <= 1; i++) {
        if (y + i >= 0 && y + i <= this.state.customSize - 1 && y + i != y) {
          if ((this.grid[x][y + i].state.containsPlant = true)) {
            for (let j = -1; j <= 1; j++) {
              if (
                y + i + j >= 0 &&
                y + i + j <= this.state.customSize - 1 &&
                y + i + j != y
              ) {
                if (
                  (this.grid[x][y + i + j].state.containsPlant =
                    true &&
                    this.grid[x][y + i + j].state.plantName !=
                      this.grid[x][y + i].state.plantName)
                ) {
                  if (this.grid[x][y + i + j].state.badCell == true) {
                    this.grid[x][y + i].setState({
                      backgroundColor: '#800000',
                    });
                  }
                  if (
                    this.grid[x][y + i + j].state.badCell == false &&
                    this.grid[x][y + i + j].state.goodCell == true
                  ) {
                    this.grid[x][y + i].setState({
                      backgroundColor: 'green',
                    });
                  }
                  if (
                    this.grid[x][y + i + j].state.badCell == false &&
                    this.grid[x][y + i + j].state.goodCell == false &&
                    this.grid[x][y + i + j].state.containsPlant == true
                  ) {
                    this.grid[x][y + i].setState({
                      backgroundColor: '#5d3727',
                    });
                  }
                  if (
                    this.grid[x][y + i + j].state.badCell == false &&
                    this.grid[x][y + i + j].state.goodCell == false &&
                    this.grid[x][y + i + j].state.plantName == ''
                  ) {
                    this.grid[x][y + i].setState({
                      backgroundColor: '#5d3727',
                    });
                  }
                }
              }
            }
          }
        }
      } // Show this ^^^
    }
  };

  // Checks adjacent cells
  // Get the name of the current plant check bad neighbor array vs neighbor cells
  // Same for good neighbor
  onPlace = (x, y, goodArray, badArray) => {
    const goodNeighbor = [].concat(goodArray);
    const badNeighbor = [].concat(badArray);
    if ((this.grid[x][y].state.containsPlant = true)) {
      for (let i = -1; i <= 1; i++) {
        // Y
        if (x + i >= 0 && x + i <= this.state.customSize - 1 && x + i != x) {
          if (this.grid[x + i][y].state.containsPlant) {
            if (badNeighbor.includes(this.grid[x + i][y].state.plantName)) {
              this.grid[x + i][y].setState({
                backgroundColor: '#800000',
                badCell: true,
              });
              this.grid[x][y].setState({
                backgroundColor: '#800000',
                badCell: true,
              });
            }
            if (
              goodNeighbor.includes(this.grid[x + i][y].state.plantName) &&
              this.grid[x + i][y].state.badCell == true
            ) {
              this.grid[x][y].setState({
                backgroundColor: 'green',
                goodCell: true,
              });
            }
            if (
              goodNeighbor.includes(this.grid[x + i][y].state.plantName) &&
              this.grid[x + i][y].state.badCell == false
            ) {
              this.grid[x + i][y].setState({
                backgroundColor: 'green',
                goodCell: true,
              });
              this.grid[x][y].setState({
                backgroundColor: 'green',
                goodCell: true,
              });
            }
          }
        }
      }
    } //Show this ^^^
    for (let j = -1; j <= 1; j++) {
      if (y + j >= 0 && y + j <= this.state.customSize - 1 && y + j != y) {
        if (this.grid[x][y + j].state.containsPlant) {
          if (badNeighbor.includes(this.grid[x][y + j].state.plantName)) {
            this.grid[x][y + j].setState({
              backgroundColor: '#800000',
              badCell: true,
            });
            this.grid[x][y].setState({
              backgroundColor: '#800000',
              badCell: true,
            });
          }
          if (
            goodNeighbor.includes(this.grid[x][y + j].state.plantName) &&
            this.grid[x][y + j].state.badCell == true
          ) {
            this.grid[x][y].setState({
              goodCell: true,
              backgroundColor: 'green',
            });
          }
          if (
            goodNeighbor.includes(this.grid[x][y + j].state.plantName) &&
            this.grid[x][y + j].state.badCell == false
          ) {
            this.grid[x][y + j].setState({
              goodCell: true,
              backgroundColor: 'green',
            });
            this.grid[x][y].setState({
              goodCell: true,
              backgroundColor: 'green',
            });
          }
        }
      }
    }
  };

  renderGrid = () => {
    return Array.apply(
      null,
      Array((defaults.boardSize = this.state.customSize))
    ).map((el, rowIdx) => {
      let cellList = Array.apply(
        null,
        Array((defaults.boardSize = this.state.customSize))
      ).map((el, colIdx) => {
        return (
          <Cell
            onPlace={this.onPlace}
            onRemove={this.onRemove}
            key={colIdx}
            width={defaults.cellSize}
            height={defaults.cellSize}
            x={colIdx}
            y={rowIdx}
            ref={(ref) => {
              this.grid[colIdx][rowIdx] = ref;
            }}
          />
        );
      });
      return (
        <View
          key={rowIdx}
          style={{
            width: this.sqrfootWidth,
            height: defaults.cellSize,
            flexDirection: 'row',
          }}
        >
          {cellList}
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: this.sqrfootWidth,
            height: this.sqrfootWidth,
            backgroundColor: '#888888',
            flexDirection: 'column',
          }}
        >
          {this.renderGrid()}
        </View>
      </View>
    );
  }
}
export default Grid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
