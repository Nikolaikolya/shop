const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const {
  v4: uuidv4
} = require('uuid');
const prismaClient = require('../helpers/prisma');

router.post('/:name', async (req, res) => {
  const {
    name
  } = req.params;
  const end = req.files.file.name.split('.')
  const fileEnd = end[end.length - 1]
  const fileName = `${uuidv4()}.${fileEnd}`;

  const pathImage = path.join(__dirname, `../public/${name}_photos/${fileName}`);
  await fs.writeFile(pathImage, req.files.file.data, async (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        success: false
      });
      return;
    }

    const image = await prismaClient.images.create({
      data: {
        name: fileName
      },
      select: {
        id: true
      }
    })

    if (image) {
      res.status(200).json({
        success: true,
        image
      })
    } else {
      res.status(400).json({
        success: false,
        message: "Не удалось загрузить фото."
      })
    }
  })
})

module.exports = router