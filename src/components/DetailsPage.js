import React, { useState, useEffect } from "react";

import { Container, Row, Col, Button } from "reactstrap";

import { Link, useParams, useHistory, useLocation } from "react-router-dom";

import {
  ArrowLeftOutlined,
  StarFilled,
  HeartFilled,
  PlusOutlined
} from "@ant-design/icons";

import axios from "axios";

import "./styles/details.css";

const DetailsPage = () => {
  // const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  // const [movieData, setMovieData] = useState();

  const {
    poster_path,
    id,
    backdrop_path,
    genre_ids,
    title,
    vote_average,
    overview,
    release_date,
original_language
  } = location.state.details;

  const {genre} = location.state

  useEffect(() => {
    console.log(location.state.title);
    // async function fetchData(url) {
    //   axios
    //     .get(`${url}`)
    //     .then(response => {
    //       setData([...response.data.results]);
    //     })
    //     .catch(err => console.log(err));
    // }
    // async function fetchGenres() {
    //   axios
    //     .get(
    //       " https://api.themoviedb.org/3/genre/movie/list?api_key=c0fa6bc64ad08cbe344d1ce681a62d69&language=en-US"
    //     )
    //     .then(response => {
    //       setGenres([...response.data.genres]);
    //     });
    // }
    // fetchGenres();
    // if (category === "discover") {
    //   fetchData(
    //     "https://api.themoviedb.org/3/discover/movie?api_key=c0fa6bc64ad08cbe344d1ce681a62d69&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=true&page=1"
    //   );
    // } else if (category === "popular") {
    //   fetchData(
    //     "https://api.themoviedb.org/3/movie/popular?api_key=c0fa6bc64ad08cbe344d1ce681a62d69&language=en-US&page=1"
    //   );
    // } else if (category === "tv") {
    //   fetchData(
    //     "https://api.themoviedb.org/3/tv/popular?api_key=c0fa6bc64ad08cbe344d1ce681a62d69&language=en-US&page=1"
    //   );
    // } else {
    // }
  });

  return (
    <Container fluid className="main-page">
      <Row>
        <Col className="image-view" sm="3">
          <Row>
            <Col className="details-header">
              <Link className="back" to="/">
                <span>
                  <ArrowLeftOutlined
                    className="pr-3"
                    style={{ verticalAlign: 0 }}
                  />
                  Back home
                </span>
              </Link>
            </Col>

            <Col sm="12" className="image-container">
              <div className="image">
                <img
                  className="image"
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  alt="movie here"
                />
              </div>
            </Col>
          </Row>
        </Col>

        <Col className="details-view" sm="6">
          <Row>
            <Col sm="12" className="details-header">
              <div className="details-nav">
                <span>Film Selection</span>
                <span>Movie Review</span>
                <span>My Home</span>
              </div>
            </Col>

            <Col sm="12" className="description-container">
              <h2 className="description-title">
                {title}
                <HeartFilled className="mt-1" style={{ color: "tomato" }} />
              </h2>
              <p>
                <StarFilled className="star" />
                <StarFilled className="star-empty"/>
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <span className="rating">{vote_average}</span>
              </p>
              <Row className="sub-section">
                <Col sm="8">
                  <p>Type: {genre}</p>
                  <p>Release Date: {release_date}</p>
                  <p>Original Language: {original_language}</p>
                </Col>
                <Col sm="4" style={{ textAlign: "right" }}>
                  <Button
                    onClick={() => alert("Add to collection")}
                    outline
                    style={{ minWidth: "9rem" }}
                  >
                    <span>
                      {" "}
                      <PlusOutlined
                        className="p-2"
                        style={{ verticalAlign: "middle" }}
                      />
                      Collection
                    </span>
                  </Button>
                </Col>
                <Col className="description-text">
                  <p>{overview}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col className="details-side" sm="3">
          <Row>
            <Col sm="12" className="details-header recommendation-header">
              <h2>Movie Recommendation</h2>
            </Col>
            <Col className="recommendation-container">
              <Row className="recommendation-item">
                <Col sm="5">
                  <img
                    className="image"
                    src=" https://via.placeholder.com/100/FF0000/FFFFFF?Text=Down.com

C/O https://placeholder.com/ "
                    alt="movie here"
                  />
                </Col>
                <Col sm="7">
                  <h3>Title here for real</h3>
                  <p>
                    <StarFilled className="star" />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailsPage;
