import React, { Component } from "react";

class AutoInput extends Component {
  static keyCode = {
    up: 38,
    down: 40,
    enter: 13,
    tab: 9
  };

  state = {
    value: "",
    result: [],
    style: {},
    activeItemIndex: 9
  };

  handleClick = index => {
    const { result } = this.state;
    const value = result[index].text;

    this.setState({
      result: [],
      value
    });
  };

  handleHover = activeItemIndex => {
    this.setState({ activeItemIndex });
  };

  handleKeyUp = event => {
    const { keyCode } = event;
    const { up, down, enter, tab } = AutoInput.keyCode;

    const { activeItemIndex, result } = this.state;
    const lastIndex = result.length - 1;

    if (keyCode === tab && result.length) {
      event.preventDefault();
      return false;
    }

    if (keyCode === up) {
      this.setState(({ activeItemIndex: index }) => ({
        activeItemIndex: index > 0 ? index - 1 : lastIndex
      }));
      return;
    }

    if (keyCode === down) {
      this.setState(({ activeItemIndex: index }) => ({
        activeItemIndex: index < lastIndex ? index + 1 : 0
      }));
      return;
    }

    if ((keyCode === enter || keyCode === tab) && activeItemIndex > -1) {
      event.preventDefault();
      const value = result[activeItemIndex].text;

      this.setState({
        activeItemIndex: -1,
        result: [],
        value
      });
      return;
    }
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value, activeItemIndex: -1 });
    this.search(value);
  };

  search = async value => {
    let { data, limit = 10, field, lang } = this.props;

    if (typeof data === "function") {
      data = await this.fetch(value);
    }

    if (!Array.isArray(data)) {
      data = [];
    }

    const result = [];
    let activeItem;

    data.forEach((item, index) => {
      if (field) {
        activeItem = mb(field)(item) || "";
      } else {
        activeItem = item;
      }

      const activeLang = lang ? lang : "en-EN";
      const check = activeItem
        .toLocaleLowerCase(activeLang)
        .includes(value.toLocaleLowerCase(activeLang));

      if (check) {
        result.push({
          id: (item && item.id) || index,
          text: activeItem
        });
      }
    });

    this.setState({
      result: value.length ? result.slice(0, limit) : []
    });
  };

  fetch = async value => {
    const { data } = this.props;
    return await data(value);
  };

  render() {
    const { result, activeItemIndex, value } = this.state;
    const { customItem } = this.props;

    const AutoInputItem = customItem ? customItem : AutoInputItem;
    return (
      <div
        className="autoinput autoinput-wrapper"
        style={{ display: "inline-flex", flexDirection: "column" }}
      >
        <AutoInputElement
          value={value}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
        {result.length > 0 && (
          <div className="autoinput-result">
            {result.map((item, index) => (
              <AutoInputItem
                text={item.text}
                isActive={activeItemIndex === index}
                searchKey={value}
                onMouseOver={() => this.handleHover(index)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

function AutoInputElement({ value, onChange, onKeyUp }) {
  return (
    <input
      className="autoinput-input"
      type="text"
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  );
}

function AutoInputWord({ value }) {
  return <span className="autoinput-word">{value}</span>;
}

function AutoInputItem({ isActive, text, searchKey, onMouseOver }) {
  const className =
    "autoinput-item" + (isActive ? " autoinput-item__active" : "");
  return (
    <div className={className} onMouseOver={onMouseOver}>
      {text
        .split(searchKey)
        .map((item, index) =>
          text.length - 1 !== index
            ? [<span>{item}</span>, <AutoInputWord value={searchKey} />]
            : item
        )}
    </div>
  );
}

// mb origin: https://github.com/burakcan/mb
const mb = p => o => p.split(".").map(c => (o = (o || {})[c])) && o;

export default AutoInput;
