import { pool } from "../db.js";
import https from "https"; // Cambiado de http a https para manejar URLs https

export const getProyectos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM proyectos");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM proyectos WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "proyecto not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteProyectos = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM proyectos WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "proyecto not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createProyecto = async (req, res) => {
  try {
    const {
      titulo,
      autor,
      fecha_presentacion,
      tutor,
      area_tematica,
      sub_area,
      palabras_clave,
      metodologia,
      poblacion,
      resultados,
      sugerencias,
      reconocimientos,
      notas,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO proyectos (titulo, autor , fecha_presentacion, tutor, area_tematica, sub_area, palabras_clave, metodologia, poblacion, resultados, sugerencias,reconocimientos,notas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        titulo,
        autor,
        fecha_presentacion,
        tutor,
        area_tematica,
        sub_area,
        palabras_clave,
        metodologia,
        poblacion,
        resultados,
        sugerencias,
        reconocimientos,
        notas,
      ]
    );

    res.status(201).json({
      id: result.insertId,
      titulo,
      autor,
      fecha_presentacion,
      tutor,
      area_tematica,
      sub_area,
      palabras_clave,
      metodologia,
      poblacion,
      resultados,
      sugerencias,
      reconocimientos,
      notas,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const updateProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titulo,
      autor,
      fecha_presentacion,
      tutor,
      area_tematica,
      sub_area,
      palabras_clave,
      metodologia,
      poblacion,
      resultados,
      sugerencias,
      reconocimientos,
      notas,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE proyectos SET titulo = IFNULL(?, titulo), autor = IFNULL(?, autor), fecha_presentacion = IFNULL(?, fecha_presentacion), tutor = IFNULL(?, tutor), area_tematica = IFNULL(?, area_tematica), sub_area = IFNULL(?, sub_area), palabras_clave = IFNULL(?, palabras_clave), metodologia = IFNULL(?, metodologia), poblacion = IFNULL(?, poblacion) , resultados = IFNULL(?, resultados), sugerencias = IFNULL(?, sugerencias), reconocimientos = IFNULL(?, reconocimientos), notas = IFNULL(?, notas) WHERE id = ?",
      [
        titulo,
      autor,
      fecha_presentacion,
      tutor,
      area_tematica,
      sub_area,
      palabras_clave,
      metodologia,
      poblacion,
      resultados,
      sugerencias,
      reconocimientos,
      notas,
      id
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Proy not found" });

    const [rows] = await pool.query("SELECT * FROM proyectos WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrongggg" });
  }
};
