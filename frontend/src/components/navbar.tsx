import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import './navber.css'; // Import your CSS file

const Home = () => <div>Home Page</div>;
const Controls = () => <div>Controls Page</div>;
const RemoteMonitering = () => <div>Remote Monitering Page</div>;
const PetData = () => <div>Pet Data Page</div>;
const About = () => <div>About Page</div>;

const Navbar = () => {
    return (
        <Router>
            <div className="navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/controls">Contols</Link></li>
                    <li><Link to="/remoteMonitering">Remote Monitering</Link></li>
                    <li><Link to="/petData">Pet Data</Link></li>
                    <li style={{ float: 'right' }}><Link to="/about">About</Link></li>
                </ul>

                <hr />

                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/controls" component={Controls} />
                    <Route path="/remoteMonitering" component={RemoteMonitering} />
                    <Route path="/petData" component={PetData} />
                    <Route path="/about" component={About} />
                </Switch>
            </div>
        </Router>
    );
};

export default Navbar;