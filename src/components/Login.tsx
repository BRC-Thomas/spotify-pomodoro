
function Login() {
const spotify_redirect_uri = "http://localhost:3000/auth/callback";

  return (
    <div className="App">
      <header className="App-header">
        <a className="btn-spotify" href={spotify_redirect_uri}>
          Login with Spotify
        </a>
      </header>
    </div>
  );
}

export default Login;
