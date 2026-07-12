import { Award, Flame, Trophy, Dumbbell, Activity, Shield, Zap } from 'lucide-react';
import { MembershipPlan, FacilityItem, Trainer, GalleryItem, ReviewItem } from './types';

export const pillarsData = [
  {
    title: 'Biomechanical Precision',
    subtitle: '01 / SYSTEM',
    icon: <Flame className="w-6 h-6 text-gold-500" />,
    desc: 'Our workspace features premium, imported biomechanically optimized strength lines that target precise muscle groups, ensuring injury prevention and maximum hypertrophy stimulus.'
  },
  {
    title: 'Customized Sports Science',
    subtitle: '02 / METHOD',
    icon: <Zap className="w-6 h-6 text-gold-500" />,
    desc: 'We discard generic routines. Every member receives custom metabolic profiles, periodic body assessments, and structured nutrition planning engineered for their biological goals.'
  },
  {
    title: 'Certified Elite Coaching',
    subtitle: '03 / MINDSET',
    icon: <Trophy className="w-6 h-6 text-gold-500" />,
    desc: 'Train with Shikrapur’s highest-rated professional athletic instructors, each maintaining international accreditation and specialized athletic coaching backgrounds.'
  }
];

export const facilitiesData: FacilityItem[] = [
  {
    title: 'Biomechanic Strength Arena',
    sub: 'STRENGTH & HYPERTROPHY',
    // TODO: REPLACE_FACILITY_IMAGE_1 (Biomechanic Strength Arena)
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop',
    desc: 'Our flagship training zone. Engineered with premium plate-loaded machine lines, heavy squat racks, bumper plates, and a massive dumbbell selection up to 60kg for absolute hypertrophy training.',
    icon: <Dumbbell className="w-5 h-5 text-gold-500" />
  },
  {
    title: 'High-Performance Cardio Grid',
    sub: 'VASCULAR CONDITIONING',
    // TODO: REPLACE_FACILITY_IMAGE_2 (High-Performance Cardio Grid)
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop',
    desc: 'Improve stamina and stroke volume on high-end commercial cardio setups. Features smart screen treadmills, heavy cross-trainers, air bikes, and professional-grade rowing systems.',
    icon: <Activity className="w-5 h-5 text-gold-500" />
  },
  {
    title: 'Functional Turf & HIIT Loft',
    sub: 'MOBILITY & EXPLOSIVENESS',
    // TODO: REPLACE_FACILITY_IMAGE_3 (Functional Turf & HIIT Loft)
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop',
    desc: 'Spacious high-impact synthetic turf zone designed for athletic conditioning, explosive kettlebell flows, heavy battle rope intervals, plyometrics, and functional core mobility setups.',
    icon: <Flame className="w-5 h-5 text-gold-500" />
  },
  {
    title: 'Premium Recovery Lockers',
    sub: 'HYGIENE & REFRESHMENT',
    // TODO: REPLACE_FACILITY_IMAGE_4 (Premium Recovery Lockers)
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
    desc: 'A luxury post-workout transition zone. Spotless, temperature-controlled changing rooms equipped with digital lockers, multiple rain showers, premium toiletries, and ambient mirrors.',
    icon: <Shield className="w-5 h-5 text-gold-500" />
  }
];

export const plansData: MembershipPlan[] = [
  {
    name: 'Monthly Tier',
    price: '₹1,200',
    period: 'Month',
    subtitle: 'COMMITTED ACCESS',
    icon: <Award className="w-5 h-5 text-gold-500" />,
    popular: false,
    features: [
      'Full access to 5,000+ sq. ft Strength Arena',
      'Imported biomechanical heavy lines',
      'Elite high-performance Cardio Grid',
      'Complimentary high-speed WiFi & lockers',
      'General posture & form checks',
      '24/7 access (During operational hours)',
    ],
  },
  {
    name: 'Quarterly Elite',
    price: '₹5,000',
    period: '3 Months',
    subtitle: 'TRANSFORMATION TIER',
    icon: <Flame className="w-5 h-5 text-gold-500" />,
    popular: true,
    features: [
      'All Monthly Tier access rights',
      '1 complimentary Personal Trainer session',
      'Personalized body recomposition assessment',
      'Customized calorie & macronutrient chart',
      'Priority access to dynamic trainers',
      'Exclusive Ganesha Gym shaker',
    ],
  },
  {
    name: 'Yearly Legacy',
    price: '₹12,000',
    period: '12 Months',
    subtitle: 'ULTIMATE LIFESTYLE',
    icon: <Trophy className="w-5 h-5 text-gold-500" />,
    popular: false,
    features: [
      'All Quarterly Elite features included',
      '3 complimentary Personal Trainer sessions',
      'Unrestricted access to all HIIT/Mobility zones',
      'Monthly physical assessment & tracking reports',
      'Freeze subscription option (Up to 30 days)',
      'Legacy gym t-shirt & premium merchandise',
    ],
  },
];

export const trainersData: Trainer[] = [
  {
    name: 'Amit Shinde',
    role: 'FOUNDER & HEAD COACH',
    exp: '10+ Years Professional Experience',
    // TODO: REPLACE_TRAINER_IMAGE_1 (Amit Shinde headshot)
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1000&auto=format&fit=crop',
    credentials: ['Certified Personal Trainer (K11)', 'Sports Nutrition Specialist', 'Strength & Conditioning Coach'],
    specialties: 'Hypertrophy, biomechanics, competitive physique coaching, custom contest prep.'
  },
  {
    name: 'Rahul Patil',
    role: 'STRENGTH SPECIALIST',
    exp: '6+ Years Floor Coaching',
    // TODO: REPLACE_TRAINER_IMAGE_2 (Rahul Patil headshot)
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
    credentials: ['ISSA Certified Coach', 'Advanced Bodybuilding Trainer', 'First Aid & CPR Certified'],
    specialties: 'Powerlifting mechanics, compound movement optimization, core stabilization, injury recovery.'
  },
  {
    name: 'Priya Joshi',
    role: 'FEMALE FITNESS EXPERT',
    exp: '5+ Years Certified Practice',
    // TODO: REPLACE_TRAINER_IMAGE_3 (Priya Joshi headshot)
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1000&auto=format&fit=crop',
    credentials: ['Certified Personal Trainer (REPs L3)', 'Functional & HIIT Instructor', 'Pre/Post Natal Fitness Cert'],
    specialties: 'Female hormone-based fat loss, explosive HIIT conditioning, flexibility, functional core strength.'
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: 1,
    category: 'STRENGTH FLOOR',
    title: 'Heavy Biomechanical Racks',
    desc: 'Solid-steel multi-squat stations and power cages.',
    // TODO: REPLACE_GALLERY_IMAGE_1 (Heavy Biomechanical Racks)
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    category: 'STRENGTH FLOOR',
    title: 'Imported Dumbbell Station',
    desc: 'Precision urethane dumbbells ranging up to 60kg.',
    // TODO: REPLACE_GALLERY_IMAGE_2 (Imported Dumbbell Station)
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    category: 'CARDIO ZONE',
    title: 'Sleek Air Conditioning Rowers',
    desc: 'Digital display magnetic rowing machines and stairmasters.',
    // TODO: REPLACE_GALLERY_IMAGE_3 (Sleek Air Conditioning Rowers)
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    category: 'CARDIO ZONE',
    title: 'Commercial Curved Treadmills',
    desc: 'Sleek self-powered curve running lines.',
    // TODO: REPLACE_GALLERY_IMAGE_4 (Commercial Curved Treadmills)
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    category: 'FUNCTIONAL RIG',
    title: 'CrossFit Assault Rig',
    desc: 'Multi-station pulling rig, gymnastic rings, and target boards.',
    // TODO: REPLACE_GALLERY_IMAGE_5 (CrossFit Assault Rig)
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 6,
    category: 'RECOVERY LOUNGE',
    title: 'Digital Ambient Lockers',
    desc: 'Secure electronic locker channels and posture change zone.',
    // TODO: REPLACE_GALLERY_IMAGE_6 (Digital Ambient Lockers)
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=800&auto=format&fit=crop'
  }
];

export const reviewsData: ReviewItem[] = [
  {
    name: 'Kunal Deshmukh',
    role: 'Verified Elite Member',
    comment: 'Ganesha Fitness is by far the finest workout ecosystem in Shikrapur! The biomechanics on the plate-loaded chest press are extremely clean, avoiding shoulder strain. Amit Coach takes personal interest in helping members master complex compound forms.',
    rating: 5,
    date: 'Google Review • June 2026',
    initials: 'KD'
  },
  {
    name: 'Snehal Shinde',
    role: 'Female Transformation Member',
    comment: 'Extremely secure, clean, and positive workspace for female fitness enthusiasts. The facilities are clean, well-conditioned, and trainers are highly professional and supportive. My personalized nutritional model helped me drop 8kg in 12 weeks cleanly!',
    rating: 5,
    date: 'Google Review • May 2026',
    initials: 'SS'
  },
  {
    name: 'Vikram Rathi',
    role: 'Strength & Conditioning Athlete',
    comment: 'The energy here is absolutely legendary. High-power acoustics, pristine dumbbells that go up to 60kg, and custom lifting platforms. If you are serious about raw powerlifting or bodybuilding transformations in Pune, Ganesha is your only option.',
    rating: 5,
    date: 'Local Review • April 2026',
    initials: 'VR'
  },
  {
    name: 'Aditya Sisodiya',
    role: 'Premium Yearly Client',
    comment: 'What sets this gym apart is the active community standard. No ego lifting, spotless equipment, and state-of-the-art facilities. The yearly subscription package is incredibly cost-effective given the luxury level of equipment provided.',
    rating: 5,
    date: 'Local Review • March 2026',
    initials: 'AS'
  }
];

export const statsData = [
  { value: 12, suffix: 'k+', label: 'Members' },
  { value: 18, suffix: '+', label: 'Trainers' },
  { value: 150, suffix: '+', label: 'Equipment' },
  { value: 14, suffix: '+', label: 'Years Experience' }
];
