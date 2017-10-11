import React from 'react'
import { connect } from 'react-redux';

import { flashMsgClass, removeFlashMessage } from 'actions/display';

export class FlashMessage extends React.Component {

    componentDidMount() {
        let delay = this.props.delay || 200;
        // console.log('componentDidMount');
        const $this = this;
        setTimeout(function() {
            $this.props.dispatch(flashMsgClass('fadeIn'));
        }, delay);
    }

    componentWillReceiveProps(nextProps) {
        const $this = this;
        const currentClass = this.props.flashClass;
        const nextClass    = nextProps.flashClass;
        if(currentClass === '' && nextClass === 'fadeIn') {
            setTimeout(function() {
                $this.props.dispatch(flashMsgClass(''));
            }, 2000);
        } else if(currentClass === 'fadeIn' && nextClass === '') {
            setTimeout(function() {
                $this.props.dispatch(removeFlashMessage());
            }, 500);
        }
    }

    render() {
        return(
            <div className={`flash-message ${this.props.flashClass}`}>
                <div className="flash-box">
                    <h2>{this.props.msg}</h2>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        flashClass: state.display.flashClass
    }
};

export default connect(mapStateToProps)(FlashMessage);