import './Form.css';

export default function Form({ onSubmit }) {


  return (
    <div>
      <h1 className="headline">Ask AI Anything!</h1>
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
