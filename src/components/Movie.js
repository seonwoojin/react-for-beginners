import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({ id, movieNm, salesAcc }) {
  return (
    <div>
      <h2>
        <Link to={`/movie/${id}`}>{movieNm}</Link>
      </h2>
      <p>{salesAcc}</p>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  movieNm: PropTypes.string.isRequired,
  salesAcc: PropTypes.string.isRequired,
};

export default Movie;
