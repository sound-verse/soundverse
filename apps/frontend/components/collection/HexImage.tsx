
const HexImage = (props) =>{
    const {src} = props

    return (
        <div>
        <div className="hex">
              <div className = "hex-background">
              <img  className="w-full z-20" src = {src} />
              </div>
            </div>

            <style jsx>{`
          .hex {
            display: block;
            margin: 0 auto;
            position: relative;
            width: 15rem;
            height: 12.99rem; /* width * 0.866 */
            background-color: rgba(139, 92, 246);
            box-sizing: border-box;
            -webkit-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
            -moz-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
          }
          
          .hex-background {
            position: absolute;
            background-color: rgba(139, 92, 246); /*color of the main-background*/
            top: .25rem; /* equal to border thickness */
            left: .25rem; /* equal to border thickness */
            width: 14.5rem; /* container width - (border thickness * 2) */
            height: 12.49rem; /* container height - (border thickness * 2) */
            -webkit-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
            -moz-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
          }
          .hex img {
            position: absolute;
            width: 100%; 
            height: 100%; 
            object-fit: cover;
            -webkit-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
            -moz-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
          }
        `}
        </style>
        </div>
        
    )
}


export default HexImage