import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";
import ReactDOM from "react-dom";
import autobind from "react-autobind";

export default class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.autoOpen
    };
    if (props.toggleOn === "hover") {
      this.onMouseOver = props.inDelay > 0
        ? _.debounce(this.toggleDropdown, props.inDelay)
        : this.toggleDropdown;
      this.onMouseOut = props.outDelay > 0
        ? _.debounce(this.toggleDropdown, props.inDelay)
        : this.toggleDropdown;
    }
    autobind(
      this,
      "onClick",
      "addBodyListener",
      "removeBodyListener",
      "bodyClickHandler",
      "toggleDropdown",
      "getHoverEventProps",
      "getClickEventProps"
    );
  }
  componentWillMount() {
    const { toggleOn, autoOpen } = this.props;
    if (toggleOn === "click" && autoOpen) {
      this.addBodyListener();
    }
  }

  componentDidUpdate() {
    const containerRect = this.refs.dropdownContainer.getBoundingClientRect();
    if (window.innerHeight < containerRect.bottom + this.props.scrollOffset) {
      window.scrollTo(
        0,
        window.scrollY +
          containerRect.bottom +
          this.props.scrollOffset -
          window.innerHeight
      );
    }
  }
  componentDidMount() {
    this.setState({ element: ReactDOM.findDOMNode(this) });
  }
  componentWillUnmount() {
    this.removeBodyListener();
  }
  addBodyListener() {
    document.body.addEventListener("click", this.bodyClickHandler);
  }
  removeBodyListener() {
    document.body.removeEventListener("click", this.bodyClickHandler);
  }
  bodyClickHandler(event) {
    let { toggleOnSelfClick } = this.props;
    if (toggleOnSelfClick) {
      this.toggleDropdown();
    } else if (
      !this.state.element.contains(event.target) && this.state.isOpen
    ) {
      this.toggleDropdown();
    }
  }
  toggleDropdown(){
    const isOpen = !this.state.isOpen;
    this.setState({
      isOpen: isOpen
    });
    if (this.props.toggleOn === "click") {
      if (isOpen) {
        this.addBodyListener();
      } else {
        this.removeBodyListener();
      }
    }
    if (typeof this.props.onToggle === "function") {
      this.props.onToggle(isOpen);
    }
  };
  onClick(e){
    e.stopPropagation();
    this.toggleDropdown();
  };
  getHoverEventProps(type) {
    const { toggleOn } = this.props;
    if (toggleOn === "hover") {
      return {
        onMouseOver: this.onMouseOver,
        onMouseOut: this.onMouseOut
      };
    } else {
      return {};
    }
  }
  getClickEventProps(type) {
    const { toggleOn } = this.props;
    if (toggleOn === "click") {
      return {
        onClick: this.onClick
      };
    } else {
      return {};
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.autoOpen !== nextProps.autoOpen) {
      this.setState({
        isOpen: nextProps.autoOpen
      });
    }
    if (nextProps.toggle) {
      this.toggleDropdown();
    }
  }
  render() {
    const { className, header, children } = this.props;
    const containerClass = classnames("dropdown-component", className, {
      "is-open": this.state.isOpen
    });
    const dropdownStyle = {
      display: this.state.isOpen ? null : "none"
    };
    return (
      <div className={containerClass} {...this.getHoverEventProps()}>
        <div className="dropdown-header" {...this.getClickEventProps()}>
          {header}
        </div>
        <div
          className="dropdown-container"
          style={dropdownStyle}
          ref="dropdownContainer"
        >
          {children}
        </div>
      </div>
    );
  }
}

Dropdown.defaultProps = {
  autoOpen: false,
  toggleOn: "click",
  closeOnBodyClick: true,
  scrollOffset: 0,
  inDelay: 0,
  outDelay: 1000,
  toggleOnSelfClick: false
};

Dropdown.propTypes = {
  autoOpen: PropTypes.bool,
  className: PropTypes.string,
  toggleOn: PropTypes.oneOf(["hover", "click", "headerClick"]),
  header: PropTypes.element.isRequired,
  inDelay: PropTypes.number,
  outDelay: PropTypes.number,
  toggleOnSelfClick: PropTypes.bool
};
