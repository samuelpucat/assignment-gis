import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Header = props => {
  return (
    <header>
      <Navbar inverse collapseOnSelect={true} style={{marginBottom: "0", borderRadius: "0"}}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/map">Marine helper</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            {/*harbours*/}
            <NavItem eventKey={1}>
              <Link to="/harbours">Harbours</Link>
            </NavItem>

            {/*dangers*/}
            <NavItem eventKey={2}>
              <Link to="/dangers">Dangers</Link>
            </NavItem>

            <NavItem eventKey={3}>
              <Link to="/anchorages">Anchorages</Link>
            </NavItem>
          </Nav>

          <Nav pullRight>
            <NavItem eventKey={2}>
              <Link to="/about">{"About"}</Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
