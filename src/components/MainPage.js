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
  const [genres, setGenres] = useState([]);

  const fetchData = url => {
    axios
      .get(`${url}`)
      .then(response => {
        setData([...response.data.results]);
      })
      .catch(err => console.log(err));
  };

  const fetchGenres = () => {
    axios
      .get(
        " https://api.themoviedb.org/3/genre/movie/list?api_key=c0fa6bc64ad08cbe344d1ce681a62d69&language=en-US"
      )
      .then(response => {
        setGenres([...response.data.genres]);
      });
  };

  useEffect(() => {
    fetchGenres();
    fetchData(
      "https://api.themoviedb.org/3/movie/popular?api_key=c0fa6bc64ad08cbe344d1ce681a62d69&language=en-US&page=1"
    );
  }, []);

  const pickGenre = genre_ids => {
    let genre;
    let genreList = [];
    genre_ids.forEach(id => {
      for (genre of genres) {
        if (genre.id === id) {
          genreList.push(genre.name);
        }
      }
    });
    return genreList;
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
          </div>
          <h3 className="heading2">CATEGORIES</h3>
          <div className="category-list">
            {genres &&
              genres.map((genre, index) => {
                return (
                  <NavLink
                    key={index}
                    to={`/discover/:${genre.id}`}
                    className="category"
                  >
                    {genre.name}
                  </NavLink>
                );
              })}
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
                let genreList = pickGenre(movie.genre_ids);
                return (
                  <Col
                    key={index}
                    onMouseOver={e => {
                      const doc = document.querySelectorAll(".item-extra")[
                        index
                      ];
                      doc.style.display = "block";
                    }}
                    onMouseOut={e => {
                      const doc = document.querySelectorAll(".item-extra")[
                        index
                      ];
                      doc.style.display = "none";
                    }}
                    className="item"
                    sm="4"
                    md="3"
                    lg="2"
                  >
                    <Link
                      to={{
                        pathname: "/details",
                        state: { details: movie, genre: genreList, allGenres: genres }
                      }}
                    >
                      <div className="item-content">
                        <img
                          className="item-image"
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          alt="poster"
                        />
                        <div className="item-details">
                          <span className="item-title">
                            {movie.title || movie.name}
                          </span>
                          <p className="item-extra">
                            <span>{`${genreList[0]} . ${new Date(
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
