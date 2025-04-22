import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Routing from "./Navigation/Routing";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container className="py-3">
          <Routing />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
