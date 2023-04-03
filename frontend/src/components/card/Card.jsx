import "./card.css";
import StarIcon from "@mui/icons-material/Star";
import dayjs from "dayjs";

const Card = ({ title, desc, rating, username, createdAt }) => {
  return (
    <div className="card">
      <label className="card-label">Place</label>
      <h4 className="place">{title}</h4>
      <label className="card-label">Review</label>
      <p className="desc">{desc}</p>
      <label className="card-label">Rating</label>
      <div className="stars">{Array(rating).fill(<StarIcon className="star" />)}</div>
      <label className="card-label">Information</label>
      <span className="username">
        Create by <b>{username}</b>
      </span>
      <span className="date">{dayjs(createdAt).format("DD/MM/YYYY")}</span>
    </div>
  );
};

export default Card;
