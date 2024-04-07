import  { useState } from 'react';
import { meanBy } from 'lodash';
import { useAppContext } from '../contexts/AppContext';

const PageThree = () => {
  const {showToast} = useAppContext();

  //default/initial reviews
  const initialReviews = [
    { author: 'Super Man', text: 'Great product!', rating: 4, date: new Date() },
    { author: 'Bat Man', text: 'I love it!', rating: 5, date: new Date() },
    { author: 'Spider Man', text: 'Not bad.', rating: 3, date: new Date() }
  ];

  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ author: '', text: '', rating: 0 });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating: parseInt(rating) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //setting errors if there is/are errors
    if (!newReview.author || !newReview.text || newReview.rating === 0) {
      setErrors({ author: !newReview.author, text: !newReview.text, rating: newReview.rating === 0 });
      return;
    }
    setReviews([...reviews, { ...newReview, date: new Date() }]); // add the new review to the array of existing reviews
    setNewReview({ author: '', text: '', rating: 0 }); // clear the new review after adding it to the array
    setErrors({});
    showToast({message: 'Review posted successfully!', type: 'success'}); // success toast/message
  };

  const averageRating = meanBy(reviews, 'rating').toFixed(1);

  return (
    <div className="container mt-2">
      <h3>Product Name</h3>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
        Sequi aliquid ipsa at ad aspernatur molestiae eligendi doloremque accusamus, 
        quas distinctio quia corrupti tenetur harum consequuntur animi et quos nisi quod.
      </p>

      <h3>Reviews</h3>
      <p>Average Rating: {averageRating}</p>

      {reviews.map((review, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{review.author}</h5>
            <p className="card-text">{review.text}</p>
            <p className="card-text">Rating: {review.rating}</p>
            <p className="card-text">Posted on: {review.date.toLocaleString()}</p>
          </div>
        </div>
      ))}

      <hr/>

      <h3>Add Your Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Author Name</label>
          <input type="text" className={`form-control ${errors.author && 'is-invalid'}`} name="author" 
            value={newReview.author} 
            onChange={handleInputChange} />
          {errors.author && <div className="invalid-feedback">Author name is required</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Review Text</label>
          <textarea className={`form-control ${errors.text && 'is-invalid'}`} name="text" 
           value={newReview.text} 
           onChange={handleInputChange}></textarea>
          {errors.text && <div className="invalid-feedback">Review text is required</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <div>
            {[1, 2, 3, 4, 5].map((rating) => (
              <div key={rating} className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="rating" id={`rating${rating}`} 
                    value={rating} 
                    checked={newReview.rating === rating} 
                    onChange={() => handleRatingChange(rating)} />
                <label className="form-check-label" htmlFor={`rating${rating}`}>{rating}</label>
              </div>
            ))}
          </div>
          {errors.rating && <div className="invalid-feedback d-block">Rating is required</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit Review</button>
      </form>
    </div>
  );
};

export default PageThree;
