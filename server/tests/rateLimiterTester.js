import axios from 'axios';

const BASE_URL = 'http://localhost:5000/auth';
const AUTH_TOKEN = 'your-token-here';

async function testRateLimit() {
  const config = {
    headers: {
      'Authorization': `Bearer ${AUTH_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  const productData = {
    productId: '68e2d71efc85392079d4d590'
  };

  console.log('🧪 Testing rate limiter...\n');

  for (let i = 1; i <= 12; i++) {
    try {
      console.log(`📤 Request ${i}...`);
      const response = await axios.post(`${BASE_URL}/buy`, productData, config);
      
      console.log(`✅ Request ${i} successful:`, {
        status: response.status,
        success: response.data.success,
        hasSessionId: Boolean(response.data.id)
      });
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      if (error.response) {
        console.log(`❌ Request ${i} failed:`, {
          status: error.response.status,
          message: error.response.data?.message,
          success: error.response.data?.success
        });
        
        if (error.response.status === 429) {
          console.log('🎯 RATE LIMIT TRIGGERED!');
          break;
        }
      } else {
        console.log(`💥 Request ${i} error:`, error.message);
      }
    }
  }
}

testRateLimit();