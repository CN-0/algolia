import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const Header = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      props.handleChange(searchTerm);
      props.sendSearches(props.token, searchTerm);
    }
  };

  return (
    <div className="header">
      <div className="header-title">
        <div className="header-title-icon">
          <p className="title-icon-p">
            {props.username.toUpperCase().charAt(0)}
          </p>
        </div>
        <p className="header-title-name">{props.username}</p>
      </div>
      <div className="search ml-auto">
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 16 16"
          className="search-icon"
          fill="#ff742b"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
          />
          <path
            fillRule="evenodd"
            d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
          />
        </svg>
        <input
          className="search-input"
          value={searchTerm}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchTerm(e.target.value)}
          type=""
          placeholder="Search stories by title, url or author"
          aria-label="Search"
        />
      </div>
      <button
        onClick={() => props.logout(props.token)}
        className="btn btn-logout"
      >
        Logout
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (token) => dispatch(actions.logout(token)),
    sendSearches: (token, item) => dispatch(actions.postSearches(token, item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
