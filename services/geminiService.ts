// services/geminiService.ts

export const filterBlogsWithAi = async (query: string, blogs: any[]): Promise<number[]> => {
  // Simulate AI latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lowerQuery = query.toLowerCase();
  
  // Return indices of matching blogs
  return blogs
    .map((blog, index) => {
      const text = `${blog.title} ${blog.desc} ${blog.cat}`.toLowerCase();
      return text.includes(lowerQuery) ? index : -1;
    })
    .filter(index => index !== -1);
};
