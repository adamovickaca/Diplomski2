import Blog from "../models/Blog.js";
import mongoose from "mongoose";

export const vratiBlogove = async (req, res) => {
  try {
    const tag = req.query.tag; // Očekuje se da se kategorija šalje kao upit
    const blogs = tag ? await Blog.find({ tag }) : await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dodajBlog = async (req, res) => {
  const { naslov, tekst, tag, slika, kratakOpis } = req.body;
  const blog = new Blog({
    naslov,
    tekst,
    slika,
    tag,
    kratakOpis,
  });
  try {
    const sacuvanBlog = await blog.save();
    res.status(201).json(sacuvanBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const azurirajBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog !== null) {
      await blog.updateOne({ $set: req.body });
      return res.status(200).json(blog);
    } else {
      return res.status(404).json("Blog nije pronadjen");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const obrisiBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog je obrisan!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//vracanje tagova
export const getTags = async (req, res) => {
  try {
    const tags = await Blog.distinct("tag"); 
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
