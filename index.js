const express = require('express');
const Jimp = require('jimp');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

app.get('/', (req, res) => {
  console.log('res => ', );
  res.status(200).json({
    status: 'ok'
  })
})

app.post('/crop-image', upload.single('image'), async (req, res) => {
  try {
    const { x, y, width, height } = req.body; // Get cropping coordinates from request body
    console.log('req.body => ', req.body);

    const image = await Jimp.read(req.body.image);

    // Perform cropping based on received coordinates
    const croppedImage = await image.crop(x, y, width, height);

    // Set appropriate content type for image response
    res.contentType('image/jpeg');

    // Get cropped image buffer data
    const buffer = await croppedImage.getBufferAsync(Jimp.MIME_JPEG);

    // Send the cropped image buffer as response
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error cropping image' });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));