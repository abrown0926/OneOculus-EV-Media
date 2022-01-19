import React from "react";
import { Link } from "react-router-dom";
import { Image, Header, Button, Icon } from "semantic-ui-react";
// import Logo from "assets/images/OneOculusLogo.jpeg"

const LandingPage = () => {
  return (
    <div className="Landing">
      <Image
        src={process.env.PUBLIC_URL + "/assets/images/OneOculusLogo.jpeg"}
        size="large"
      />
      <Link to="/register">
        <Button>
          Get Started
          <Icon name="right arrow" />
        </Button>
      </Link>
    </div>
  );
};

export default LandingPage;
