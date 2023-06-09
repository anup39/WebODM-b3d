import React from "react";
import PropTypes from "prop-types";
import "../css/LayersControlPanel.scss";
import LayersControlLayerMeasuringStandard from "./LayersControlLayerMeasuringStandard";
import { _ } from "../classes/gettext";
import axios from "axios";

export default class LayersControlPanelMeasuring extends React.Component {
  static defaultProps = {
    categories_measuring: [],
    sub_categories: [],
    standard_categories: [],
    project_name: "",
    project_id: 0,
  };
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    categories_measuring: PropTypes.array,
    map: PropTypes.object.isRequired,
    project_name: PropTypes.string,
    project_id: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      style: [],
      project_id: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.project_id !== this.props.project_id) {
      axios
        .get(`/api/category-style/?project=${parseInt(this.props.project_id)}`)
        .then((response) => {
          this.setState({
            style: response.data.results,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    let content = "";

    if (!this.props.standard_categories.length)
      content = (
        <span>
          <i className="loading fa fa-circle-notch fa-spin"></i>{" "}
          {_("No any Measurings yet")}
        </span>
      );
    else {
      content = (
        <div>
          {this.props.standard_categories.length ? (
            <div className="overlays theme-border-primary">
              <LayersControlLayerMeasuringStandard
                map={this.props.map}
                expanded={false}
                layer={{
                  name: "All",
                  view_name: this.props.project_name
                    .replace(/ /g, "_")
                    .toLowerCase(),
                }}
                key={this.props.standard_categories.length + 1}
                sub_categories={this.props.sub_categories}
                categories_measuring={this.props.categories_measuring}
                style={this.state.style}
              />

              {this.props.standard_categories.map((layer, i) => (
                <LayersControlLayerMeasuringStandard
                  map={this.props.map}
                  expanded={false}
                  layer={layer}
                  key={i}
                  sub_categories={this.props.sub_categories}
                  categories_measuring={this.props.categories_measuring}
                  style={this.state.style}
                />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }

    return (
      <div className="layers-control-panel">
        <div>
          <span className="close-button" onClick={this.props.onClose} />
          <div className="title">{_("Measurings")}</div>
        </div>
        <hr />
        {content}
      </div>
    );
  }
}
