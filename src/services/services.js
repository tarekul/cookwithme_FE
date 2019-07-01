import axios from 'axios';
// const recipebaseURL = 'https://cookwithme.herokuapp.com/recipes'
// const usersbaseURL = 'https://cookwithme.herokuapp.com/users'
const usersbaseURL = 'https://cookwithme.herokuapp.com/users'
const recipebaseURL = 'https://cookwithme.herokuapp.com/recipes' 
const checkRecipe = async (url) => {
  return (await (axios({
    method: 'post',
    baseURL: `${recipebaseURL}/check`,
    data: { url }
  })
    .then((res) => {
      return res.data;
    })));
}
const findRecipe = async (title) => {
  return (await (axios({
    method: 'post',
    baseURL: `${recipebaseURL}/find`,
    data: { title }
  })
    .then((res) => {
      return res.data;
    })));
}

const postRecipes = (users_id = null, title, source_img, source_url = null, publisher_url = null, ingredients, steps) => {
  return (axios({
    method: 'post',
    baseURL: `${recipebaseURL}/`,
    data: { users_id, title, source_img, source_url, publisher_url, ingredients, steps }
  })
    .then((res) => {
      return res.data
    }));
}

const getUser = async(email) =>{
  return await(axios({
    method: 'get',
    baseURL: `${usersbaseURL}/${email}`
  }))
  .then((res)=>{
    return res.data
  })
}

const getFood2Fork = async(query) => {
  let recipes_arr = null
    return(await(axios({
      method:'get',
        //baseURL: `https://www.food2fork.com/api/search?key=0a689ee4c676e04aaae774935df0e3d8&q=${query}`,
        // baseURL: `https://www.food2fork.com/api/search?key=ee476d8f542bef2e97d8bf30c7f3c0ca&q=${query}`,
// baseURL: `https://www.food2fork.com/api/search?key=9e56004d7a3bc861088111ea75a9a429&q=${query}`
        // baseURL: `https://www.food2fork.com/api/search?key=a8839d03739298aec777e6819a1184c8&q=${query}`,
        baseURL: `https://www.food2fork.com/api/search?key=0a689ee4c676e04aaae774935df0e3d8&q=${query}`
    })
      .then( res =>{
        recipes_arr = res.data.recipes.filter(e=>{
          return e.publisher === "The Pioneer Woman" || e.publisher === 'All Recipes' || e.publisher === 'Food Network'
        })
        //recipes_arr.splice(2,1)
        //recipes_arr.splice(8,1)
        
        // 15 recipe obj in arr
        const arr = recipes_arr.slice(0,15)

        // find recipe obj that have subpar pic
        //const qualityArr = []
        // const subparArr = [] 
        // arr.forEach( e =>{
        //   //const img = new Image();
        //   //img.src = e.image_url
        //   subparArr.push(e)
        //   // img.onload = function(){
        //   //   console.log(this.width, this.height);

        //   //   if (this.width * this.height < 70000){
        //   //     console.log('here1')
        //   //     subparArr.push(e)
        //   //   } else {
        //   //     qualityArr.push(e)
        //   //   }
        //   // }
        // })

        // update subpar pic
        const promises = [];
        for(let recipe of arr){
          const promise = axios.get(`https://pixabay.com/api/?key=12794199-b15ba844ff6bf9d5d0013b05e&q=${recipe.title}&image_type=photo&pretty=true`)
          promises.push(promise);
        }

        return Promise.all(promises)
          .then(A =>{
            for(let i = 0; i < A.length; i++){
              const imgArr = A[i].data.hits;
              if(imgArr.length){
                if(imgArr.length > 1) arr[i].image_url = imgArr[1].largeImageURL;
                else arr[i].image_url = imgArr[0].largeImageURL;
              }
            }
          })
          .then( _ =>{
            return arr
          })
          .catch(err =>{
            console.log('get better image error! ', err);
          })
       
        // return same arr with 15 recipe obj
          

        // const new_arr = arr.map( e =>{
        //   const img = new Image()
        //   img.src = e.image_url  //recipe image 
        //   return img.onload = function(){
        //     console.log(this.width,this.height) //image height width
        //     if(parseInt(this.width) * parseInt(this.height) < 70000){ 
        //       return axios.get(`https://pixabay.com/api/?key=12794199-b15ba844ff6bf9d5d0013b05e&q=${e.title}&image_type=photo&pretty=true`)
        //       .then(res=>{
        //         console.log(res.data.hits.length)
        //         if(res.data.hits.length > 0){
        //           console.log(res.data.hits[0].largeImageURL)
        //           e.image_url = res.data.hits[0].largeImageURL
        //           console.log(e)
        //           return e
        //         } 
        //       })
        //     }
        //     return e
        //   }
        // })
        // console.log(new_arr)
        // return new_arr
      })));
}

const defaultRecipes = () => {
  let recipes_arr = null
  return axios.get('https://www.food2fork.com/api/search?key=a8839d03739298aec777e6819a1184c8&q=chicken')
  .then(res=>{
            recipes_arr = res.data.recipes.filter(e=>{
                return  e.publisher === "The Pioneer Woman" || e.publisher === 'All Recipes' || e.publisher === 'Food Network'
            })
            recipes_arr.splice(2,1)
            recipes_arr.splice(8,1)
            return recipes_arr.slice(0,15)
            
            })
}

const getIDfav = (users_id,recipe_id) =>{
  return axios.get(`https://cookwithme.herokuapp.com/favorites/${users_id}/favID/${recipe_id}`)
  .then(res=>res)
}

const postFav = (users_id,recipe_id) =>{
  return axios.post('https://cookwithme.herokuapp.com/favorites',{
          users_id:users_id,
          recipe_id:recipe_id
        })
        .then(res=>res.data)
}

const createUser = (email, token) => {
  return (axios({
    method: 'post',
    baseURL: `${usersbaseURL}/`,
    data: { email, token}
  }))
}
const updateUser = (user, recentlyViewed) => {
  return (axios({
    method: 'put',
    baseURL: `${usersbaseURL}/${user}`,
    data: { recentlyViewed }
  }))
}
const readRecent = async(id)=>{
  return await(axios({
    method: 'get',
    baseURL: `${usersbaseURL}/recent/${id}`
  }))
  .then((res)=>{
    return res.data
  })
}
const recentViewed = (user, id, title, source_img) =>{
  let recent = [];
  if (!localStorage.getItem('recentlyViewed')) {
    localStorage.setItem('recentlyViewed', JSON.stringify([]))
  }
  if(JSON.parse(localStorage.getItem('recentlyViewed'))!== []){
     recent = JSON.parse(localStorage.getItem('recentlyViewed'))
    recent.unshift({id: id, title:title, source_img: source_img})
    if(recent.length > 10){
      recent.pop();
    }
    localStorage.setItem('recentlyViewed', JSON.stringify(recent))
    let list = localStorage.getItem('recentlyViewed')
    updateUser(user, JSON.parse(list))
    }
}


export {postFav,getIDfav,getUser, findRecipe, postRecipes ,checkRecipe,getFood2Fork,defaultRecipes,createUser, recentViewed, readRecent}


