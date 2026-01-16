import { Clock, Ruler, Activity, Shield, Droplets, Star, Scan, Smile, ShieldCheck, HeartPulse, Award, Heart, Sparkles, Zap } from 'lucide-react';

export interface TreatmentStep {
  title: string;
  desc: string;
}

export interface TreatmentFAQ {
  q: string;
  a: string;
}

export interface TreatmentData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  heroImage: string;
  description: string;
  longDescription: string;
  stats: { label: string; value: string; icon: any }[];
  process: TreatmentStep[];
  benefits: string[];
  faqs: TreatmentFAQ[];
  keywords: string[];
}

export const treatmentsData: Record<string, TreatmentData> = {
  "root-canal": {
    id: "root-canal",
    title: "Microscopic Root Canal",
    subtitle: "Endodontic precision under 25x magnification.",
    category: "Endodontics",
    heroImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f72?auto=format&fit=crop&q=80&w=1200",
    description: "Advanced single-visit root canal therapy using dental microscopes for 100% precision and zero pain.",
    longDescription: "Root canal treatment at Noble Dental Care is defined by technology. Utilizing Zeiss Extaro 300 microscopes, we identify micro-canals (MB2) that traditional methods often miss. Our protocol includes Er:YAG laser activation of irrigants, ensuring 99.9% bacterial elimination from the root system for predictable long-term healing.",
    stats: [
      { label: "Duration", value: "45 Mins", icon: Clock },
      { label: "Precision", value: "Microscopic", icon: Ruler },
      { label: "Success Rate", value: "99.2%", icon: Activity }
    ],
    process: [
      { title: "CBCT Root Mapping", desc: "3D visualization of canal anatomy to prevent perforations." },
      { title: "Digital Anesthesia", desc: "Buffered electronic numbing for an instant, sting-free experience." },
      { title: "Activated Irrigation", desc: "Sonic and Laser activation to disinfect accessory canals." },
      { title: "Bioceramic Sealing", desc: "Advanced biocompatible obturation that reinforces tooth walls." }
    ],
    benefits: [
      "99.2% Radiographic Success Rate",
      "Painless Single-Visit Completion",
      "Preserves Max Natural Tooth Structure",
      "CBCT-Guided Precision Access",
      "24/7 Post-Op Clinical Support"
    ],
    faqs: [
      { q: "Is single-visit RCT safe?", a: "Absolutely. With microscopic and laser disinfection, most infections can be resolved in one session without risk of flare-ups." },
      { q: "Do I really need a crown after?", a: "Yes. After RCT, the tooth loses its blood supply and becomes brittle. A zirconia crown acts as a safety helmet to prevent fractures." }
    ],
    keywords: ["pain", "rct", "toothache", "infection", "painless"]
  },
  "dental-implants": {
    id: "dental-implants",
    title: "Biological Implants",
    subtitle: "Titanium stability with PRF biological healing.",
    category: "Surgery",
    heroImage: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=1200",
    description: "Replace missing teeth with titanium anchors that look, feel, and function exactly like natural teeth.",
    longDescription: "Dental implants at Noble combine surgical robotics (Guided Templates) with biological boosters. We utilize ITI (International Team for Implantology) standards, placing Grade-5 Titanium or Metal-Free Zirconia implants. Our unique PRF (Platelet Rich Fibrin) protocol uses your own growth factors to accelerate bone integration by 40%.",
    stats: [
      { label: "Stability", value: "Guided Fix", icon: Shield },
      { label: "Healing", value: "PRF Fast-Track", icon: Droplets },
      { label: "Warranty", value: "Lifetime", icon: Star }
    ],
    process: [
      { title: "Bone Density Scan", desc: "3D assessment of jaw volume using digital CBCT." },
      { title: "Guided Placement", desc: "Computer-designed templates for 0.1mm accuracy." },
      { title: "Biological Loading", desc: "Application of growth factors (PRF) for rapid healing." },
      { title: "Digital Impression", desc: "High-speed intraoral scan for the final ceramic crown." }
    ],
    benefits: [
      "Prevents Facial Bone Resorption",
      "Natural Biological Integration",
      "No Damage to Healthy Adjacent teeth",
      "Lifetime Global Warranty Card",
      "Stable 100% Chewing Force"
    ],
    faqs: [
      { q: "How long is the healing?", a: "Biological integration (Osseointegration) typically takes 12 weeks, though you'll have a temporary tooth during this time." },
      { q: "Is it painful?", a: "Guided surgery is minimally invasive. Most patients report less discomfort than a simple extraction." }
    ],
    keywords: ["missing tooth", "gap", "titanium", "surgery", "permanent", "fixed tooth"]
  },
  "invisalign": {
    id: "invisalign",
    title: "iTero Clear Aligners",
    subtitle: "AI-planned invisible orthodontics.",
    category: "Orthodontics",
    heroImage: "https://images.unsplash.com/photo-1595867372361-597621c258d4?auto=format&fit=crop&q=80&w=1200",
    description: "The clear alternative to braces. Removable, comfortable, and virtually invisible trays.",
    longDescription: "Transform your smile without metal. Our aligner program utilizes the iTero Element 5D scanner to capture 6,000 images per second. Dr. Deepak's 3D planning software simulates your entire movement trajectory before the first tray is even manufactured, ensuring predictable results for professionals and students alike.",
    stats: [
      { label: "Scanning", value: "iTero 5D", icon: Scan },
      { label: "Comfort", value: "Ultra-Thin", icon: Smile },
      { label: "Planning", value: "AI-Driven", icon: Activity }
    ],
    process: [
      { title: "3D Smile Scan", desc: "Instant digital map of your bite and alignment." },
      { title: "Outcome Simulator", desc: "Preview your finished smile on screen immediately." },
      { title: "Custom Fabrication", desc: "Sequential PETG trays engineered for your teeth." },
      { title: "Remote Monitoring", desc: "Track progress via our smartphone app weekly." }
    ],
    benefits: [
      "Virtually Invisible Aesthetics",
      "Removable for Meals & Events",
      "30% Faster Move Technology",
      "Zero Emergency Wire Pokes",
      "Better Gum Health Maintenance"
    ],
    faqs: [
      { q: "Can I eat anything?", a: "Yes! Since trays are removable, there are zero food restrictions. Just brush before putting them back." },
      { q: "Does it work for severe cases?", a: "Yes, modern aligners with smart-attachments can fix 90% of orthodontic issues including severe crowding." }
    ],
    keywords: ["straighten", "braces", "aligners", "invisible", "crooked teeth", "smile design"]
  },
  "crowns-bridges": {
    id: "crowns-bridges",
    title: "Digital Crowns & Bridges",
    subtitle: "CAD/CAM engineered ceramic restorations.",
    category: "Restorative",
    heroImage: "https://images.unsplash.com/photo-1593059812632-d74676be9a2c?auto=format&fit=crop&q=80&w=1200",
    description: "Custom-milled zirconia and E.max restorations for broken or missing teeth.",
    longDescription: "Our restorations are designed digitally for a 5-micron accuracy fit. We use multi-layered monolithic zirconia that mimics the translucency of natural enamel while providing high fracture resistance.",
    stats: [
        { label: "Fit", value: "Digital CAD", icon: Scan },
        { label: "Strength", value: "1200 MPa", icon: Shield },
        { label: "Warranty", value: "10 Years", icon: Award }
    ],
    process: [
        { title: "Digital Scan", desc: "Intraoral mapping with iTero 5D." },
        { title: "Design", desc: "Virtual modeling of tooth anatomy." },
        { title: "Milling", desc: "5-axis precision ceramic milling." },
        { title: "Bonding", desc: "Adhesive cementation for a permanent seal." }
    ],
    benefits: ["Natural Aesthetics", "High Durability", "Biocompatible", "Plaque Resistant"],
    faqs: [{ q: "How long do they last?", a: "Typically 15-20 years with good clinical hygiene." }],
    keywords: ["crown", "cap", "bridge", "broken tooth", "zirconia"]
  },
  "kids-dentistry": {
    id: "kids-dentistry",
    title: "Little Smiles Program",
    subtitle: "Fearless pediatric dental care.",
    category: "Pediatrics",
    heroImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200",
    description: "Gentle dental checkups and treatments for infants and children in a friendly environment.",
    longDescription: "Building a lifetime of healthy habits starts here. Our pediatric specialists use 'Tell-Show-Do' techniques to ensure every child feels safe and empowered during their visit.",
    stats: [
        { label: "Approach", value: "No Tears", icon: Heart },
        { label: "Focus", value: "Prevention", icon: Shield },
        { label: "Fun", value: "Reward Kits", icon: Star }
    ],
    process: [
        { title: "Welcome Orientation", desc: "Gentle introduction to the dental chair." },
        { title: "Prophylaxis", desc: "Kid-friendly cleaning and polishing." },
        { title: "Fluoride Therapy", desc: "Strengthening enamel against decay." },
        { title: "Sealants", desc: "Protective coating for permanent molars." }
    ],
    benefits: ["Anxiety-Free Environment", "Fluoride Protection", "Growth Monitoring", "Dietary Counseling"],
    faqs: [{ q: "When should the first visit be?", a: "The ADA recommends the first visit by age 1." }],
    keywords: ["child", "pediatric", "baby", "kid", "cavity", "sealant"]
  },
  "pregnancy-dental-care": {
    id: "pregnancy-dental-care",
    title: "Prenatal Oral Wellness",
    subtitle: "Safe dental care for expecting mothers.",
    category: "Wellness",
    heroImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1200",
    description: "Clinical hygiene and guidance specifically tailored for the safety of mother and baby.",
    longDescription: "Hormonal changes during pregnancy can increase the risk of gum disease. We provide specialized, fetal-safe protocols to maintain oral health during all three trimesters.",
    stats: [
        { label: "Safety", value: "Fetal Safe", icon: ShieldCheck },
        { label: "Protocol", value: "WHO Aligned", icon: HeartPulse },
        { label: "Comfort", value: "Ergonomic", icon: Smile }
    ],
    process: [
        { title: "Bio-Audit", desc: "Assessing gum health and hormonal impacts." },
        { title: "Safe Hygiene", desc: "Gentle cleaning to prevent prenatal gingivitis." },
        { title: "Education", desc: "Guidance on acid erosion and nutrition." }
    ],
    benefits: ["Prevents Preterm Risks", "Safe Diagnostics", "Comfort Seating", "Customized Home-Care"],
    faqs: [{ q: "Are X-rays safe?", a: "Yes, with lead-shielding and digital sensors, radiation is negligible." }],
    keywords: ["pregnant", "mom", "baby", "gums", "bleeding", "safety"]
  },
  "tooth-extraction": {
    id: "tooth-extraction",
    title: "Atraumatic Extraction",
    subtitle: "Piezo-surgical removal with minimal swelling.",
    category: "Surgery",
    heroImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
    description: "Painless removal of decayed or impacted wisdom teeth using microsurgical instruments.",
    longDescription: "We redefine the extraction experience. Using Piezosurgery (ultrasonic bone cutting), we eliminate the trauma associated with traditional drills. This preserves the surrounding bone and soft tissue, resulting in 94% less post-operative swelling and significantly faster recovery times.",
    stats: [
      { label: "Trauma", value: "Near-Zero", icon: Heart },
      { label: "Planning", value: "Nerve Tracing", icon: Scan },
      { label: "Healing", value: "PRF Dome", icon: Activity }
    ],
    process: [
      { title: "3D Nerve Map", desc: "Locating sensory nerves via CBCT to ensure safety." },
      { title: "The Wand Numbing", desc: "Computer-controlled painless anesthetic delivery." },
      { title: "Ultrasonic Sectioning", desc: "Selective bone removal that avoids soft tissue." },
      { title: "Socket Preservation", desc: "Grafting or PRF placement to maintain jaw volume." }
    ],
    benefits: [
      "94% Less Post-Op Swelling",
      "Zero Risk of Nerve Damage",
      "Painless Injection Technology",
      "Socket Preservation for Implants",
      "12-Hour Priority Triage Check"
    ],
    faqs: [
      { q: "When can I eat?", a: "You can have soft, cold foods immediately. Normal chewing usually resumes in 3-5 days." },
      { q: "Is sedation available?", a: "Yes, we offer conscious sedation for anxious patients or complex wisdom tooth impactions." }
    ],
    keywords: ["pain", "wisdom tooth", "remove", "surgical", "hurt", "impacted"]
  },
  "tooth-fillings": {
    id: "tooth-fillings",
    title: "Invisible Fillings",
    subtitle: "Biomimetic nano-composite restoration.",
    category: "Restorative",
    heroImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
    description: "Nano-composite bonding that mimics your natural tooth color and strength.",
    longDescription: "We utilize biomimetic principles to 're-build' your tooth rather than just filling a hole. Using Tetric-N-Line nano-hybrid composites under rubber dam isolation, we ensure a 100% moisture-free chemical bond. This creates a restoration that flexes like natural dentin and looks like pure enamel.",
    stats: [
      { label: "Finish", value: "Mirror Polish", icon: Sparkles },
      { label: "Bonding", value: "ISO-Bond", icon: Shield },
      { label: "Isolation", value: "Rubber Dam", icon: Zap }
    ],
    process: [
      { title: "Strict Isolation", desc: "Rubber dam use to prevent saliva contamination." },
      { title: "Decay Removal", desc: "Magnification-guided cleanout of infected tissue." },
      { title: "Incremental Layering", desc: "Building anatomy one thin layer at a time." },
      { title: "Anatomical Sculpt", desc: "Carving fissures to match your original tooth." }
    ],
    benefits: [
      "100% Metal & Mercury Free",
      "Invisible 'Chameleon' Blending",
      "Strengthens Tooth Structure",
      "Plaque-Resistant High Polish",
      "Zero Secondary Decay Risk"
    ],
    faqs: [
      { q: "Do they look real?", a: "Yes. Our layering technique mimics the light-reflecting properties of real teeth. They are virtually invisible." },
      { q: "How long do they last?", a: "With good hygiene and regular GBT cleaning, nano-hybrid fillings can last 10-15 years." }
    ],
    keywords: ["cavity", "decay", "hole", "black spot", "sensitivity", "broken tooth"]
  },
  "scaling-whitening": {
    id: "scaling-whitening",
    title: "Guided Biofilm Therapy",
    subtitle: "Medical-grade hygiene and stain removal.",
    category: "Preventive",
    heroImage: "https://images.unsplash.com/photo-1609840114035-1c29046a83ea?auto=format&fit=crop&q=80&w=1200",
    description: "Guided Biofilm Therapy (GBT) removes calculus and stains using heated ultrasonic waves, restoring gum health painlessly.",
    longDescription: "Traditional scaling is outdated. At Noble, we use EMS AirFlow® Guided Biofilm Therapy. This 8-step protocol uses disclosure dye to visualize plaque, followed by heated water and erythritol powder to clean deep into gum pockets without touching the sensitive enamel.",
    stats: [
      { label: "Safety", value: "Enamel-Safe", icon: Shield },
      { label: "Stain Removal", value: "100%", icon: Sparkles },
      { label: "Comfort", value: "Heated Wave", icon: Heart }
    ],
    process: [
      { title: "Biofilm Disclosure", desc: "Dyeing plaque purple to reveal all hidden areas." },
      { title: "AirFlow Power", desc: "Removing stains and soft plaque with gentle powder." },
      { title: "Piezon Scaling", desc: "Ultrasonic wave removal of hard calculus." },
      { title: "Fluoride Finish", desc: "Protective coating to strengthen the enamel." }
    ],
    benefits: [
      "No Sharp Instruments Used",
      "Safe for Implants & Braces",
      "Instantly Brightens Smile",
      "Prevents Heart & Gum Disease",
      "Heated Water for Sensitivity"
    ],
    faqs: [
      { q: "Is it painful?", a: "GBT is designed for patients with high sensitivity. Most patients find it as relaxing as a spa treatment." },
      { q: "How often?", a: "Every 6 months is the medical recommendation to maintain a healthy oral microbiome." }
    ],
    keywords: ["stains", "yellow teeth", "cleaning", "bad breath", "bleeding gums", "calculus"]
  },
  "teeth-whitening": {
    id: "teeth-whitening",
    title: "Laser Teeth Whitening",
    subtitle: "Instant brightening with Philips Zoom.",
    category: "Cosmetic",
    heroImage: "https://images.unsplash.com/photo-1609840114035-1c29046a83ea?auto=format&fit=crop&q=80&w=1200",
    description: "Safe, effective, and instant teeth whitening performed by dental professionals.",
    longDescription: "Our in-office whitening procedure uses light-activated peroxide gels to break down deep-set stains from coffee, tea, and aging. Unlike home kits, we use gum barriers to protect soft tissues, ensuring maximum whitening power with zero gum irritation.",
    stats: [
      { label: "Time", value: "60 Mins", icon: Clock },
      { label: "Shades", value: "Up to 8", icon: Sparkles },
      { label: "Safety", value: "Gum-Safe", icon: Shield }
    ],
    process: [
      { title: "Shade Assessment", desc: "Documenting your current tooth shade." },
      { title: "Gum Barrier", desc: "Applying a protective gel to cover gums." },
      { title: "Gel Application", desc: "Applying professional whitening agent." },
      { title: "Light Activation", desc: "Using LED light to accelerate whitening." }
    ],
    benefits: [
      "Instant Results in 1 Hour",
      "Professional Strength Formula",
      "Reduced Sensitivity Protocols",
      "Long-Lasting Brightness",
      "Boosts Self-Confidence"
    ],
    faqs: [
      { q: "Does it damage enamel?", a: "No, professional whitening is safe for enamel when done correctly." },
      { q: "How long does it last?", a: "Results can last 1-3 years depending on dietary habits (coffee/wine intake)." }
    ],
    keywords: ["white", "bleach", "stain", "yellow", "bright", "smile"]
  }
};
