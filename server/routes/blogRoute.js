import express, { Router } from "express";
import {
    vratiBlogove,
    dodajBlog,
    azurirajBlog,
    obrisiBlog,
    getTags,
    vratiSveBlogove

} from "../controllers/blogController.js";

const router = express.Router();

router.get('/', vratiBlogove);

router.post('/', dodajBlog);

router.put('/:id', azurirajBlog);

router.delete('/:id', obrisiBlog);

router.get("/tags", getTags);

router.get('/blogovi', vratiSveBlogove);


export default router;
