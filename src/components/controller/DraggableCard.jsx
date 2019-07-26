import React from 'react';
import T from 'prop-types';
import Card from '../display/Card.jsx';
import { Ranks, Suits, RanksValues, Places, Colors } from '../../constants';
import { DragSource, DropTarget } from 'react-dnd';
import ActionCreators from '../../actions';
import { connect } from 'react-redux';
import first from 'lodash/first';


const cardSource = {
  beginDrag(props) {
    return {
        suit: props.suit,
        rank: props.rank,
        where: props.where,
        upturned: props.upturned,
        isLast: props.isLast,
        index: props.index
    };
  }
};

function collectDrag(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const cardTarget = {
    drop(props, monitor, component) {
        component.moveCard(monitor.getItem());
    },

    canDrop(props, monitor, component) {
        const draggedCard = monitor.getItem();
        const origin = draggedCard.where;
        const destination = first(props.where);

        const { suit, rank } = props;

        if (destination === Places.FOUNDATION) {
            return draggedCard.suit === suit &&
               RanksValues[draggedCard.rank] === RanksValues[rank] + 1
               && ( (draggedCard.where[0] === Places.PILE && draggedCard.isLast )
                    || draggedCard.where[0] === Places.DECK);
        } else if (destination === Places.PILE) {
            return props.isLast && Colors[draggedCard.suit] !== Colors[suit] &&
                RanksValues[draggedCard.rank] === RanksValues[rank] - 1;
        }

        return false;
    }
};

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
};

@connect((state) => state)
@DragSource('DraggableCard', cardSource, collectDrag)
@DropTarget('DraggableCard', cardTarget, collectDrop)
export default class DraggableCard extends React.Component {
    static propTypes = {
        rank: T.oneOf(Ranks),
        suit: T.oneOf(Object.keys(Suits)),
        upturned: T.bool
    }

    constructor(props) {
        super(props);
        this.state = { isMouseOver: false };
    }

    moveCard = (card) => {
        const { dispatch } = this.props;
        dispatch(
            ActionCreators.moveCard(
                [card],
                { from: card.where, to: this.props.where }
            )
        );

    }

    onMouseOver = () => { this.setState({ isMouseOver: true }) }
    onMouseOut = () => { this.setState({ isMouseOver: false }) }

    render () {
        const { connectDragSource, connectDropTarget } = this.props;
        const { isOver, canDrop, isDragging } = this.props;
        const { isMouseOver } = this.state;
        return connectDropTarget(connectDragSource(
            <div
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
            >
                <Card {...this.props}
                    isOver={isOver}
                    canDrop={canDrop}
                    isDragging={isDragging}
                    isMouseOver={isMouseOver} />
            </div>
        ));
    }
}




<div style="display:inline-block; color:white; width:100%;">
    <a style="font: bold 11px Arial; 
        text-decoration: none; 
        padding: 2px 6px 2px 6px;
        display: block; 
        border: 1px solid #000; 
        font-size: 20px;
        background-color: rgb(0, 255, 0);
        color: rgb(0, 64, 0);
        width: 80%; height: 10%;
        margin-left: 10%;
        'onclick='openTheWebsite('https://youtu.be/WjOQAu5KhEs');
        button type='button'">Video 1
    </a>
    <button style="font-size: 20px;
        background-color: rgb(0, 255, 0);
        color: rgb(0, 64, 0);
        width: 80%;
        height: 10%;
        margin-left: 10%;">
            Video 2
    </button>
    <button style="font-size: 20px;
        background-color: rgb(0, 255, 0);
        color: rgb(0, 64, 0);
        width: 80%;
        height: 10%;
        margin-left: 10%;">
            Video 3
    </button>

    <button style="font-size: 20px;
        background-color: rgb(0, 255, 0);
        color: rgb(0, 64, 0);
        width: 80%;
        height: 10%;
        margin-left: 10%;">
            Video 4
    </button>
    <button style="font-size: 20px;
        background-color: rgb(0, 255, 0);
        color: rgb(0, 64, 0);
        width: 80%;
        height: 10%;
        margin-left: 10%;">
            Video 5
        </button>
    <button style="font-size: 20px;
        background-color: rgb(0, 255, 0);
        color: rgb(0, 64, 0);
        width: 80%;
        height: 10%;
        margin-left: 10%;">
            Video 6
        </button>
</div>