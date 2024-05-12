import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { retrievePathHelloWorld } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";

function WelcomeComponent() {
  const { username } = useParams();

  const authContext = useAuth();

  const [message, setMessage] = useState(null);

  function callHelloWorldRestApi() {
    retrievePathHelloWorld("in28minutes", authContext.token)
      .then((response) => successfulResponse(response))
      .catch((error) => errorRespone(error))
      .finally(() => console.log("cleanup"));

    // retrieveHelloWorldBean()
    //   .then((response) => successfulResponse(response))
    //   .catch((error) => errorRespone(error))
    //   .finally(() => console.log("cleanup"));

    // axios
    //   .get("http://localhost:7878/hello-world")
    //   .then((response) => successfulResponse(response))
    //   .catch((error) => errorRespone(error))
    //   .finally(() => console.log("cleanup"));
  }

  function successfulResponse(response) {
    console.log(response);
    setMessage(response.data.message);
  }

  function errorRespone(error) {
    console.log(error);
  }

  return (
    <div>
      <h1>Welcome {username}</h1>
      <div>
        Manage your todos - <Link to="/todos">Go here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
          Call Hello World
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}

export default WelcomeComponent;
