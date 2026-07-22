# 24frames

24frames is an artistic animated movie archive built with React, React Router,
Redux Toolkit, and JSON Server.

## Run

```bash
npm install
npm run dev
```

The dev script starts both services:

- Web: `http://localhost:5173`
- API: `http://127.0.0.1:3001/movies`

## Assignment Coverage

- Fetch movie data from a REST API with loading and error states.
- Render product/movie list with poster, name, description, original price, and current price.
- Add new movie records with controlled form fields and validation.
- Delete movie records and refresh Redux state immediately.
- View a dedicated movie detail page with `useParams`.
- Edit movie records with a pre-filled form, PUT request, and `useNavigate` redirect.
- Use React Router for navigation across landing, list, create, detail, and edit pages.
- Use Redux Toolkit store, slice, actions, reducers, and async thunks for bonus state management.

## Assets

- Landing video: `public/Dream 5.mp4`
- Movie posters: the hash-named `.jpg` files in `public`
- PSD design exports: `public/design-*.jpg`
