import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";

const PageOne = () => {
  const {showToast} = useAppContext();
  const [items, setItems] = useState(['The Joker', 'Lion King', 'Transformers']);
  const [newMovie, setNewMovie] = useState('');


  //handles for adding a movie
  const handleAddMovie = () => {
    
      setItems([...items, newMovie]); // add it to the items array
      showToast({message: `New Movie Added '${newMovie}'`, type:'success'}); // success Toast
      setNewMovie(''); // clear the stored movie
    }

    //handles the movie deletion
  const handleDeleteMovie = (index) => {
    const updatedItems = items.filter((_, i) => i !== index); // exclude the passed in  movie index
    setItems(updatedItems);
    showToast({message: 'Movie Deleted Successfully.', type: 'success'});
  };


  return (
    <div className="mt-2">
      <h3>My Favorite Movies!</h3>
      <div >
        
          <label htmlFor="newMovie" className="form-label">New Movie Name:</label>
          <input type="text" name="newMovie" id="newMovie" className="form-control" value={newMovie} 
            onChange={(event)=> setNewMovie(event.target.value)} 
          />
          <div>
            <button type="submit" className="btn btn-outline-primary mt-2" onClick={handleAddMovie} disabled={!newMovie}>
              Add
            </button>
          </div>
        
      </div>
      {items.map((movie, index) => (
        <div key={index} className="card my-3">
          <div className="card-body">
            <p>{movie}</p>
            <button className="btn btn-outline-danger btn-md" onClick={() => handleDeleteMovie(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PageOne;
