import React ,{useEffect} from 'react'
import Aos from "aos";
import "aos/dist/aos.css";

function Homecard(props) {
     useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
      <div data-aos={props.animate} className={props.class}>
        <p>{props.body}</p>
      </div>
  )
}

export default Homecard