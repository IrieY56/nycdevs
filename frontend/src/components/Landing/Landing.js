import React, { Component } from 'react';
import classes from './Landing.css';
import axios from 'axios';

import SubmitButton from './SubmitButton/SubmitButton';

const styles = {
  color: 'var(--color-primary)',
  lineHeight: 1.4
}

const iconStyles = {
  fontSize: '5rem',
  color: 'white',
  backgroundColor: 'var(--color-primary)',
  width: '100px',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  marginBottom: '3rem',
  margin: '2rem 0 5rem 0'
}

class Landing extends Component {
  state = {
    zipcode: 10010,
  }

  changeZipCode = (e) => {
    this.setState( { zipcode: e.target.value } );
  }

  handleEnterSubmit = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      this.getApiData();
    }
  }

  handleClickSubmit = () => {
    this.getApiData();
  }

  getApiData = () => {
    axios.get(`https://data.cityofnewyork.us/resource/24t3-xqyv.json?zip=${this.state.zipcode}`)
      .then(response => {
        console.log(this.state.zipcode);
        const results = response.data.filter(data => data.type === "Free")
          .map(item => item.location_lat_long.coordinates);
        console.log(results);
        // console.log(this.props.history);
        this.props.history.push('/map');
      })
      .catch(error => {
        console.log(this.state.zipcode);
        console.log(error);
      })
  }

  render(){
    return (
      <React.Fragment>
      <section className={classes.Hero}>
        <div className="container">
          <div className={classes.Logo}>
            <span className={classes.Logo__text}>wifi<b style={styles}>.</b>pls</span>
          </div>
          <div className="row">
            <div className="col-md-6 mx-auto">
              <h1 className={classes.Hero__cta}>Fast <b style={styles}>free</b> and <b style={styles}>secure</b> wifi near you.</h1>
              <div className="input-group mb-3 input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your zipcode..."
                  style={{fontSize: '2rem'}}
                  onChange={this.changeZipCode}
                  onKeyPress={this.handleEnterSubmit}/>
                <div className="input-group-append">
                  <SubmitButton handleSubmitClick={this.handleClickSubmit}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={classes.About}>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h2>Fast, Free, and Secure.</h2>
              <p className={classes.Lead}>3.5 million+ people and counting have used LinkNYC, the world’s largest and fastest free municipal Wi-Fi network.</p>
            </div>
          </div>
        </div>
        <div className="container pt-5">
          <div className="row">
            <div className="col-lg-4">
              <i style={iconStyles} className="fas fa-wifi"></i>
              <h3>Broadband</h3>
              <p>OneNYC recognized the internet as a prerequisite for full participation in the city’s economic and civic life and established the goal of making sure every New Yorker has affordable, high-speed internet access by 2025.</p>
            </div>
            <div className="col-lg-4">
              <i style={iconStyles} className="fas fa-wifi"></i>
              <h3>Broadband</h3>
              <p>OneNYC recognized the internet as a prerequisite for full participation in the city’s economic and civic life and established the goal of making sure every New Yorker has affordable, high-speed internet access by 2025.</p>
            </div>
            <div className="col-lg-4">
              <i style={iconStyles} className="fas fa-wifi"></i>
              <h3>Broadband</h3>
              <p>OneNYC recognized the internet as a prerequisite for full participation in the city’s economic and civic life and established the goal of making sure every New Yorker has affordable, high-speed internet access by 2025.</p>
            </div>
          </div>
        </div>
      </section>
      </React.Fragment>
    );
  }
};

export default Landing;
