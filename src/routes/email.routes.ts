import { Router } from "express";
import axios from "axios";
import { services } from "../config/api.services";

const router = Router();

router.post("/email", async (req, res) => {
  try {
    const response = await axios.post(`${services.email}/email`, req.body);
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Erro no Email Service" });
  }
});

export default router;
