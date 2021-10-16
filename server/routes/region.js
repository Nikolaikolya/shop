const prismaClient = require('../helpers/prisma');

const router = require('express').Router();

router.get('/regions', async (req, res) => {
  const regions = await prismaClient.regions.findMany();
  
  if (regions.length > 0) {
    res.status(200).json({ success: true, regions })
  } else {
    res.status(400).json({ success: false, message: "Неправильный запрос при получении списка регионов!" })
  }
});

router.get('/city/:id', async (req, res) => {
  const { id } = req.params
  const cities = await prismaClient.cities.findMany({
    where: {
      region_id: parseInt(id)
    },
    orderBy: {
      name: 'asc'
    }
  });
  
  if (cities.length > 0) {
    res.status(200).json({ success: true, cities })
  } else {
    res.status(400).json({ success: false, message: "Неправильный запрос при получении списка городов!" })
  }
});

module.exports = router