import express, { Router } from "express";
import {
    vratiBlogove,
    dodajBlog,
    azurirajBlog,
    obrisiBlog,
    getTags

} from "../controllers/blogController.js";

const router = express.Router();

router.get('/', vratiBlogove);

router.post('/', dodajBlog);

router.put('/:id', azurirajBlog);

router.delete('/:id', obrisiBlog);

router.get("/tags", getTags);

export default router;
