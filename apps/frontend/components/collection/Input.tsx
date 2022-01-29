const Input = (props) => {
  const {
    id,
    placeholder = '',
    label = '',
    type = 'text',
    error = '',
    required = false,
    ...rest
  } = props
  return (
    <div>
      <input
        type={type}
        id={id}
        className={'outline-none rounded-md text-base leading-5'}
        placeholder={placeholder}
        {...rest}
      />

      {error && <p className="text-base text-red">{error}</p>}

      <style jsx>{`
        input {
          background: #272727;
          color: #ede7f6;
        }
        input::placeholder {
          font-weight: 300;
          opacity: 0.4;
        }
      `}</style>
    </div>
  )
}

export default Input
