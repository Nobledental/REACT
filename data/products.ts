export interface ProductData {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  bgImage: string; // Background for 3D effect
  titleImage: string; // Floating title text
  clinicPrice: number;
  mrp: number;
  saving: number;
  subText: string;
  badges: string[];
  tags: string[];
  indications: string[];
  usage: string[];
  pros?: string[];
  cons?: string[];
}

export const nobleProducts: ProductData[] = [
  {
    id: 'enafix',
    name: 'EnaFix Anti-Cavity Toothpaste',
    brand: 'Group Pharma',
    category: 'dental',
    image: 'https://images.unsplash.com/photo-1559586616-361e18714958?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=EnaFix',
    clinicPrice: 180,
    mrp: 210,
    saving: 30,
    subText: 'Remineralizing toothpaste with Calcium Sucrose Phosphate.',
    badges: ['Top Seller', 'Clinical Grade'],
    tags: ['cavity', 'paste', 'fluoride'],
    indications: ['Early Caries', 'White Spot Lesions', 'Hypersensitivity'],
    usage: ['Brush twice daily', 'Do not rinse immediately']
  },
  {
    id: 'shy-nm',
    name: 'SHY-NM Desensitizing Paste',
    brand: 'Group Pharma',
    category: 'preventive',
    image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=400',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=SHY-NM',
    clinicPrice: 150,
    mrp: 185,
    saving: 35,
    subText: 'Advanced nano-hydroxyapatite formula for instant relief.',
    badges: ['Instant Relief'],
    tags: ['sensitivity', 'pain', 'cold'],
    indications: ['Dentin Hypersensitivity', 'Post-Scaling Pain'],
    usage: ['Apply on sensitive area', 'Leave for 2 mins']
  },
  {
    id: 'rexidine',
    name: 'Rexidine M Mouthwash',
    brand: 'Group Pharma',
    category: 'dental',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=400',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=Rexidine',
    clinicPrice: 120,
    mrp: 145,
    saving: 25,
    subText: 'Chlorhexidine gluconate 0.2% for gum health.',
    badges: ['Gum Specialist'],
    tags: ['gums', 'bleeding', 'mouthwash'],
    indications: ['Gingivitis', 'Post-Surgery Care', 'Bad Breath'],
    usage: ['Rinse with 10ml', 'Twice daily for 2 weeks']
  }
];
