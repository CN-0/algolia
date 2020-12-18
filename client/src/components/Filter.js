import React, { Component } from "react";
import Select from "./Select";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

class Filter extends Component {
  state = {
    dateRange: "all",
    page: "0",
    prefix: "false",
    query: "",
    sort: "byPopularity",
    type: "story",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      this.setState({ page: this.props.page }, () => {
        this.changeQuery();
      });
    }
    if (prevProps.search !== this.props.search) {
      this.setState({ query: this.props.search }, () => {
        this.changeQuery();
      });
    }
  }

  changeQuery = () => {
    const params = { ...this.state };
    const queryParams = [];
    for (let i in params) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(params[i])
      );
    }
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/",
      search: "?" + queryString,
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value }, () => {
      this.changeQuery();
    });
  };

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex ml-3 mt-1">
          <Select
            title={"Search"}
            id={"type"}
            value={this.state.type}
            options={["all", "stories", "comments"]}
            option_values={["all", "story", "comment"]}
            handleChange={this.handleChange}
          />
          <Select
            title={"by"}
            id={"sort"}
            value={this.state.sort}
            options={["popularity", "date"]}
            option_values={["byPopularity", "byDate"]}
            handleChange={this.handleChange}
          />
          <Select
            title={"for"}
            id={"dateRange"}
            value={this.state.dateRange}
            options={[
              "all time",
              "last 24h",
              "past week",
              "past month",
              "past year",
              "custom range",
            ]}
            option_values={[
              "all",
              "last24h",
              "pastWeek",
              "pastMonth",
              "pastYear",
            ]}
            handleChange={this.handleChange}
          />
        </div>
        <div className="results mr-4">
          <span className="numbers">
            {this.props.stories
              ? this.numberWithCommas(this.props.stories.nbHits)
              : null}{" "}
          </span>{" "}
          results (<span className="numbers">0.004</span> seconds)
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stories: state.api.stories,
  };
};

export default compose(withRouter, connect(mapStateToProps, null))(Filter);
