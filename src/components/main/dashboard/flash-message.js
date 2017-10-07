import React from 'react'
import { connect } from 'react-redux';

import { flashMsgClass } from 'actions/display';

export class FlashMessage extends React.Component {

    componentDidMount() {
        console.log('componentDidMount');
        const $this = this;
        setTimeout(function() {
            $this.props.dispatch(flashMsgClass('fadeIn'));
        }, 200);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        this.props.dispatch(flashMsgClass(''));
    }

    componentWillReceiveProps(nextProps) {
        const $this = this;
        if(this.props.flashMsgClass === '' && nextProps.flashMsgClass === 'fadeIn') {
            setTimeout(function() {
                $this.props.dispatch(flashMsgClass(''));
            }, 2000);
        } else if(this.props.flashMsgClass === 'fadeIn' && nextProps.flashMsgClass === '') {
            setTimeout(function() {
                $this.props.dispatch(flashMsgClass('hidden'));
            }, 500);
        }
    }

    render() {
        return(
            <div className={`flash-message ${this.props.flashMsgClass}`}>
                <div className="flash-box">
                    <h2>Successfully {this.props.msg}!</h2>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    flashMsgClass: state.display.flashMsgClass
});

export default connect(mapStateToProps)(FlashMessage);