const ToggleSwitch = () => {
  return (
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
      <style jsx>{`
        /* The switch - the box around the slider */
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        /* Hide default HTML checkbox */
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        /* The slider */
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: '';
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: #808080;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: white;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px white;
        }

        input:checked + .slider:before {
          background-color: #7c4dff;
          -webkit-transform: translateX(26px);
          -ms-transform: translateX(26px);
          transform: translateX(26px);
        }

        /* Rounded sliders */
        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </div>
  )
}

export default ToggleSwitch
