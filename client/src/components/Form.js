import './Form.css';

export default function Form({ onSubmit }) {
// console.log(user.username)


  return (
    <div>

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
