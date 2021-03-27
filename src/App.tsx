import { Layout, Row, Col, Typography } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Pokemons } from "./components/Pokemons/Pokemons";
import { Pokemon } from "./components/Pokemon/Pokemon";

import "./App.scss";

const { Header } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/chesstery-test/404" exact>
            <Title>Page Not Found</Title>
          </Route>
          <Route>
            <Header className="header">
              <Title id="brand" level={2}>
                TEST ASSIGNMENT 
              </Title>
            </Header>
            <Row gutter={16} justify="center" className="main">
              <Col span={22}>
                <Switch>
                  <Route exact path="/chesstery-test/">
                    <Redirect to="/chesstery-test/pokemons" />
                  </Route>
                  <Route path="/chesstery-test/pokemons/:id">
                    <Pokemon />
                  </Route>
                  <Route exact path="/chesstery-test/pokemons">
                    <Pokemons />
                  </Route>
                  <Route>
                    <Redirect to="/chesstery-test/404" />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
