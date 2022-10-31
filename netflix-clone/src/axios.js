import axios from "axios";

/** add function that creates base url to make request to the movie database */
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});


  //helps appends the instance of movie or site
  //instance.get('/foo-bar');

/** see outcome of the following:
   * https://api.themoviedb.org/3/foo-bar
   */

export default instance;