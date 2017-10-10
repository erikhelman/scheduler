import React from 'react';
import axios from 'axios';

class StudentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userdata: {}
    };

  }

  componentDidMount() {

    axios.get('/students')
    .then(response => {
      this.setState ({userdata:response.data})
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return (
      <div>
        {console.log(this.state.userdata)}
        {console.log(this.state.userdata.length)}
      </div>

    );
  }
}

export default StudentPage;
