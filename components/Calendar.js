import React from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import Svg, { G, Path, Text, Line, Rect, Ellipse } from 'react-native-svg';

import Images from '.././assets/Images';
// SVG Attributes
const margin = 20,
  chartWidth = 450,
  barHeight = 20,
  barPadding = 1,
  labelMargin = 175,
  rowHeight = barHeight + barPadding * 2,
  gridWidth = chartWidth - margin * 2 - labelMargin,
  gridUnit = gridWidth / 12;

// For generating the x-axis labels
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const calculateDate = (date) => {
  if (date != null) {
    console.log(date);
    const month = date.split('-')[1];
    const day = date.split('-')[2];
    return day >= 20
      ? month
      : day > 10
      ? month - 0.5
      : day <= 10
      ? month - 1
      : null;
  }
};

const calcBarWidth = (start, end) => {
  if (!start || !end) {
    return 0;
  }
  return (calculateDate(end) - calculateDate(start)) * gridUnit;
};

const calcBarStart = (date) => {
  return calculateDate(date) * gridUnit;
};

function Calendar({ crops }) {
  console.log(crops);
  return (
    <ScrollView style={{ backgroundColor: '#1a1a1a' }}>
      <Svg
        viewBox={`80 0 ${chartWidth} ${50 + margin * 2}`}
        height={150}
        width={chartWidth}
      >
        <G transform={`translate(${labelMargin}, ${margin})`} height={22}>
          <G>
            <Line stroke="white" x2={gridWidth} />
            {months.map((month, index) => {
              return (
                <G
                  key={`month-${index}`}
                  id={`${month.toLowerCase()}`}
                  transform={`translate(${index * gridUnit})`}
                >
                  <Text
                    fontSize={10}
                    fontFamily="sans-serif"
                    y="-10"
                    textAnchor="start"
                    fill="white"
                  >
                    {month}
                  </Text>
                </G>
              );
            })}
          </G>
          <Ellipse
            cx="15"
            cy="50"
            rx="9"
            ry="7"
            stroke="black"
            strokeWidth="2"
            fill="#47bf6b"
          />
          <Text x={27} y={54} fontSize={12} fill="white">
            Indoors
          </Text>
          <Ellipse
            cx="85"
            cy="50"
            rx="9"
            ry="7"
            stroke="black"
            strokeWidth="2"
            fill="red"
          />
          <Text x={95} y={54} fontSize={12} fill="white">
            Transplant
          </Text>
          <Ellipse
            cx="170"
            cy="50"
            rx="9"
            ry="7"
            stroke="black"
            strokeWidth="2"
            fill="yellow"
          />
          <Text x={180} y={54} fontSize={12} fill="white">
            Outdoor
          </Text>
          {crops.slice().map((crop, index) => (
            <G transform={`translate(0, ${index * rowHeight})`}>
              {crop ? (
                <>
                  <Rect
                    fill={'#47bf6b'}
                    height={7}
                    width={calcBarWidth(crop.startIndoor, crop.endIndoor)}
                    x={calcBarStart(crop.startIndoor)}
                    y={7}
                  />
                  <Rect
                    fill={'yellow'}
                    height={7}
                    width={calcBarWidth(
                      crop.transplantStart,
                      crop.transplantEnd
                    )}
                    x={calcBarStart(crop.transplantStart)}
                    y={7}
                  />
                  <Rect
                    fill={'red'}
                    height={7}
                    width={calcBarWidth(crop.outsideStart, crop.outsideEnd)}
                    x={calcBarStart(crop.outsideStart)}
                    // width={calcBarWidth(crop.harvestStart, crop.harvestEnd)}
                    // x={calcBarStart(crop.harvestStart)}
                    y={7}
                  />
                </>
              ) : null}
              <Image
                source={Images[crop.Name]}
                style={{
                  width: 40,
                  height: 40,
                  left: 25,
                  top: 10,
                }}
                resizeMode="contain"
              />
              <Text
                x={-80}
                y={35}
                textAnchor="start"
                fontSize={15}
                fill="white"
              >
                {crop.Name}
              </Text>
            </G>
          ))}
          <G
            fill="none"
            transform={`translate(${0}, ${crops.length * rowHeight})`}
          >
            <Path
              stroke="white"
              d={`
                  M 0.5, ${-22}
                  V 0.5
                  H ${gridWidth + 0.5} 
                  V ${-22}
                `}
            />

            {months.map((month, index) => {
              return (
                <Line
                  key={`month-${index}-tick`}
                  transform={`translate(${(index + 1) * gridUnit + 0.5}, 0)`}
                  stroke="white"
                  y2={`-${22}`}
                />
              );
            })}
          </G>
        </G>
      </Svg>
    </ScrollView>
  );
}

export default Calendar;
StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
});
