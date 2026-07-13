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
  const [watched, setWatched] = useState(tempMovieData);
  const [isLoading , setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const [query, setQuery] = useState("Thor");
  const tempQuery = "interstellar";
  const [arrow , setArrow] = useState(true);
  const [click , setClicked] = useState(true);
  const [selectedMovieId , setSelectedMovieId] = useState('');
  const [movieDetails , setMovieDetails] = useState('');

  // const query = "qqqqqq";
  // when query mane search unrelated not matching type hbe  ... tokhon const query = "qqqqqq";



  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));



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

 

  function handleClick(id){
   
    
     
        setClicked((click) => selectedMovieId === id ? false : true );
        setSelectedMovieId(id);
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
          {click ?
              <>
                  <WatchedSummary avgImdbRating={avgImdbRating} avgUserRating={avgUserRating} avgRuntime={avgRuntime} watched={watched} />
                  <WatchedMovieList  watched={watched} click={click} />  
              </>
              :
              <>
              <MovieDetails movie_details={movieDetails} setClick={handleClick}   onClose={() => setSelectedMovieId(null)} />
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

function MovieList({movies,setClick}){

  return(
      <ul className="list">
              {movies?.map((movie) => (
                <Movie movie={movie} setClick = {setClick} key={movie.imdbID} />
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


function WatchedMovieList({watched , click}){


  return(
      <>
        {click ? (
             <div></div>
        ) : (
           <ul className="list">
                {watched.map((movie) => (
                  <WatchedMovie movie={movie}  key={movie.imdbID}/>
                ))}
              </ul>
        )}
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


function MovieDetails({movie_details , setClick , onClose}){
  return(
    <div>
      <button onClick={onClose} >🔙</button>
      <p>{movie_details.Actors}</p>
      <p>{movie_details.BoxOffice}</p>
      <p>{movie_details.Genre}</p>
      <p>{movie_details.Plot}</p>
      <p>{movie_details.Title}</p>
      <img src={movie_details.Poster} alt="Movie Poster" />
    </div>
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




































