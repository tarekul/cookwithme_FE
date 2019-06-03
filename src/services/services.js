import axios from 'axios'; 

const recipebaseURL = 'http://localhost:5001/recipes'
const checkRecipe = async(url) => {
 return(await(axios({
   method:'post',
   baseURL: `${recipebaseURL}/check`,
   data: {url}
 })
   .then((res)=>{
     return res.data;
   })));
}

const postRecipes = (users_id=null, title, source_img, source_url=null, ingredients, steps) => {
  return (axios({
    method:'post',
    baseURL: `${recipebaseURL}/`,
    data:{users_id, title, source_img, source_url, ingredients, steps}
  })
  .then((res)=>{
    return res.data
  }));
}

const getFood2Fork = async(query) => {
    return(await(axios({
      method:'get',
      // baseURL: 'https://www.food2fork.com/api/search?key=0a689ee4c676e04aaae774935df0e3d8',
        // baseURL: 'https://www.food2fork.com/api/search?key=ee476d8f542bef2e97d8bf30c7f3c0ca',
      q: query
    })
      .then((res)=>{
        return res.data;
      })));
}

const defaultRecipes = () =>{
  let recipes_arr = null
  return axios.get('https://www.food2fork.com/api/search?key=bd42ab00b645843de7def161f30525fa')
        .then(res=>{
            console.log(res.data)
            recipes_arr = res.data.recipes.filter(e=>{
                return e.publisher ==='Closet Cooking' || e.publisher === "The Pioneer Woman" || e.publisher === 'All Recipes'
            })
            return axios.get('https://www.food2fork.com/api/search?key=bd42ab00b645843de7def161f30525fa')
            })
        .then(resp=>{
          recipes_arr.concat(resp.data.recipes.filter(e=>{
            return e.publisher ==='Closet Cooking' || e.publisher === "The Pioneer Woman" || e.publisher === 'All Recipes'
          }))
          return recipes_arr.slice(0,16)
        })
            
        }
   
   

export {postRecipes ,checkRecipe,getFood2Fork,defaultRecipes}