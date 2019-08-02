import React, { Component } from 'react';
import axios from 'axios'
export default class Create extends Component {
  constructor(props) {
      super(props);
      this.onChangeWorkerName = this.onChangeWorkerName.bind(this);
      this.onChangeAge = this.onChangeAge.bind(this);
      this.onChangeTime = this.onChangeTime.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          WorkerName: '',
          Age: '',
          Time:''
      }
  }
  onChangeWorkerName(e) {
    this.setState({
      WorkerName: e.target.value
    });
  }
  onChangeAge(e) {
    this.setState({
      Age: e.target.value
    })  
  }
  onChangeTime(e) {
    this.setState({
      Time: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
        WorkerName: this.state.WorkerName,
        Age: this.state.Age,
        Time: this.Time
      };
      axios.post('http://localhost:4000/API/add', obj)
          .then(res => console.log(res.data));
    console.log(`The values are ${this.state.WorkerName}, ${this.state.Age}, and ${this.state.Time}`)
    this.setState({
      WorkerName: '',
      Age: '',
        Time: ''
    })
  }
 
  render() {
      return (
          <div >
              
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Person Name:  </label>
                      <input 
                        type="text" 
                        
                        value={this.state.WorkerName}
                        onChange={this.onChangeWorkerName}
                        />
                  </div>
                  <div className="form-group">
                      <label> Your Age </label>
                      <input type="text" 
                      
                        value={this.state.Age}
                        onChange={this.onChangeAge}
                        />
                  </div>
                  <div className="form-group">
                      <label>Years Worked</label>
                      <input type="text" 
                        
                        value={this.state.Time}
                        onChange={this.onChangeTime}
                        />
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Register Worker" />
                  </div>
              </form>
          </div>
      )
  }
}