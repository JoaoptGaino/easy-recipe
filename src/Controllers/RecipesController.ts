import { Request, Response } from 'express';
import db from '../database/connections';


export default class RecipesController {
    async index(req: Request, res: Response) {
        const recipes = await db('recipes').select('*');

        if (recipes.length <= 0) {
            return res.status(404).json({ message: "Couldn't find anything" });
        }
        return res.status(200).json(recipes);
    }
    async create(req: Request, res: Response) {
        const { name, ingredients, howto } = req.body;
        const recipe = { name, ingredients, howto };
        const trx = await db.transaction();

        try {
            await trx('recipes').insert(recipe);
            await trx.commit();
            return res.status(201).send();
        } catch (err) {
            await trx.rollback();
            return res.status(400).json({
                message: "Internal error"
            });
        }
    }
    async search(req: Request, res: Response) {
        const filters = req.query;
        const name = filters.name as string;


        const filteredRecipe = await db('recipes').where('name', 'like', `%${name}%`).select('*');

        if (filteredRecipe.length > 0) {
            return res.status(200).json(filteredRecipe);
        }
        return res.status(404).json({
            message: "Couldn't find any recipe"
        });
    }
}