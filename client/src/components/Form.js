import './Form.css';

export default function Form({ onSubmit, setMessage }) {
// console.log(user.username)


  return (
    <div>

      {/* Beginning of text entering */}
      <form onSubmit={onSubmit} className='form'>
        <label>
          <input type="text" onChange={(e) => setMessage(e.target.value)} name="message" className='input'/>
        </label>
        <button type="submit" className='submit-btn'>Send</button>
      </form>
      {/* End of text entering */}
    </div>
  );
}
