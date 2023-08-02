import Wrapper from "../assets/wrappers/Landing";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Code <span>Judge</span>
          </h1>
          <p>
            welcome to the code judge
          </p>
          <Link to="/register" className="btn register-link">
            register
          </Link>
          <Link to="/login" className="btn ">
            login / Demo User
          </Link>
        </div>
        
      </div>
    </Wrapper>
  );
};

export default Landing;
