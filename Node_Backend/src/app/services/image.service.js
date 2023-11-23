const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");

class ImageService {
    constructor(client) {
        this.Image = client.db().collection("HinhHangHoa");

    }

    extractImageData(payload) {
        const image = {
            TenHinh: payload.TenHinh,
            MSHH: payload.MSHH
        };
        Object.keys(image).forEach(
            (key) => (image[key] === undefined && delete image[key])
        );
        return image;
    }

    async create(payload) {
        try {
            const image = this.extractImageData(payload); // Trích xuất dữ liệu sản phẩm từ payload
            console.log("image", image);
            const result = await this.Image.insertOne(image); // Thêm sản phẩm vào cơ sở dữ liệu
            return result; // Trả về sản phẩm đã được tạo
        } catch (error) {
            throw new Error("Đã xảy ra lỗi trong quá trình tạo hình ảnh");
        }
    }


    async findByMSHH(id) {
        try {
            // console.log("findByID", id);
            const images = await this.Image.findOne({ MSHH: id }); // Tìm kiếm các hình ảnh có MaHH giống với id
            // console.log("images", images.TenHinh)
            return images.TenHinh;
        } catch (error) {
            console.error('Error occurred while finding images:', error);
            throw error;
        }
    }

    async deleteByMSHH(id) {
        console.log("id", id);
        try {
            const result = await this.Image.findOneAndDelete({ MSHH: id });
            return result;
        } catch (error) {
            // Handle any errors that occur during the deletion process
            throw new Error(`Error deleting images by MSHH: ${error.message}`);
        }
    }

    async updateImage(id, image) {
        console.log("id", id);
        console.log("hinhanh", image);

        try {
            const filter = { MSHH: id }; // Replace with your filter criteria
            const update = { TenHinh: image };

            const result = await this.Image.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: "after" }
            );

            if (!result) {
                throw new Error('Failed to update the image record');
            }
            return result;

        } catch (error) {
            throw new Error(`Failed to update image: ${error.message}`);
        }


    }



}

module.exports = ImageService;

