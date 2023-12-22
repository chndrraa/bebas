
const express = require('express');
const multer = require('multer');
const apiRoutes = require("./src/routes/api");
const app = express();
const http = require('http').Server(app);
const port = 5000;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const path = require('path');

app.use("/api", apiRoutes);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.post('/api/deteksi-objek', upload.single('image'), async (req, res) => {
  try {
    // Baca gambar dari buffer
    const imgBuffer = req.file.buffer;

    // // Deteksi objek menggunakan Google Cloud Vision API
    // const [result] = await visionClient.objectLocalization(imgBuffer);
    // const objects = result.localizedObjectAnnotations;

    // // Buat deskripsi berdasarkan objek yang terdeteksi
    // const descriptions = objects.map(obj => obj.name);

    // Kirim respons dengan teks deskripsi dan audio sintesis suara
    res.json({
      imgBuffer: req.file
      // descriptions: descriptions,
      // audio: response.audioContent.toString('base64'),
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

http.listen(port, () => console.log('listening on port ' + port));
