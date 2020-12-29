import express from 'express';
import RecipesController from './Controllers/RecipesController';
const routes = express.Router();
const recipesController = new RecipesController();


routes.get('/',(req,res)=>{
    res.json({
        message:"Hello from route"
    });
});

routes.get('/recipes',recipesController.index);
routes.post('/recipes',recipesController.create);

routes.get('/recipes/filter',recipesController.search);



export default routes;
