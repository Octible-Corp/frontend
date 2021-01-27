import React, { Component } from 'react';
import bem from 'easy-bem';
import ScrollContainer from 'react-indiana-drag-scroll';
import Hieroglyph from './Hieroglyph';
import '../../assets/css/side_scroll_style.css';

const cn = bem('centered-block');

export default class Indiana extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenHieroglyphs: [],
      dragging: false,
      vertical: true
    };
    this.onStartScroll = this.onStartScroll.bind(this);
    this.onEndScroll = this.onEndScroll.bind(this);
  }

  onStartScroll(...args) {
    this.setState({ dragging: true });
  }
  onEndScroll(...args) {
    this.setState({ dragging: false });
  }
  render() {
    return (
      <div
        className={cn('container', {
          dragging: this.state.dragging
        })}
      >
        <ScrollContainer
          className="scroll-container"
          onStartScroll={this.onStartScroll}
          onEndScroll={this.onEndScroll}
          style={{
            width: 'inherit',
            height: '200px'
          }}
        >
          <div className="hieroglyphs" style={{}}>
            <Hieroglyph
              src={this.props.menu.main_photo}
              menuId={this.props.menu.user}
            />
          </div>
        </ScrollContainer>
      </div>
    );
  }
}
