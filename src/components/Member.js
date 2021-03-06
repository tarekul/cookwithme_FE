import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/auth';
import '../components/member.css';

class Member extends Component {
  render(){
  return (<>
      <AuthContext.Consumer>
        {
          (user) => {
            if (user) {
              return (
                <>
              <Link to='/userprofile'>
                  <button className="btn-floating btn-large waves-light red memberStyle"><i className="material-icons">person</i></button>
                  </Link>
                  <Link to='/logout'> <button className="btn-floating btn-large waves-light red exitStyle"><i className="material-icons">exit_to_app</i></button></Link>
                </>
              )
            } else {
              return (<>
              <Link to='/login'>
                <button style={{position:'fixed',right: '2vw', top:'2vh', zIndex:'101'}} className="btn-floating btn-large waves-light red"><i className="material-icons">person</i></button>
                </Link>
              </>)
            }
          }
        }
      </AuthContext.Consumer>
    </>)
}

}


export default Member
