import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads/images',
    filename:(req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      return cb(new BadRequestException('Seuls les fichiers images sont autorisés'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};

export const multerOptions = {
  ...multerConfig,
  dest: './uploads/images',
};