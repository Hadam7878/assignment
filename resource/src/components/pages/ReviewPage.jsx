import React from 'react'
import { api } from "../../lib/axios";
import {useState} from 'react'
import { Container } from 'react-bootstrap'
import { useAppContext } from '../../provider/AppProvider'
import { Row, Col, Card, Form, Grid, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
const ReviewPage = () => {

    const { movies, users, booking, setBookings, setMovies} = useAppContext();
      const [selectedUser, setSelectedUser] = useState("");
      const [selectedTitle, setSelectedTitle] = useState("");
      const [selectedDate, setSelectedDate] = useState("");
      const [selectedSeat, setSelectedSeat] = useState("");
      const navigate = useNavigate();
      const selectedMovie = movies.find(
  (movie) => String(movie.title) === String(selectedTitle)
);

const selectedUserObj = users.find(
  (user) => String(user.name) === String(selectedUser)
);

const handleSubmit = async (event) => {
    event.preventDefault();

    const book = Number(selectedSeat);

    if (!selectedUser || !selectedTitle || !selectedDate || !selectedSeat) {
        alert("Please fill all fields");
        return;
    }

    if (book <= 0) {
        alert("Seats must be greater than 0");
        return;
    }

    const bookingResponse = await api.post("/bookings", {
        userId: Number(selectedUserObj.id),
        movieId: Number(selectedMovie.id),
        showTime: selectedDate,
        seats: book,
    });

    setBookings((currentBookings) => [...currentBookings, bookingResponse.data]);

    const movieResponse = await api.patch(`/movies/${selectedMovie.id}`, {
        booked: Number(selectedMovie.booked) + book,
    });

    setMovies((currentMovies) =>
        currentMovies.map((movie) =>
            String(movie.id) === String(selectedMovie.id)
                ? movieResponse.data
                : movie
        )
    );

    alert("Booking successfully");
    navigate("/movies");
    setSelectedUser("");
    setSelectedTitle("");
    
    setSelectedDate("");
    setSelectedSeat("");
};
  return (<Container>
    
<Form onSubmit={handleSubmit}>
        <Row  >
          <Col md={3}> 
        <Form.Select aria-label="Select product category"
                value={selectedUser}
                onChange={(event) =>
                    setSelectedUser(event.target.value)
                }
               >
          <option>
            <p>All users</p> 
          </option>
              {
                users.map((movie)=>
               <option>{movie.name}</option>
                )
}
         
        </Form.Select></Col>
        
          <Col md={3}>
        <Form.Select aria-label="Select release year"
                value={selectedTitle}
                onChange={(event) =>
                    setSelectedTitle(event.target.value)
                }
                
            >
          <option>
            <p>All titles</p> </option>
              {
                movies.map((movie)=>
               <option>{movie.title}</option>
                )
              }
         
        </Form.Select></Col>
        
          <Col md={3}>
          <Form.Control
                        type="date"
                        placeholder="Enter title"
                        value={selectedDate}
                        onChange={(event) => setSelectedDate(event.target.value)}
                        
                    /></Col>
<Col md={3}>
          <Form.Control
                        type="number"
                        placeholder="Enter title"
                        value={selectedSeat}
                        onChange={(event) => setSelectedSeat(event.target.value)}
                        
                    /></Col>
          </Row>            
<Button variant="primary" type="submit">
    Book
</Button>

      </Form>
    </Container>)}
export default ReviewPage

    
