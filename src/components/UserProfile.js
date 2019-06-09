import React, { Component } from 'react';
import Materialize from 'materialize-css/dist/js/materialize.min.js';
import '../components/UserProfile.css'
import AuthContext from '../contexts/auth';
import Axios from 'axios';

export default class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userObj: {},
      favorites: [],
      yourRecipes: [],
      recentlyViewed: [],
    }
  }

  componentDidMount = () => {
    // Scroll to top of page upon loading
    window.scrollTo(0, 0);

    // Carousel Initialization
    let elems = document.querySelectorAll('.carousel');
    Materialize.Carousel.init(elems, { duration: '200' });

    // Collapsible Initialization
    let elems2 = document.querySelectorAll('.collapsible');
    Materialize.Collapsible.init(elems2, { accordion: true });

    // Get user object from our DB
    // const {email} = this.state;


    // Get favorites by user
    Axios.get(`http://localhost:5001/favorites/users/3`)
      .then(res => {
        console.log('data is: ', res.data[0].recipe_id)
      })

    // Get User Created Reicipes

  }

  // GetFavorites = () => {
  //   // const users_id = 3;
  //   Axios.get(`http://localhost:5001/favorites/users/3`)
  //     .then(res => {
  //       console.log('data is: ', res.data)
  //     })
  // }

  ListFavorites = () => {
    const { favorites } = this.state;
    if (!favorites) return <></>
    return (
      <>
        {/* MOBILE APP */}
        <div className="show-on-small hide-on-med-and-up col s12 m3 card no-shadows card-container">
          <div className="card-image">
            <img src="http://baliindiancuisine.com/wp-content/uploads/2014/12/Indian-fast-food-recipes.jpg" alt='food pic' />
          </div>
          <div className="card-content" >
            <p>Recipe Name</p>
          </div>
        </div>
        {/* WEB APP */}
        <div className="show-on-large hide-on-small-only col s12 m3 card no-shadows card-container">
          <div className="card-image">
            <img src="http://baliindiancuisine.com/wp-content/uploads/2014/12/Indian-fast-food-recipes.jpg" alt='food pic' style={{ height: '180px', }} />
          </div>
          <div className="card-content" style={{ height: '75px', textAlign: 'center', background: 'whitesmoke' }}>
            <p>Recipe Name</p>
          </div>
        </div>
      </>
    )
  }

  ListYourRecipes = () => {
    const { yourRecipes } = this.state;
    if (!yourRecipes) return <></>
    return (
      <div className="col s12 m3 card no-shadows card-container">
        <div className="card-image">
          <img src="http://baliindiancuisine.com/wp-content/uploads/2014/12/Indian-fast-food-recipes.jpg" alt='food pic' style={{ height: '236.17px', }} />
        </div>
        <div className="card-content">
          <p>Recipe Name</p>
        </div>
      </div>
    )
  }




  render() {
    return (<>
      <AuthContext.Consumer>
        {
          user => {
            if (!user) {
              return (
                <div style={{height: '96vh'}}>
                  <img class='divElement' src='https://file.mockplus.com/image/2018/04/d938fa8c-09d3-4093-8145-7bb890cf8a76.gif' alt='loading' />);
                </div>
              )
            }
            else {
              console.log('user is: ', user)
              console.log('state is: ', this.state)
              return (
                <div className='background'>
                  {/* -------------------------- Styling for Mobile App ----------------------------*/}
                  <div className="show-on-small hide-on-med-and-up" style={{ backgroundColor: 'orange' }}>
                    <h3 style={{ marginTop: '0px', textAlign: 'center', paddingTop: '150px' }}>{`Welcome back, ${user.email}!`}</h3>
                    <ul className="collapsible" style={{ marginTop: '125px' }}>
                      <li>
                        <div className="collapsible-header">Favorites</div>
                        <div className="collapsible-body">
                          <div className="row userSlider" style={{ display: 'inline-flex', width: '100vw', overflow: 'scroll' }}>
                            {/* FAVORITES CARD */}
                            <this.ListFavorites />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="collapsible-header">Your Recipes</div>
                        <div className="collapsible-body">
                          <div className="row" style={{ display: 'inline-flex', width: '100vw', overflow: 'scroll' }}>
                            {/* YOUR RECIPES CARD */}
                            <this.ListYourRecipes />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="collapsible-header">Recently Viewed</div>
                        <div className="collapsible-body">
                          <div className="row userSlider" style={{ display: 'inline-flex', width: '100vw', overflow: 'scroll' }}>
                            {/* RECENTLY VIEWED CARD */}
                            <div className="col s6 card small card-container">
                              <div className="card-image">
                                <img src="http://baliindiancuisine.com/wp-content/uploads/2014/12/Indian-fast-food-recipes.jpg" alt='food pic' />

                              </div>
                              <div className="card-content">
                                <p>Quick blurb about this recipe, maybe.</p>
                              </div>
                              <div className="card-action">
                                <a href="/#">This is a link</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* -------------------------- Styling for Web App ----------------------------*/}
                  <div className="show-on-large hide-on-small-only">
                    <h1 style={{ marginTop: '0px', textAlign: 'center', paddingTop: '50px' }}>{`Welcome back, ${user.email}!`}</h1>
                    {/* FAVORTITES */}
                    <div className="row">
                      <div className="row userSlider" style={{ display: 'inline-flex', width: '80%', overflow: 'scroll' }}>
                        {/* FAVORITES CARDS */}
                        <div className="show-on-large hide-on-small-only col s12 m3 card no-shadows card-container">
                          <div className="card-content" style={{ height: '180px', textAlign: 'center', background: 'white', position: 'relative' }} >
                            <span style={{ color: 'red', fontSize: '30px', position: 'relative', top: '55px', }}>Your Favorites</span>
                          </div>
                        </div>
                        <this.ListFavorites />
                      </div>
                    </div>
                    {/* YOUR RECIPES  */}
                    <div className="row">
                      <div className="row" style={{ display: 'inline-flex', width: '80%', overflow: 'scroll' }}>
                        {/* YOUR REICPES CARD */}
                        <div className="show-on-large hide-on-small-only col s12 m3 card no-shadows card-container">
                          <div className="card-content" style={{ height: '180px', textAlign: 'center', background: 'white', position: 'relative' }} >
                            <span style={{ color: 'red', fontSize: '30px', position: 'relative', top: '20px', }}>Your Recipes</span>
                            <div className='createRecipe-container' style={{ position: 'relative', top: '50px' }}>
                              <a href='/#/create' className="waves-effect waves-light btn-large">Create New Recipe</a>
                            </div>
                          </div>
                        </div>
                        <this.ListYourRecipes />
                      </div>
                    </div>
                    {/* RECENTLY VIEWED CAROUSEL */}
                    <h5>Recently Viewed:</h5>
                    <div className="carousel">
                      <div className="carousel-item">
                        <div className="card sticky-action">
                          <div className="card-image ">
                            <img src="http://baliindiancuisine.com/wp-content/uploads/2014/12/Indian-fast-food-recipes.jpg?h=350" alt='food-pic' />
                            <span className="card-title">Recipe Name</span>
                          </div>
                          <div className="card-content">
                            <p>This is a content.</p>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="card">
                          <div className="card-image">
                            <img src="https://images.pexels.com/photos/160933/girl-rabbit-friendship-love-160933.jpeg?h=350&auto=compress&cs=tinysrgb" alt='food-pic' />
                            <span className="card-title">This is a Title</span>
                          </div>
                          <span className="card-content">This is a content</span>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="card">
                          <div className="card-image">
                            <img src="https://images.pexels.com/photos/160699/girl-dandelion-yellow-flowers-160699.jpeg?h=350&auto=compress&cs=tinysrgb" alt='food-pic' />
                            <span className="card-title">This is a Title</span>
                          </div>
                          <span className="card-content">This is a content</span>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="card">
                          <div className="card-image">
                            <img src="https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?h=350&auto=compress&cs=tinysrgb" alt='food-pic' />
                            <span className="card-title">This is a Title</span>
                          </div>
                          <span className="card-content">This is a content</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          }
        }
      </AuthContext.Consumer>
    </>
    )
  }
}