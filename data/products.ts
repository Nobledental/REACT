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
  ingredients: string[];
  form: 'Paste' | 'Gel' | 'Liquid' | 'Tablet' | 'Kit' | 'Cream' | 'Spray' | 'Powder' | 'Foam';
  isPrescription: boolean;
  rating: number;
  reviews: number;
}

export const nobleProducts: ProductData[] = [
  // --- BEST SELLERS & PREVENTIVE ---
  {
    id: 'shy-nm-foam',
    name: 'SHY-NM Tooth Sensitivity Foam',
    brand: 'Group Pharma',
    category: 'preventive',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=SHY-NM',
    clinicPrice: 371,
    mrp: 495,
    saving: 124,
    subText: 'Strengthens enamel and calms sudden zingers with Potassium nitrate and NovaMin.',
    badges: ['Best Seller', 'Instant Relief'],
    tags: ['sensitivity', 'enamel', 'foam'],
    indications: ['Hot-Cold Sensitivity', 'Post-Whitening Care', 'Exposed Tubules'],
    usage: ['Apply foam to teeth', 'Leave for 2-3 mins', 'Spit without rinsing'],
    ingredients: ['Potassium Nitrate', 'NovaMin', 'Fluoride'],
    form: 'Foam',
    isPrescription: false,
    rating: 4.9,
    reviews: 1240
  },
  {
    id: 'enafix-cream',
    name: 'Enafix Remineralising Cream',
    brand: 'Group Pharma',
    category: 'preventive',
    image: 'https://images.unsplash.com/photo-1559586616-361e18714958?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=600',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=Enafix',
    clinicPrice: 570,
    mrp: 760,
    saving: 190,
    subText: 'Rapid relief for early enamel lesions using ACP-CPP technology.',
    badges: ['Clinic Exclusive', 'Enamel Repair'],
    tags: ['remineralisation', 'white spots', 'cream'],
    indications: ['Early Enamel Lesions', 'White Spot Lesions', 'Fluoride Boost'],
    usage: ['Apply pea-sized amount', 'Massage onto teeth', 'Use nightly'],
    ingredients: ['ACP-CPP', 'Sodium Fluoride'],
    form: 'Cream',
    isPrescription: false,
    rating: 4.8,
    reviews: 856
  },
  {
    id: 'aclaim-cream',
    name: 'Aclaim Remineralising Cream',
    brand: 'Group Pharma',
    category: 'preventive',
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=600',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=Aclaim',
    clinicPrice: 563,
    mrp: 750,
    saving: 187,
    subText: 'Restores and strengthens braces-weakened enamel with hydroxyapatite.',
    badges: ['New Arrival', 'Ortho Safe'],
    tags: ['hydroxyapatite', 'sensitivity', 'braces'],
    indications: ['Orthodontic White Spots', 'Hypersensitivity', 'Weak Enamel'],
    usage: ['Apply after brushing', 'Do not rinse'],
    ingredients: ['Nano Hydroxyapatite', 'Fluoride'],
    form: 'Cream',
    isPrescription: false,
    rating: 4.7,
    reviews: 320
  },
  
  // --- ORTHODONTICS ---
  {
    id: 'amflor-toothpaste',
    name: 'Amflor Anti-Cavity Toothpaste',
    brand: 'Group Pharma',
    category: 'ortho',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=Amflor',
    clinicPrice: 158,
    mrp: 210,
    saving: 52,
    subText: 'Extends care beyond braces with organic amine fluoride.',
    badges: ['Braces Essential', 'Cavity Shield'],
    tags: ['braces', 'ortho', 'fluoride'],
    indications: ['Orthodontic Therapy', 'Plaque Control', 'Bracket Cleaning'],
    usage: ['Brush 2x daily', 'Focus on bracket margins'],
    ingredients: ['Amine Fluoride', 'Xylitol'],
    form: 'Paste',
    isPrescription: false,
    rating: 4.6,
    reviews: 540
  },
  {
    id: 'amflor-rinse',
    name: 'Amflor Oral Rinse',
    brand: 'Group Pharma',
    category: 'ortho',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=Amflor',
    clinicPrice: 214,
    mrp: 285,
    saving: 71,
    subText: 'Alcohol-free amine fluoride mouthwash for orthodontic hygiene.',
    badges: ['Alcohol Free', 'Ortho Rinse'],
    tags: ['mouthwash', 'braces', 'fresh breath'],
    indications: ['Orthodontic Hygiene', 'White Spot Prevention'],
    usage: ['Rinse with 10ml', 'Use after brushing'],
    ingredients: ['Amine Fluoride', 'Mint'],
    form: 'Liquid',
    isPrescription: false,
    rating: 4.8,
    reviews: 410
  },

  // --- ANTIBIOTICS & PAIN (Rx Only) ---
  {
    id: 'augmentin-625',
    name: 'Augmentin 625 Duo',
    brand: 'GSK',
    category: 'dental',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=600',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=Augmentin',
    clinicPrice: 369,
    mrp: 410,
    saving: 41,
    subText: 'Controls acute dental infections and systemic fevers.',
    badges: ['Rx Only', 'Doctor Supervised'],
    tags: ['antibiotic', 'infection', 'swelling'],
    indications: ['Dental Abscess', 'Post-Surgical Infection', 'Cellulitis'],
    usage: ['As prescribed by dentist', 'Complete full course'],
    ingredients: ['Amoxicillin 500mg', 'Clavulanic Acid 125mg'],
    form: 'Tablet',
    isPrescription: true,
    rating: 4.9,
    reviews: 2100
  },
  {
    id: 'ketorol-dt',
    name: 'Ketorol DT 10mg',
    brand: 'Dr. Reddys',
    category: 'dental',
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=600',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=Ketorol',
    clinicPrice: 131,
    mrp: 145,
    saving: 14,
    subText: 'Potent relief for intense acute toothache and extraction pain.',
    badges: ['Rx Only', 'Severe Pain'],
    tags: ['pain relief', 'toothache', 'acute'],
    indications: ['Acute Toothache', 'Post-Extraction Pain'],
    usage: ['Dissolve in water', 'Max 5 days use'],
    ingredients: ['Ketorolac Tromethamine 10mg'],
    form: 'Tablet',
    isPrescription: true,
    rating: 4.7,
    reviews: 890
  },

  // --- KIDS DENTAL ---
  {
    id: 'pediflor-kidz-kit',
    name: 'PediflorKidz Day & Night Kit',
    brand: 'Group Pharma',
    category: 'dental',
    image: 'https://images.unsplash.com/photo-1544367563-12123d832d34?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=Pediflor',
    clinicPrice: 126,
    mrp: 168,
    saving: 42,
    subText: 'All-in-one kit with toothpaste, toothbrush and tracking tool.',
    badges: ['Kids 3-12', 'Fun Brushing'],
    tags: ['kids', 'cavity', 'fluoride'],
    indications: ['Early Hygiene Habit', 'Cavity Prevention'],
    usage: ['Brush morning & night', 'Pea sized amount'],
    ingredients: ['Fluoride', 'Xylitol'],
    form: 'Kit',
    isPrescription: false,
    rating: 4.8,
    reviews: 670
  },
  
  // --- WELLNESS & SPECIALTY ---
  {
    id: 'ormist-spray',
    name: 'ORMIST Hydrating Mouth Spray',
    brand: 'Group Pharma',
    category: 'wellness',
    image: 'https://images.unsplash.com/photo-1617135008560-6147291f4215?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=600',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=ORMIST',
    clinicPrice: 293,
    mrp: 293,
    saving: 0,
    subText: 'Paraben-free Hyaluronic Acid formula for dry mouth relief.',
    badges: ['Dry Mouth', 'Hyaluronic Acid'],
    tags: ['xerostomia', 'hydration', 'spray'],
    indications: ['Dry Mouth', 'Low Saliva'],
    usage: ['Spray 2-3 times', 'Use as needed'],
    ingredients: ['Hyaluronic Acid', 'Essential Minerals'],
    form: 'Spray',
    isPrescription: false,
    rating: 4.6,
    reviews: 150
  },
  {
    id: 'desmocare',
    name: 'Desmocare Implant Mouthwash',
    brand: 'Group Pharma',
    category: 'dental',
    image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=Desmo',
    clinicPrice: 131,
    mrp: 175,
    saving: 44,
    subText: 'Antioxidant-rich mouthwash for dental implant healing.',
    badges: ['Implant Specialist', 'Antioxidant'],
    tags: ['implants', 'healing', 'gums'],
    indications: ['Post-Implant Surgery', 'Peri-implantitis Prevention'],
    usage: ['Rinse twice daily', 'Do not dilute'],
    ingredients: ['Desmotite', 'Antioxidants'],
    form: 'Liquid',
    isPrescription: false,
    rating: 4.9,
    reviews: 310
  },
  {
    id: 'densive-powder',
    name: 'Densive Denture Adhesive',
    brand: 'Group Pharma',
    category: 'dental',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=Densive',
    clinicPrice: 182,
    mrp: 242,
    saving: 60,
    subText: 'Odor-free adhesive powder for secure denture retention.',
    badges: ['Denture Care', 'Strong Hold'],
    tags: ['denture', 'adhesive', 'elderly'],
    indications: ['Loose Dentures', 'Improved Chewing'],
    usage: ['Apply to wet denture', 'Insert and press'],
    ingredients: ['Adhesive Copolymer'],
    form: 'Powder',
    isPrescription: false,
    rating: 4.5,
    reviews: 420
  },
  {
    id: 'dental-probiotic',
    name: 'Dental Probiotic Sachets',
    brand: 'Group Pharma',
    category: 'wellness',
    image: 'https://images.unsplash.com/photo-1626947346165-4c22880c2ea2?auto=format&fit=crop&q=80&w=400',
    bgImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600',
    titleImage: 'https://via.placeholder.com/200x50/000000/FFFFFF?text=Probiotic',
    clinicPrice: 320,
    mrp: 320,
    saving: 0,
    subText: 'Lactobacillus reuteri sachets for oral microbiome balance.',
    badges: ['Microbiome', 'Gut Health'],
    tags: ['probiotic', 'bad breath', 'gut'],
    indications: ['Halitosis', 'Post-Antibiotic Care'],
    usage: ['One sachet daily', 'Directly on tongue'],
    ingredients: ['Lactobacillus reuteri'],
    form: 'Powder',
    isPrescription: false,
    rating: 4.7,
    reviews: 180
  }
];
