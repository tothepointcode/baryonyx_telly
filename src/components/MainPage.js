import React, { useEffect, useState } from "react";

// UI
import { Container, Row, Col } from "reactstrap";
import { UserOutlined, BellFilled, SearchOutlined } from "@ant-design/icons";

// React router
import { NavLink, Link, useParams, Redirect } from "react-router-dom";

// API Tool
import axios from "axios";

// Custom styles
import "./styles/main.css";

const MainPage = () => {
  const { category } = useParams();
  const [data, setData] = useState();
  const [genres, setGenres] = useState();

  useEffect(() => {
    async function fetchData(url) {
      axios
        .get(`${url}`)
        .then(response => {
          setData([...response.data.results]);
        })
        .catch(err => console.log(err));
    }

    async function fetchGenres() {
      axios
        .get(
          " https://api.themoviedb.org/3/genre/movie/list?api_key=c0fa6bc64ad08cbe344d1ce681a62d69&language=en-US"
        )
        .then(response => {
          setGenres([...response.data.genres]);
        });
    }

    fetchGenres();

    if (category === "discover") {
      fetchData(
        "https://api.themoviedb.org/3/discover/movie?api_key=c0fa6bc64ad08cbe344d1ce681a62d69&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=true&page=1"
      );
    } else if (category === "popular") {
      fetchData(
        "https://api.themoviedb.org/3/movie/popular?api_key=c0fa6bc64ad08cbe344d1ce681a62d69&language=en-US&page=1"
      );
    } else if (category === "tv") {
      fetchData(
        "https://api.themoviedb.org/3/tv/popular?api_key=c0fa6bc64ad08cbe344d1ce681a62d69&language=en-US&page=1"
      );
    } else {
    }
  });

  const pickGenre = genre_ids => {
    let genre;
    for (genre of genres) {
      if (genre.id === genre_ids[0]) {
        return genre.name;
      }
    }
  };

  if (category === undefined) {
    return <Redirect to="/discover" />;
  }

  return (
    <Container fluid className="main-page">
      <Row>
        <Col className="side-panel" sm="4" md="3" lg="2">
          <h2 className="heading">Telly</h2>
          <h3 className="heading2">Browse Telly</h3>
          <div className="category-list">
            <NavLink to="/discover" className="category">
              DISCOVER
            </NavLink>
            <NavLink to="/tv" className="category">
              TV & MOVIES
            </NavLink>
            <NavLink to="/popular" className="category">
              POPULAR CLIPS
            </NavLink>
          </div>
          <h3 className="heading2">CATEGORIES</h3>
          <div className="category-list">
            <NavLink to="/details1" className="category">
              Comedy
            </NavLink>
            <NavLink to="/details2" className="category">
              Action
            </NavLink>
            <NavLink to="/details" className="category">
              Scientific
            </NavLink>
          </div>
        </Col>

        <Col className="main-view" sm="8" md="9" lg="10">
          <Row>
            <Col sm="12" className="header">
              <div className="avatar-container">
                <span className="notification">
                  <SearchOutlined />
                </span>
                <span className="notification">
                  <BellFilled />
                </span>
                <UserOutlined className="avatar" />
              </div>

              <div className="avatar-text">
                <span>Cobynnha Terra</span>
                <span>Manage Account</span>
              </div>
            </Col>
          </Row>
          <Row className="content">
            <Col className="content-head" sm="12">
              <h2>Recommended for you</h2>
            </Col>
            {!data && <h2>Loading ... </h2>}
            {data &&
              data.map((movie, index) => {
                return (
                  <Col key={index} className="item" sm="4" md="3" lg="2">
                    <Link to="/details/:id">
                      <div className="item-content">
                        <img
                          className="item-image"
                          src={`https://image.tmdb.org/t/p/w500/${
                            movie.poster_path
                          }`}
                          alt="poster"
                        />
                        <div className="item-details">
                          <span className="item-title">
                            {movie.title || movie.name}
                          </span>
                          <p className="item-extra">
                            <span>{`${pickGenre(movie.genre_ids)} . ${new Date(
                              movie.release_date || movie.first_air_date
                            ).getFullYear()}`}</span>
                            <br />
                            <br />
                            <span className="other">
                              {movie.original_language}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Col>
                );
              })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
