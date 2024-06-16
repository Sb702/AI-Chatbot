import './Form.css';

export default function Form({ onSubmit, setLoggedIn, user }) {
// console.log(user.username)
  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <div>
      <h1 className="headline">Ask AI Anything!</h1>
      {user && <h3>Welcome, {user.username}!</h3>}
      <button onClick={handleLogout}>Logout</button>
      {/* Beginning of text entering */}
      <form onSubmit={onSubmit} className='form'>
        <label>
          <input type="text" name="message" className='input'/>
        </label>
        <button type="submit" className='submit-btn'>Send</button>
      </form>
      {/* End of text entering */}
    </div>
  );
}
