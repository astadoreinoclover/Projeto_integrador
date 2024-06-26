import { Report } from '../models/Report.js';
import { User } from '../models/User.js';
import { Item } from '../models/Item.js';

export const listReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      include: [
        { model: User, attributes: ['id', 'nome'] },
        { model: Item, attributes: ['id', 'titulo', 'volume'] }
      ]
    });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const addReport = async (req, res) => {
    const { texto, user_id, item_id } = req.body;

    try {
      const newReport = await Report.create({
        texto,
        status: 0,  // Predefinido como 0
        user_id,
        item_id
      });
      res.status(201).json(newReport);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const updateReportStatus = async (req, res) => {
    const { id, status } = req.body;

    try {
      const report = await Report.findByPk(id);

      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }

      report.status = status;
      await report.save();

      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export async function reportDelete(req, res) {
    const { id } = req.body;
    try {
      const report = await Report.destroy({
        where: { 
          id: id
        }
      });

      res.status(200).json(`usuario deletado: ${report}`);
    } catch (error) {
      res.status(400).send(error);
    }
}