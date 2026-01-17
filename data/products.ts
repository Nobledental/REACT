export interface ProductData {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  bgImage: string;
  titleImage: string;
  clinicPrice: number;
  mrp: number;
  saving: number;
  subText: string;
  badges: string[];
  tags: string[];
  indications: string[];
  usage: string[];
  // New Fields
  ingredients: string[];
  form: 'Paste' | 'Gel' | 'Liquid' | 'Tablet' | 'Kit';
  isPrescription: boolean;
  rating: number;
  reviews: number;
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
    tags: ['cavity', 'enamel', 'fluoride'],
    indications: ['Early Caries', 'White Spot Lesions', 'Hypersensitivity'],
    usage: ['Brush twice daily', 'Do not rinse immediately'],
    ingredients: ['Calcium Sucrose Phosphate', 'Sodium Monofluorophosphate'],
    form: 'Paste',
    isPrescription: false,
    rating: 4.8,
    reviews: 1240
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
    badges: ['Instant Relief', 'Bio-Active'],
    tags: ['sensitivity', 'pain', 'cold'],
    indications: ['Dentin Hypersensitivity', 'Post-Scaling Pain'],
    usage: ['Apply on sensitive area', 'Leave for 2 mins'],
    ingredients: ['Nano Hydroxyapatite', 'Potassium Nitrate'],
    form: 'Paste',
    isPrescription: false,
    rating: 4.9,
    reviews: 856
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
    badges: ['Gum Specialist', 'Rx Only'],
    tags: ['gums', 'bleeding', 'mouthwash'],
    indications: ['Gingivitis', 'Post-Surgery Care', 'Bad Breath'],
    usage: ['Rinse with 10ml', 'Twice daily for 2 weeks'],
    ingredients: ['Chlorhexidine Gluconate 0.2%', 'Mint Extracts'],
    form: 'Liquid',
    isPrescription: true,
    rating: 4.7,
    reviews: 2100
  },
  {
    id: 'ortho-kit',
    name: 'Complete Ortho Kit',
    brand: 'Group Pharma',
    category: 'ortho',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=400',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=OrthoKit',
    clinicPrice: 450,
    mrp: 600,
    saving: 150,
    subText: '7-in-1 essential maintenance kit for braces.',
    badges: ['Best Value', 'All-in-One'],
    tags: ['braces', 'cleaning', 'wax'],
    indications: ['Orthodontic Treatment', 'Bracket Cleaning'],
    usage: ['Use Interdental brush daily', 'Apply wax for ulcers'],
    ingredients: ['N/A'],
    form: 'Kit',
    isPrescription: false,
    rating: 4.6,
    reviews: 340
  },
  {
    id: 'calcium-d3',
    name: 'Vantage Calcium + D3',
    brand: 'Group Pharma',
    category: 'wellness',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=Calcium',
    clinicPrice: 280,
    mrp: 350,
    saving: 70,
    subText: 'High absorption formula for bone density.',
    badges: ['Sugar Free', 'Bone Health'],
    tags: ['bones', 'vitamins', 'supplement'],
    indications: ['Calcium Deficiency', 'Osteoporosis'],
    usage: ['1 Tablet daily after meals'],
    ingredients: ['Calcium Carbonate 500mg', 'Vitamin D3 250IU'],
    form: 'Tablet',
    isPrescription: false,
    rating: 4.9,
    reviews: 512
  }
];
