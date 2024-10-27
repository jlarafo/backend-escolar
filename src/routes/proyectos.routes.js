import { Router } from "express";
import {
  createProyecto,
  deleteProyectos,
  getProyecto,
  getProyectos,
  updateProyecto,
} from "../controllers/proyectos.controller.js";

const router = Router();

// GET all Proyectos
router.get("/proyectos", getProyectos);

// GET An Proyectos
router.get("/proyectos/:id", getProyecto);

// DELETE An Proyectos
router.delete("/proyectos/:id", deleteProyectos);

// INSERT An Proyectos
router.post("/proyectos", createProyecto);

router.patch("/proyectos/:id", updateProyecto);

export default router;
