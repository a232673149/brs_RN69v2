import React from 'react';
import {StyleSheet, View} from 'react-native';




const debug = false;


const minmaxPxPx = /^\s*minmax\(\s*(\d+(\.\d+)?)px\s*,\s*(\d+(\.\d+)?)px\s*\)\s*$/;
const minmaxPxFr = /^\s*minmax\(\s*(\d+(\.\d+)?)px\s*,\s*(\d+(\.\d+)?)fr\s*\)\s*$/;
const frValue = /^\s*(\d+(\.\d+)?)fr\s*$/;


const percentageValue = /^\s*100%\s*$/;


const pxValue = /^\s*(\d+(\.\d+)?)px\s*$/;


const auto = /^\s*auto|minmax\(\s*auto\s*,\s*auto\s*\)\s*$/;


const minmaxPxMax = /^\s*minmax\(\s*(\d+(\.\d+)?)px\s*,\s*auto\s*\)\s*$/;
const minmaxAutoPx = /^\s*minmax\(\s*auto\s*,\s*(\d+(\.\d+)?)px\s*\)\s*$/;

function genCellStyle(value, horizontal, absolute) {
  let result;

  result = value.match(auto); 
  if (result) {
    return {
      flexGrow: 1,
      flexShrink: 1,
    };
  }

  result = value.match(frValue); 
  if (result) {
    return {
      flexGrow: parseFloat(result[1]), 
      flexShrink: 1,
      minHeight: !horizontal && !absolute ? parseFloat(result[1]) : null, 
    };
  }

  result = value.match(percentageValue); 
  if (result) {
    return {
      flexGrow: 0,
      flexShrink: 0,
      width: horizontal ? '100%' : null, 
      height: !horizontal ? '100%' : null, 
    };
  }

  result = value.match(pxValue); 
  if (result) {
    return {
      flexGrow: 0,
      flexShrink: 0,
      width: horizontal ? parseFloat(result[1]) : null, 
      height: !horizontal ? parseFloat(result[1]) : null, 
      flexBasis: !horizontal ? parseFloat(result[1]) : null, 
    };
  }

  result = value.match(minmaxPxFr); 
  if (result) {
    return {
      flexGrow: parseFloat(result[3]), 
      flexShrink: 1,
      minWidth: horizontal ? parseFloat(result[1]) : null, 
      minHeight: !horizontal ? parseFloat(result[1]) : null, 
      flexBasis: !horizontal ? parseFloat(result[1]) : null, 
    };
  }

  result = value.match(minmaxPxMax); 
  if (result) {
    return {
      flexGrow: 0,
      flexShrink: 1,
      minWidth: horizontal ? parseFloat(result[1]) : null, 
      minHeight: !horizontal ? parseFloat(result[1]) : null, 
      flexBasis: !horizontal ? parseFloat(result[1]) : null, 
    };
  }

  result = value.match(minmaxPxPx); 
  if (result) {
    return {
      flexGrow: parseFloat(result[3]),
      flexShrink: 1,
      minWidth: horizontal ? parseFloat(result[1]) : null, 
      minHeight: !horizontal ? parseFloat(result[1]) : null, 
      flexBasis: !horizontal ? parseFloat(result[1]) : null, 
      maxWidth: horizontal ? parseFloat(result[3]) : null, 
      maxHeight: !horizontal ? parseFloat(result[3]) : null, 
    };
  }

  result = value.match(minmaxAutoPx); 
  if (result) {
    return {
      flexGrow: parseFloat(result[1]),
      flexShrink: 1,
      maxWidth: horizontal ? parseFloat(result[1]) : null, 
      maxHeight: !horizontal ? parseFloat(result[1]) : null, 
    };
  }

  throw Error(`${value} not support`);
}

function renderHor(props, WrappedComponent, hStyle) {
  const {
    layout: {visible = true, style} = {}, 
    pxDebug,
    pxRef,
    ...childProps
  } = props;

  const cStyle = pxDebug ? styles.cellDebug : styles.cell;
  switch (hStyle.length) {
    case 1:
      return (
        <React.Fragment>
          <View
            key={'box'}
            pointerEvents="box-none"
            style={[cStyle, styles.vertical, hStyle[0]]}>
            {visible === false ? null : (
              <WrappedComponent
                key={'body'}
                pxDebug={pxDebug}
                ref={pxRef}
                style={style}
                {...childProps}
              />
            )}
          </View>
        </React.Fragment>
      );

    case 3:
      return (
        <React.Fragment>
          <View
            key={'box-left'}
            pointerEvents="box-none"
            style={[cStyle, hStyle[0]]}
          />
          <View
            key={'box'}
            pointerEvents="box-none"
            style={[cStyle, styles.vertical, hStyle[1]]}>
            {visible === false ? null : (
              <WrappedComponent
                key={'body'}
                pxDebug={pxDebug}
                ref={pxRef}
                style={style}
                {...childProps}
              />
            )}
          </View>
          <View
            key={'box-right'}
            pointerEvents="box-none"
            style={[cStyle, hStyle[2]]}
          />
        </React.Fragment>
      );

    case 5:
      return (
        <React.Fragment>
          <View
            key={'box-left'}
            pointerEvents="box-none"
            style={[cStyle, hStyle[0]]}
          />
          <View
            key={'box-leftSpace'}
            pointerEvents="box-none"
            style={[cStyle, hStyle[1]]}
          />
          <View
            key={'box'}
            pointerEvents="box-none"
            style={[cStyle, styles.vertical, hStyle[2]]}>
            {visible === false ? null : (
              <WrappedComponent
                key={'body'}
                pxDebug={pxDebug}
                ref={pxRef}
                style={style}
                {...childProps}
              />
            )}
          </View>
          <View
            key={'box-rightSpace'}
            pointerEvents="box-none"
            style={[cStyle, hStyle[3]]}
          />
          <View
            key={'box-right'}
            pointerEvents="box-none"
            style={[cStyle, hStyle[4]]}
          />
        </React.Fragment>
      );

    default:
      throw Error('not support');
  }
}

function renderVer(props, WrappedComponent) {
  const {
    layout: {
      absolute = false,
      zIndex = undefined,
      trackStyle = undefined, 
      areaStyle = undefined, 
      xy = [['auto'], ['auto']],
      outerStyle = {},
    } = {},
    pxDebug,
  } = props;

  const cStyle = pxDebug ? styles.cellDebug : styles.cell;
  const vStyle = xy[1].map(e => genCellStyle(e, false, absolute));
  const hStyle = xy[0].map(e => genCellStyle(e, true, absolute));
  const outerStyleMerge = {
    zIndex,
    ...(absolute ? styles.absolute : styles.relative),
    ...outerStyle,
  };

  switch (vStyle.length) {
    case 1:
      return (
        <View key={'outer'} pointerEvents="box-none" style={outerStyleMerge}>
          <View
            key={'box-vertical'}
            pointerEvents="box-none"
            style={[styles.horizontal, vStyle[0]]}>
            {renderHor(props, WrappedComponent, hStyle)}
          </View>
        </View>
      );

    case 3:
      return (
        <View key={'outer'} pointerEvents="box-none" style={outerStyleMerge}>
          <View
            key={'box-top'}
            pointerEvents="box-none"
            style={[cStyle, vStyle[0]]}
          />
          <View
            key={'box-vertical'}
            pointerEvents="box-none"
            style={[styles.horizontal, vStyle[1]]}>
            {renderHor(props, WrappedComponent, hStyle)}
          </View>
          <View
            key={'box-bottom'}
            pointerEvents="box-none"
            style={[cStyle, vStyle[2]]}
          />
        </View>
      );

    case 5:
      return (
        <View key={'outer'} pointerEvents="box-none" style={outerStyleMerge}>
          <View
            key={'box-top'}
            pointerEvents="box-none"
            style={[cStyle, vStyle[0]]}
          />
          <View
            key={'box-topSpace'}
            pointerEvents="box-none"
            style={[cStyle, vStyle[1]]}
          />
          <View
            key={'box-vertical'}
            pointerEvents="box-none"
            style={[styles.horizontal, vStyle[2]]}>
            {renderHor(props, WrappedComponent, hStyle)}
          </View>
          <View
            key={'box-bottomSpace'}
            pointerEvents="box-none"
            style={[cStyle, vStyle[3]]}
          />
          <View
            key={'box-bottom'}
            pointerEvents="box-none"
            style={[cStyle, vStyle[4]]}
          />
        </View>
      );

    default:
      throw Error('not support');
  }
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
  },

  relative: {
    position: 'relative',
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: 'column',
  },

  vertical: {flexDirection: 'column'},
  horizontal: {flexDirection: 'row'},

  cell: {
    position: 'relative',
    borderColor: debug ? '#ff0000' : null,
    borderWidth: debug ? 1 : null,
  },

  cellDebug: {
    position: 'relative',
    borderColor: '#ff0000',
    borderWidth: 1,
  },
});

export default function posize(WrappedComponent) {
  return props => renderVer(props, WrappedComponent);
}
