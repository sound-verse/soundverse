const Button = (props) => {
  const { type, title, onClick } = props;
  return (
    <div>
      {
        type === 'purple-bg' ?
          <button className="createBtn w-20 h-8 text-white text-xs font-bold rounded-xl" onClick={onClick}>{title}</button>
        :
        type === 'white-border' ?
          <button className="hover:bg-purple-700 w-32 h-8 text-white text-xs font-bold border border-white rounded-xl" onClick={onClick}>{title}</button>
        :
        type === 'purple-txt' ?
          <button className="purpleTxt w-32 h-10 text-lg font-bold rounded-xl" onClick={onClick}>{title}</button>
        : <div></div>
      }
      <style jsx>{`
        .createBtn {
          background: #6200EA;
        }
        .purpleTxt {
          background: #D1C4E9;
          border: 6px solid #7C4DFF;
          box-sizing: border-box;
          color: #7C4DFF;
        }
      `}</style>
    </div>
  );
};

export default Button;