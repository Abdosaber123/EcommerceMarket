import {v2 as cloudinary} from "cloudinary"
import { diskStorage } from "multer"
export const multerOption = {
    storage:diskStorage({})
}