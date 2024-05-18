import { Carousel, Rating } from "flowbite-react";

function PlaceDetailCard({ details }: { details: any }) {
  const {
    name,
    photos,
    reviews,
    rating,
    user_ratings_total,
    formatted_address,
  } = details;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600 mb-4">{formatted_address}</p>
      <Rating className="mb-4 ">
        <Rating.Star />
        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
          {rating}
        </p>
        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
        <a className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
          {user_ratings_total} reviews
        </a>
      </Rating>

      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mb-6">
        {photos && photos.length > 0 && (
          <Carousel>
            {photos.slice(0, 5).map((photo: any, index: number) => (
              <img
                key={index}
                src={photo.getUrl()}
                alt={`${name} photo ${index + 1}`}
                className="object-cover w-full h-full"
              />
            ))}
          </Carousel>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3">Reviews:</h3>
        {reviews && reviews.length > 0 ? (
          reviews.map((review: any, index: number) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-800 mb-2">{review.text}</p>
              <p className="text-gray-600">Rating: {review.rating}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews available</p>
        )}
      </div>
    </div>
  );
}

export default PlaceDetailCard;
