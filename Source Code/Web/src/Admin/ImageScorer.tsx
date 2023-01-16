import React, { useState } from 'react';

interface Comments {
  author: string;
  text: string;
}
interface Image {
  id: string;
  url: string;
  scores: { [key: string]: number | null };
  comments?: Comments;
}
interface ImageScorerProps {
  images: Image[];
  factors: string[];
}

const ImageScorer: React.FC<ImageScorerProps> = ({ images, factors }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [scores, setScores] = useState<{ [key: string]: number | null }>(images[0].scores);
  const [comments, setComments] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const selectedImage = images[selectedImageIndex];



  
  const handleNextImage = () => {
    if (selectedImageIndex === images.length - 1) {
      setSelectedImageIndex(0);
    } else {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
    if (selectedImage?.comments) {
      setScores(images[selectedImageIndex].scores);
      setComments(selectedImage.comments.text);
      setAuthor(selectedImage.comments.author);
    }
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex === 0) {
      setSelectedImageIndex(images.length - 1);
    } else {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
    // set the initial value of comments and author fields. Temp solution
    if (selectedImage?.comments) {
      setComments(selectedImage.comments.text);
      setAuthor(selectedImage.comments.author);
    }
  };

  const handleScoreClick = (factor: string, newScore: number) => {
  setScores({ ...scores, [factor]: newScore });
};


  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComments(event.target.value);
  };
  
  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const handleScoreSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedImage) {
      return;
    }
    let isFormValid = true;
    // check if all factors have been rated
    for (const factor in scores) {
      console.log(factor, scores);
      if (scores[factor] === null) {
        console.log(scores[factor], factor);
        isFormValid = false;
        break;
      }
    }
    if(author === ''){
        isFormValid = false
    }
    if (isFormValid) {
      // send the scores, comments and author name to the server
      alert("Submitted successfully!");
      handleNextImage();
    } else {
      alert("Please rate all the factors and fill out the author name field before submitting.");
    }
  };

  return (
    <div>
      {selectedImage && (
        <div>
          <img src={selectedImage.url} alt={selectedImage.id} />
          <form onSubmit={handleScoreSubmit}>
            {factors.map(factor => (
              <div key={factor}>
                <label>{factor}:</label>
                {[1, 2, 3, 4, 5].map(value => (
                  <span key={value}>
                    <button
                      type="button"
                      onClick={() => handleScoreClick(factor, value)}
                      className={scores[factor] === value ? 'selected' : ''}
                    >
                      ✰
                    </button>
                    {scores[factor] === value && <label>{value}</label>}
                  </span>
                ))}
              </div>
            ))}
            <div>
              <label>Author Name:</label>
              <input value={author} onChange={handleAuthorChange} />
            </div>
            <div>
            <label>Comments:</label>
              <textarea value={comments} onChange={handleCommentChange} />
            </div>
            <button type="submit">Submit</button>
          </form>
          <div>
            <button onClick={handlePreviousImage}>Previous Image</button>
            <button onClick={handleNextImage}>Next Image</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageScorer;
