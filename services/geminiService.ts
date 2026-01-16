// services/geminiService.ts

export const filterBlogsWithAi = async (query: string, blogs: any[]): Promise<number[]> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const lowerQuery = query.toLowerCase();
  
  return blogs
    .map((blog, index) => {
      // Simple keyword matching for demo
      const text = `${blog.title} ${blog.desc} ${blog.cat}`.toLowerCase();
      return text.includes(lowerQuery) ? index : -1;
    })
    .filter(index => index !== -1);
};

export const sendMessageToAssistant = async (message: string, history: any[]) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const lowerMsg = message.toLowerCase();

  // Mock AI Responses
  if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
    return {
      text: "Our consultation starts at ₹500. Detailed treatment costs (like for Implants or Braces) vary based on your specific biological needs. We can give you an exact quote after a quick scan.",
      sources: [{ title: 'Pricing Transparency', uri: '/pricing' }]
    };
  }

  if (lowerMsg.includes('book') || lowerMsg.includes('appointment')) {
    return {
      text: "I can help with that. You can use the 'Book Now' button at the top right, or call us directly at +91 861 042 5342 for priority slots.",
      sources: []
    };
  }

  return {
    text: "I am the Noble Dental AI. I can help you understand our clinical protocols, recovery times, or schedule a visit. What's on your mind?",
    sources: [{ title: 'Clinical Protocols', uri: '/treatments' }]
  };
};
