export const normalizeBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    const fieldsToNormalize = [
      'type',
      'brand',
      'screenType',
      'screenDiagonal',
      'batteryCapacity',
      'builtInMemory',
      'protectionClass',
      'cpu'
    ];

    fieldsToNormalize.forEach(field => {
      if (req.body[field] && typeof req.body[field] === 'string') {
        req.body[field] = req.body[field].toLowerCase().trim();
      }
    });
  }
  next();
};