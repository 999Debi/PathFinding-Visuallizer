import { FaArrowAltCircleRight } from "react-icons/fa";
import { SiTarget } from "react-icons/si";
import { GiBrickWall } from "react-icons/gi";
import   './Info.css';

 const Info = () => {
  return (
    <div className="box">
      <ul className="info">
        <li>
            <FaArrowAltCircleRight/>
            <h5>Start Node</h5>
        </li>
        <li>
            <SiTarget/>
            <h5>End Node</h5>
        </li>
        <li>
            <GiBrickWall/>
            <h5>Wall Node</h5>
        </li>
      </ul>
    </div>
  );
};

export default Info;
