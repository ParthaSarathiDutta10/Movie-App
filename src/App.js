import { useState , useEffect } from "react";


const tempMovieData =[];
// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];


//      2d9e86a4



const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const key = '2d9e86a4';


export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const [query, setQuery] = useState("Thor");
  const tempQuery = "interstellar";
  const [arrow , setArrow] = useState(true);
  const [click , setClicked] = useState(true);
  const [selectedMovieId , setSelectedMovieId] = useState(null);
  const [movieDetails , setMovieDetails] = useState(null);



  // const query = "qqqqqq";
  // when query mane search unrelated not matching type hbe  ... tokhon const query = "qqqqqq";



  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie)    => movie.runtime));



  // useEffect(function(){
  //   console.log('After Intial render');
  // },[])

  // useEffect(function(){
  //   console.log('After Every render');
  // })

  // console.log('During Render');

  // useEffect(function(){
  //   console.log("D");
  // },[query])

  function handleWatched(watchedItem){
    setWatched((watched) => [...watched, watchedItem]);
  }
 

  function handleClick(id) {
      setSelectedMovieId((currentId) =>
        currentId === id ? null : id
      );
  }

  // Effect runs after Browser Paint
  useEffect(function(){

      async function fetchMovie() {

          if(query.length < 3){
            setMovies([]);
            setError("");
            return;
          }

          try{
            setIsLoading(true);
            setError('');
              const res= await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${query}`);

              if(!res.ok) throw new Error("Something went wrong with fetching movies");

              const data = await res.json();
              console.log(data.Search);
              // if(query !== ''){
                  if(data.Response  ===  'False') throw new Error("Movie not found");
              // }
            console.log(data.Search);
              setMovies(data.Search);
      
          }

          catch(err){
              setError(err.message);
          }

          finally{
              setIsLoading(false);
          }

      }


      fetchMovie();

  },[query])


  useEffect(function(){
      if (!selectedMovieId) return;
      async function clickedMovieDetails() {
        const pes = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${selectedMovieId}`);
        const datata= await pes.json();
  
         setMovieDetails(datata);
      }
      clickedMovieDetails();
  },[selectedMovieId])


  // const url =`https://www.omdbapi.com/?i=tt3896198&apikey=2d9e86a4`;


    
    // async function getMovies(url) {
    //    const res = await fetch(url);
    //    const data = await res.json();

    //    console.log(data);
    // }

    // getMovies(url);

  // ⁉️⁉️⁉️⁉️⁉️ change ⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults  movies={movies}/>
      </NavBar>
      <Main >
        
        {/* <Box  element={<MovieList movies={movies}  />} />
        <Box
          element={
            <>
              <WatchedSummary avgImdbRating={avgImdbRating} avgUserRating={avgUserRating} avgRuntime={avgRuntime} watched={watched} />
              <WatchedMovieList  watched={watched} />  
            </>
          }
        /> */}
        <Box >
            {/* {isLoading ? <Loader /> : <MovieList movies={movies}  />} */}
            {isLoading && <Loader/>}
            {!isLoading && !error && <MovieList movies={movies} setClick={handleClick} />}
            {error && <ErrorMessage message={error} /> }
        </Box>
        <Box>
          {selectedMovieId && movieDetails  ?
              <>
                  <MovieDetails movie_details={movieDetails}   key={selectedMovieId}  handleWatched={handleWatched}   onClose={() => setSelectedMovieId(null)} watched={watched} />
              </>
              :
              <>
                  <WatchedSummary avgImdbRating={avgImdbRating} avgUserRating={avgUserRating} avgRuntime={avgRuntime} watched={watched} />
                  <WatchedMovieList  watched={watched} click={click} />  
              </>
          }
        </Box> 
      </Main>
    </>
  );

}


function Loader(){
  return <p className="loader" >Loading...</p>
}


function ErrorMessage({message}){
  return <p className="error" >
          <span>⛔️</span>{message}
        </p>
}

const average = (arr) =>

  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// ⁉️⁉️⁉️⁉️⁉️  change  ⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️



function NavBar({children}){
    return(
        <nav className="nav-bar">
            <Logo />
           {children}
        </nav>
    )
}





function Logo(){
  return(
          <div className="logo">
              <span role="img">🎬</span>
              <h1>  Movie-Nest 🍿  </h1>
          </div>
  );
}




function NumResults({movies}){
  return(
        <p className="num-results">
              {/* Found <strong>{movies.length}</strong> results */}
        </p>
  )
}




function Search({query, setQuery}){

  return(
        <input
              className="search"
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
  )
}




//Comment. ❌

// function WatchedBox(){
//     const [watched, setWatched] = useState(tempWatchedData);
//     const [isOpen2, setIsOpen2] = useState(true);
//     const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//     const avgUserRating = average(watched.map((movie) => movie.userRating));
//     const avgRuntime = average(watched.map((movie) => movie.runtime));

//       return(
//               <div className="box">
//                 <button className="btn-toggle" onClick={ ()=>  setIsOpen2((open) =>!open)}>
//                   {isOpen2 ? '-' :'+'}
//                 </button>
//                 {isOpen2 && (
//                   <>
//                     <WatchedSummary avgImdbRating={avgImdbRating} avgUserRating={avgUserRating} avgRuntime={avgRuntime} watched={watched} />
//                     <WatchedMovieList  watched={watched} />     
//                   </>
//                 )}
//               </div>
//       )
// }




function Main({children}){

  return(
    <>
      <main className="main">
      {children}
      </main>
    </>
  )
}




function Box({children}){

    const [isOpen, setIsOpen] = useState(true);
    
    return(
          <div className="box">
              <button
                  className="btn-toggle"
                  onClick={() => setIsOpen((open) => !open)}
                >
              {isOpen ? "-" : "+"}
              </button>
                {isOpen && children}
          </div>
    );

}

function MovieList({movies ,setClick}){

  return(
      <ul className="list">
              {movies?.map((movie) => (
                <Movie movie={movie} setClick = {setClick} key={movie.imdbID}  />
              ))}
      </ul>
  )
}

function Movie({ movie, setClick }){
  return(
                <li onClick={() => setClick(movie.imdbID)}  >
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
  )
}


function WatchedMovieList({watched  }){

  return(
      <>
       
             <div></div>
      
          <ul className="list">
                {watched.map((movie) => (
                  <WatchedMovie movie={movie}  key={movie.imdbID}/>
                ))}
          </ul>
  
      </>
  )
}




function WatchedMovie({movie}){
  return(
     <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                  </p>
                  <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                  </p>
                  <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                  </p>
                </div>
      </li>
  )
}



const  starContainerStyle = { 
    display : "flex",
    padding: `${2}rem`,
};

function MovieDetails({movie_details , onClose , handleWatched, watched }){
  const [hoverRating , setHoverRating] = useState(0);
  const [rating ,setRating]= useState(0);

  const isWatched = watched?.some((movie) => movie.imdbID === movie_details.imdbID);
  const watchedUserRating = watched?.find((movie) => movie.imdbID === movie_details.imdbID)?.userRating;

  function handleRating(i){
    setRating(i+1);
  }

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: movie_details.imdbID,
      Title: movie_details.Title,
      Year: movie_details.Year,
      Poster: movie_details.Poster,
      imdbRating: Number(movie_details.imdbRating) || 0,
      userRating: Number(rating),
      runtime: Number(movie_details.Runtime?.split(" ").at(0)) || 0,
    };
    handleWatched(newWatchedMovie);
  }

  const textStyle= {
    lineHeight: "1",
    margin: '0',
    color:"yellow",
    fontSize:`${28 / 1.5}px`
  }

  return(
    <div>
      <button className="btn-back" onClick={onClose} >🔙</button>
      <img style={{ width: "20rem", height: "30rem" }} src={movie_details.Poster} alt="Movie Poster" />
      <p>{movie_details.Actors}</p>
      <p>{movie_details.BoxOffice}</p>
      <p>{movie_details.Genre}</p>
      <p>{movie_details.Title}</p>

      <div className="rating">
        {!isWatched ? (
          <>
            <div style={starContainerStyle} >
                {Array.from({length:10},(_,i)=>(
                  <Star key={i} size={2} onRate = {() => handleRating(i)} color={'yellow'} full={hoverRating ? hoverRating >= i +1:rating >= i+1} onMouseEnter={() => setHoverRating(i+1)}  onMouseLeave ={() => setHoverRating(0)}/>
                ))}
                <p style={textStyle} >
                  {hoverRating ? hoverRating : rating }
                </p>
            </div>

            {rating > 0 && (
                <button className="btn-add" onClick={handleAdd}  > + Add list</button>
            )  }
          </>
        ) : (
          <p>You rated with movie {watchedUserRating} ⭐</p>
        )}
      </div>

      <p >{movie_details.Plot}</p>
      {  console.log(Number(rating))}
    </div>
  )
}


function Star({size, full , onRate, onMouseEnter , onMouseLeave}){
      const starStyle = {
        width:`${size}rem`,
        height:`${size}px`,
        display:'block',
        cursor:'pointer',
    }
    const svgStyle={
        color :'yellow'
    }
  return(
    <span style={starStyle} onClick={onRate} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} > 
                {/* <svg  style={svgStyle}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={"yellow"}
                stroke={"yellow"}
                >
                <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
                </svg>  */}
       
                {full ?
                    <svg  style={svgStyle}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill={"yellow"}
                      stroke={"yellow"}
                    >
                <path
                    d = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
                </svg>
                :
                <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={"yellow"}
                          >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d = "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                </svg>

                

             }
                
    </span>
  )
}


// {Title: 'Thor: Ragnarok', Year: '2017', Rated: 'PG-13', Released: '03 Nov 2017', Runtime: '130 min', …}
// Actors
// : 
// "Chris Hemsworth, Tom Hiddleston, Cate Blanchett"
// Awards
// : 
// "6 wins & 50 nominations total"
// BoxOffice
// : 
// "$315,058,289"
// Country
// : 
// "United States"
// DVD
// : 
// "N/A"
// Director
// : 
// "Taika Waititi"
// Genre
// : 
// "Action, Adventure, Comedy"
// Language
// : 
// "English"
// Metascore
// : 
// "74"
// Plot
// : 
// "Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela."
// Poster
// : 
// "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_QL75_UX380_CR0,0,380,562_.jpg"
// Production
// : 
// "N/A"
// Rated
// : 
// "PG-13"
// Ratings
// : 
// (3) [{…}, {…}, {…}]
// Released
// : 
// "03 Nov 2017"
// Response
// : 
// "True"
// Runtime
// : 
// "130 min"
// Title
// : 
// "Thor: Ragnarok"
// Type
// : 
// "movie"
// Website
// : 
// "N/A"
// Writer
// : 
// "Eric Pearson, Craig Kyle, Christopher Yost"
// Year
// : 
// "2017"
// imdbID
// : 
// "tt3501632"
// imdbRating
// : 
// "7.9"
// imdbVotes
// : 
// "892,533"

function WatchedSummary( {avgImdbRating , avgUserRating ,avgRuntime,watched} ){
  return(
      <div className="summary">
          <h2>Movies you watched</h2>
              <div>
                  <p>
                      <span>#️⃣</span>
                      <span>{watched.length} movies</span>
                      </p>
                      <p>
                          <span>⭐️</span>
                          <span>{avgImdbRating}</span>
                      </p>
                      <p>
                          <span>🌟</span>
                          <span>{avgUserRating}</span>
                      </p>
                      <p>
                          <span>⏳</span>
                          <span>{avgRuntime} min</span>
                      </p>
                </div>
      </div>
  )

}


