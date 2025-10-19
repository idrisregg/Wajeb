const fs = require('fs');
const path = require('path');
const { config } = require('../config/storage');

class StorageService {
  constructor() {
    this.storageType = config.production.type;
    this.basePath = config.production.path;
  }

  // Local Storage Methods
  async saveFileLocal(fileBuffer, fileName) {
    const filePath = path.join(this.basePath, fileName);
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    await fs.promises.writeFile(filePath, fileBuffer);
    return filePath;
  }

  async deleteFileLocal(filePath) {
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      return true;
    }
    return false;
  }

  async getFileLocal(filePath) {
    if (fs.existsSync(filePath)) {
      return fs.createReadStream(filePath);
    }
    throw new Error('File not found');
  }

  // Cloud Storage Methods (AWS S3 Example)
  async saveFileS3(fileBuffer, fileName) {
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: fileBuffer,
      ACL: 'private'
    };

    const result = await s3.upload(params).promise();
    return result.Location;
  }

  async deleteFileS3(fileName) {
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName
    };

    await s3.deleteObject(params).promise();
    return true;
  }

  async getFileS3(fileName) {
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName
    };

    const result = await s3.getObject(params).promise();
    return result.Body;
  }

  // Generic Methods
  async saveFile(fileBuffer, fileName) {
    switch (this.storageType) {
      case 'local':
        return await this.saveFileLocal(fileBuffer, fileName);
      case 's3':
        return await this.saveFileS3(fileBuffer, fileName);
      default:
        throw new Error(`Unsupported storage type: ${this.storageType}`);
    }
  }

  async deleteFile(filePath) {
    switch (this.storageType) {
      case 'local':
        return await this.deleteFileLocal(filePath);
      case 's3':
        return await this.deleteFileS3(filePath);
      default:
        throw new Error(`Unsupported storage type: ${this.storageType}`);
    }
  }

  async getFile(filePath) {
    switch (this.storageType) {
      case 'local':
        return await this.getFileLocal(filePath);
      case 's3':
        return await this.getFileS3(filePath);
      default:
        throw new Error(`Unsupported storage type: ${this.storageType}`);
    }
  }
}

module.exports = new StorageService();

