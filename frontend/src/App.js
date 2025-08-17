import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Routing from "./Navigation/Routing";
import { Container } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer autoClose={2000} />
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
