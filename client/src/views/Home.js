import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import Moment from "react-moment";
import Filter from "../components/Filter";
import ReactPaginate from "react-paginate";

function Home(props) {
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (props.list_type === "stories") {
      setPageCount(props.stories.nbPages);
    } else if (props.list_type === "comments") {
      setPageCount(props.comments.nbPages);
    } else {
      setPageCount(1);
    }
  }, [props.stories, props.comments]);
  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const params = {};
    for (let param of query.entries()) {
      params[param[0]] = param[1];
    }
    if (Object.keys(params).length === 0 && params.constructor === Object) {
      props.getFromApi({
        type: "story",
        sort: "search",
        query: "",
        page: "0",
        dateRange: "created_at_i>0,created_at_i<10000000000",
      });
    } else {
      params.sort = params.sort === "byDate" ? "search_by_date" : "search";
      switch (params.dateRange) {
        case "last24h":
          params.dateRange = "created_at_i>864000,created_at_i<10000000000";
          break;
        case "pastWeek":
          params.dateRange = "created_at_i>6048000,created_at_i<10000000000";
          break;
        case "pastMonth":
          params.dateRange = "created_at_i>25920000,created_at_i<10000000000";
          break;
        case "pastYear":
          params.dateRange = "created_at_i>311040000,created_at_i<10000000000";
          break;
        default:
          params.dateRange = "created_at_i>0,created_at_i<10000000000";
      }
      props.getFromApi(params);
    }
  }, [props.location.search]);

  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected);
  };

  return (
    <div className="home-container">
      <div className="main-container">
        <Header
          handleChange={(value) => {
            setSearchTerm(value);
          }}
        />
        <Filter page={currentPage} search={searchTerm} />
        {props.stories && props.list_type === "stories"
          ? props.stories.hits.map((item, index) => {
              return (
                <div key={index} className="list-item">
                  <div className="item-header">
                    {item.title}
                    <span>
                      (<span>{item.url}</span>)
                    </span>
                  </div>
                  <div className="item-body">
                    <span>{item.points} points</span>|<span>{item.author}</span>
                    |
                    <span>
                      <Moment date={item.created_at} interval={0} fromNow />
                    </span>
                    |<span>{item.num_comments} comments</span>
                  </div>
                </div>
              );
            })
          : null}
        {props.comments && props.list_type === "comments"
          ? props.comments.hits.map((item, index) => {
              return (
                <div key={index} className="list-item">
                  <div className="item-body">
                    <span>{item.points} points</span>|<span>{item.author}</span>
                    |
                    <span>
                      <Moment date={item.created_at} interval={0} fromNow />
                    </span>
                    |<span>parent</span>|<span>{item.story_title}</span>
                  </div>
                  <div className="item-comment">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.comment_text }}
                    ></div>
                  </div>
                </div>
              );
            })
          : null}
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"container"}
          previousLinkClassName={"previous"}
          breakClassName={"break"}
          nextLinkClassName={"next"}
          pageClassName={"page"}
          disabledClassNae={"disabled"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    stories: state.api.stories,
    comments: state.api.comments,
    list_type: state.api.list_type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFromApi: (data) => dispatch(actions.getFromApi(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
