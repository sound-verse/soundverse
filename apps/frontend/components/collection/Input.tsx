const Input = (props) => {
  const { id, placeholder = '', label = '', type = 'text', error = '', required = false, ...rest } = props;
  return (
    <div>
      
      <input type={type} id={id} className={`w-64 px-4 py-3 text-primary outline-none text-base rounded-md border leading-5`} placeholder={placeholder} {...rest} />
      
      {error && <p className='text-xs pl-2 text-red mb-4'>{error}</p>}

      <style jsx>{`
        input {
          background: #272727;
          border: 1px solid #FFFFFF;
          box-sizing: border-box;
          border-radius: 60px;
        }
        input::placeholder {
          color: #EDE7F6;
          font-weight: 300;
          opacity: 0.4;
        }
      `}</style>
    </div>
  );
};

export default Input;