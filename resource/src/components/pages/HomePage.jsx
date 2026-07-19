import { Button, Container } from 'react-bootstrap';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../provider/AppProvider';
import { useState } from "react";

const HomePage = () => {
  const { movies } = useAppContext();

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  const filteredMovies = movies.filter((movie) => {
    return (
      (selectedGenre === "" || movie.genre === selectedGenre) &&
      (selectedYear === "" || String(movie.releaseYear) === String(selectedYear)) &&
      (selectedTitle === "" || movie.title.toLowerCase().includes(selectedTitle.toLowerCase()))
    );
  });

  return (
    <Container>
      <Form>
        <Row>
          <Col md={3}>
            <Form.Select
              aria-label="Select product category"
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value)}
            >
              <option value="">All genres</option>
              {movies.map((movie) => (
                <option key={movie.id + movie.genre} value={movie.genre}>
                  {movie.genre}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select
              aria-label="Select release year"
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
            >
              <option value="">All Years</option>
              {movies.map((movie) => (
                <option key={movie.id + movie.releaseYear} value={movie.releaseYear}>
                  {movie.releaseYear}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={selectedTitle}
              onChange={(event) => setSelectedTitle(event.target.value)}
            />
          </Col>
        </Row>
      </Form>

      <Button
        as={Link}
        to="/booking/create"
        variant="primary"
        style={{ marginTop: "20px" }}
      >
        book
      </Button>

      <Row>
        {filteredMovies.map((movie) => (
          <Col
            key={movie.id}
            sm={4}
            style={{ marginTop: "20px" }}
          >
            <Card
              style={{
                padding: "10px",
                height: "100%",
              }}
            >
              <h5>{movie.title}</h5>

              <div style={{ color: "gray" }}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "260px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />

                <p>Genre: {movie.genre}</p>
                <p>Release year: {movie.releaseYear}</p>
                <p>Duration: {movie.duration}</p>
                <p>Rating: {movie.rating}</p>
                <p>Booked: {movie.booked}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;