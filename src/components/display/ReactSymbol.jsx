import React from 'react';
import T from 'prop-types';
import { Colors } from '../../constants';

const ReactSymbol = ({ color }) => {
    return (
        <div style={{
            fontSize: 120,
            fontFamily: 'Apple Symbols',
            position: 'absolute',
            top: '6%',
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'rgb(0, 255, 0)'
        }}>
            ⚛
        </div>
    );
}

ReactSymbol.propTypes = {
    color: T.string
};

export default ReactSymbol;
