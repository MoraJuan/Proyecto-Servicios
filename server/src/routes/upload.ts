import express from 'express';
import path from 'path';
import fs from 'fs';
import upload from '../middleware/upload';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Servir archivos estáticos
router.use('/files', express.static(process.env.UPLOAD_DIR || 'uploads'));

// Subir múltiples imágenes
router.post('/images', authenticateToken, upload.array('images', 10), async (req: AuthRequest, res) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: 'No se enviaron archivos' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}/api/upload/files`;
    
    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      url: `${baseUrl}/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype
    }));

    res.json({
      message: 'Archivos subidos exitosamente',
      files: uploadedFiles
    });
  } catch (error) {
    console.error('Error al subir archivos:', error);
    res.status(500).json({ error: 'Error al subir archivos' });
  }
});

// Subir imagen de perfil
router.post('/profile-image', authenticateToken, upload.single('profileImage'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se envió archivo' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}/api/upload/files`;
    const imageUrl = `${baseUrl}/${req.file.filename}`;

    res.json({
      message: 'Imagen de perfil subida exitosamente',
      imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Error al subir imagen de perfil:', error);
    res.status(500).json({ error: 'Error al subir imagen' });
  }
});

// Eliminar archivo
router.delete('/files/:filename', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { filename } = req.params;
    const uploadDir = process.env.UPLOAD_DIR || 'uploads';
    const filePath = path.join(uploadDir, filename);

    // Verificar que el archivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Eliminar archivo
    fs.unlinkSync(filePath);

    res.json({ message: 'Archivo eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    res.status(500).json({ error: 'Error al eliminar archivo' });
  }
});

// Obtener información de archivo
router.get('/files/:filename/info', async (req, res) => {
  try {
    const { filename } = req.params;
    const uploadDir = process.env.UPLOAD_DIR || 'uploads';
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    const stats = fs.statSync(filePath);
    const baseUrl = `${req.protocol}://${req.get('host')}/api/upload/files`;

    res.json({
      filename,
      url: `${baseUrl}/${filename}`,
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime
    });
  } catch (error) {
    console.error('Error al obtener información del archivo:', error);
    res.status(500).json({ error: 'Error al obtener información del archivo' });
  }
});

// Middleware de manejo de errores de multer
router.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'El archivo es demasiado grande. Máximo 5MB.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Demasiados archivos. Máximo 10 archivos.' });
    }
  }
  
  if (err.message.includes('Solo se permiten')) {
    return res.status(400).json({ error: err.message });
  }

  next(err);
});

export default router;
