import crypto from 'crypto';

export const encryptData  = (data: string, secretKey: string) => {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(secretKey).digest('base64').substr(0, 32);
    const iv = crypto.randomBytes(16);
  
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedToken = cipher.update(data, 'utf8', 'hex');
    encryptedToken += cipher.final('hex');
  
    const encryptedData = iv.toString('hex') + encryptedToken;
    return encryptedData;
  };

export const decryptData = (data: string, secretKey: string) => {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(secretKey).digest('base64').substr(0, 32);
    const iv = Buffer.from(data.slice(0, 32), 'hex');
    const encryptedToken = data.slice(32);
  
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decryptedToken = decipher.update(encryptedToken, 'hex', 'utf8');
    decryptedToken += decipher.final('utf8');
  
    return decryptedToken;
  };


