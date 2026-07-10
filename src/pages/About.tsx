import PageTransition from '../components/ui/PageTransition';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ScrollReveal from '../components/ui/ScrollReveal';
import { Shield, Sparkles, Trophy, Flame, Zap, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { pillarsData } from '../data';

export default function About() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen bg-matte">
        {/* Story Section */}
        <Section
          title="THE GANESHA PHILOSOPHY"
          subtitle="WHO WE ARE"
          description="Est. 2025 in Shikrapur, Pune. Ganesha Fitness represents the pinnacle of premium strength culture and body recomposition. Over 5,000 square feet of world-class equipment, meticulously maintained environments, and an unwavering commitment to outstanding results."
          background="matte"
        >
          {/* Main Story Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12">
            <ScrollReveal direction="left" className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs tracking-widest text-gold-500 uppercase font-semibold block">
                SHIKRAPUR'S LARGEST ATHLETIC HUB
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
                WE DO NOT CHASE GENERAL EXERCISE. WE BUILD LEGACIES.
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans">
                At Ganesha Fitness, we believe the human body is an architectural masterpiece. Our facility is engineered for those who seek high-performance lifestyles and refuse the ordinary. Every barbell, dumbbell, plate-loaded line, and premium visual asset is selected with absolute intent.
              </p>
              
              <div className="border-l-2 border-gold-500 pl-6 py-2 bg-charcoal/30 rounded-sm">
                <p className="text-xs sm:text-sm text-gray-300 italic font-medium leading-relaxed">
                  "Our mission is simple: to provide the highest standard of health, hypertrophy, and physical performance training to Shikrapur’s elite."
                </p>
                <span className="text-[10px] font-mono tracking-widest text-gold-500 uppercase font-semibold block mt-2">
                  — AMIT SHINDE, FOUNDER & HEAD COACH
                </span>
              </div>
            </ScrollReveal>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ScrollReveal direction="up" delay={0.1} className="relative group overflow-hidden rounded-sm border border-gold-500/10">
                {/* TODO: REPLACE_ABOUT_IMAGE_1 (Strength Arena side-photo) */}
                <motion.img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop"
                  alt="Strength training session at Ganesha Gym"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  loading="lazy"
                  className="w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte via-matte/40 to-transparent pointer-events-none" />
                <span className="absolute bottom-4 left-4 font-display font-bold text-sm tracking-widest text-white uppercase pointer-events-none">
                  STRENGTH ARENA
                </span>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.2} className="relative group overflow-hidden rounded-sm border border-gold-500/10">
                {/* TODO: REPLACE_ABOUT_IMAGE_2 (Cardio Grid side-photo) */}
                <motion.img
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop"
                  alt="Cardio conditioning equipment grid"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  loading="lazy"
                  className="w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte via-matte/40 to-transparent pointer-events-none" />
                <span className="absolute bottom-4 left-4 font-display font-bold text-sm tracking-widest text-white uppercase pointer-events-none">
                  CARDIO GRID
                </span>
              </ScrollReveal>
            </div>
          </div>
        </Section>

        {/* Pillars Section */}
        <Section
          title="THE PILLARS OF PERFORMANCE"
          subtitle="OUR ARCHITECTURE"
          description="How we deliver consistently life-changing athletic transformations day in, day out."
          background="charcoal"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {pillarsData.map((pillar, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.1} scale={0.98}>
                <Card
                  title={pillar.title}
                  subtitle={pillar.subtitle}
                  hoverEffect={true}
                  className="bg-matte/50 border border-gold-500/5 hover:border-gold-500/20 h-full"
                >
                  <div className="mb-4">
                    {pillar.icon}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Section>

        {/* Vision Statement Section */}
        <Section
          title="A LUXURY HEALTH SANCTUARY"
          subtitle="OUR PROMISE"
          background="matte"
        >
          <ScrollReveal direction="up" scale={0.97} className="max-w-4xl mx-auto text-center space-y-6">
            <Users className="w-10 h-10 text-gold-500 mx-auto animate-pulse" />
            <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white uppercase tracking-wider">
              JOIN SHIKRAPUR'S FASTEST-GROWING FITNESS FAMILY
            </h4>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans max-w-2xl mx-auto">
              No matter where you are starting your journey, Ganesha Fitness offers the clean support, heavy biomechanical equipment, and motivating environment needed to forge an elite physique. Explore our membership packages, check out our trainers, or stop by for a physical tour today.
            </p>
          </ScrollReveal>
        </Section>
      </div>
    </PageTransition>
  );
}
