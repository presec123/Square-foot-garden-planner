import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import defaults from './Defaults';
import Cell from './Cell';

const Grid = () => {
  const [customSize, setCustomSize] = useState(4);
  const sqrfootWidth = defaults.cellSize * defaults.boardSize;
  const grid = useRef(Array.from({ length: customSize }, () => Array.from({ length: customSize }, () => null)));

  const onRemove = (x, y) => {
    const checkAndUpdate = (i, j, offsetX, offsetY) => {
      if (isValidIndex(i + offsetX, this.state.customSize) && i + offsetX !== i) {
        const adjacentCell = this.grid[i + offsetX][j + offsetY].state;
        const currentCell = this.grid[i][j].state;

        if (adjacentCell.containsPlant && adjacentCell.plantName !== currentCell.plantName) {
          if (adjacentCell.badCell) {
            updateBackgroundColor(this.grid[i][j], '#800000');
          } else if (adjacentCell.goodCell) {
            updateBackgroundColor(this.grid[i][j], 'green');
          } else if (adjacentCell.containsPlant) {
            updateBackgroundColor(this.grid[i][j], '#5d3727');
          } else if (adjacentCell.plantName === '') {
            updateBackgroundColor(this.grid[i][j], '#5d3727');
          }
        }
      }
    };

    const processGrid = (offsetX, offsetY) => {
      for (let i = -1; i <= 1; i++) {
        if (isValidIndex(i + offsetX, this.state.customSize) && i + offsetX !== offsetX) {
          if (this.grid[offsetX][offsetY].state.containsPlant) {
            for (let j = -1; j <= 1; j++) {
              if (isValidIndex(j + offsetY, this.state.customSize) && j + offsetY !== offsetY) {
                checkAndUpdate(offsetX, offsetY, i, j);
              }
            }
          }
        }
      }
    };
    if (this.grid[x][y].state.containsPlant) {
      processGrid(x, y);
      processGrid(y, x);
    }
  };

  const renderGrid = () => {
    return Array.from({ length: customSize }, (el, rowIdx) => {
      let cellList = Array.from({ length: customSize }, (el, colIdx) => (
        <Cell
          onPlace={onPlace}
          onRemove={onRemove}
          key={colIdx}
          width={defaults.cellSize}
          height={defaults.cellSize}
          x={colIdx}
          y={rowIdx}
          ref={(ref) => {
            grid.current[colIdx][rowIdx] = ref;
          }}
        />
      ));
      return (
        <View
          key={rowIdx}
          style={{
            width: sqrfootWidth,
            height: defaults.cellSize,
            flexDirection: 'row',
          }}
        >
          {cellList}
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: sqrfootWidth,
          height: sqrfootWidth,
          backgroundColor: '#888888',
          flexDirection: 'column',
        }}
      >
        {renderGrid()}
      </View>
    </View>
  );
};

export default Grid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
