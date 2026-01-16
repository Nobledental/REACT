// services/geminiService.ts

// Existing blog filter
export const filterBlogsWithAi = async (query: string, blogs: any[]): Promise<number[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const lowerQuery = query.toLowerCase();
  return blogs
    .map((blog, index) => {
      const text = `${blog.title} ${blog.desc} ${blog.cat}`.toLowerCase();
      return text.includes(lowerQuery) ? index : -1;
    })
    .filter(index => index !== -1);
};

// NEW: Chat Assistant Logic
export const sendMessageToAssistant = async (message: string, history: any[]) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simple keyword matching for demo purposes
  // In production, replace this with your actual Gemini API call
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
    return {
      text: "Our pricing is transparent. Consultations start at ₹500. For specific treatments like Implants or Braces, we offer detailed treatment plans after a 3D scan. Would you like to see our price list?",
      sources: [{ title: 'Pricing Policy', uri: '/pricing' }]
    };
  }

  if (lowerMsg.includes('book') || lowerMsg.includes('appointment')) {
    return {
      text: "I can help you book a slot! You can use the 'Book Now' button at the top right, or tell me your preferred date and time here.",
      sources: []
    };
  }

  return {
    text: "Thank you for reaching out to Noble Dental AI. I can help you with treatment details, booking appointments, or understanding our clinical protocols. What specific information do you need?",
    sources: [{ title: 'Clinical Protocols', uri: '/protocols' }]
  };
};
