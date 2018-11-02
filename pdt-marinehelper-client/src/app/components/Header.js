import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

export const Header = props => {
  const Navigation = withRouter(({ history }) => (
    <Navbar.Collapse>
      <Nav>
        {/*harbours*/}
        <NavItem eventKey={1} onClick={() => history.push("/map?scenario=harbours")}>
          Harbours
        </NavItem>

        {/*dangers*/}
        <NavItem eventKey={2} onClick={() => history.push("/map?scenario=dangers")}>
          Dangers
        </NavItem>

        <NavItem eventKey={3} onClick={() => history.push("/map?scenario=coves")}>
          Coves
        </NavItem>
      </Nav>

      <Nav pullRight>
        <NavItem eventKey={2} onClick={() => history.push("/about")}>
          About
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  ));

  return (
    <header>
      <Navbar
        inverse
        collapseOnSelect={true}
        style={{ marginBottom: "0", borderRadius: "0" }}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/map">Marine helper</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navigation />
      </Navbar>
    </header>
  );
};
