import PageTransition from '../components/ui/PageTransition';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ScrollReveal from '../components/ui/ScrollReveal';
import { Dumbbell, Activity, Shield, Sparkles, Flame, Eye } from 'lucide-react';
import { facilitiesData } from '../data';
import BmiCalorieCalculator from '../components/ui/BmiCalorieCalculator';

export default function Facilities() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen bg-matte">
        <Section
          title="WORLD-CLASS ARCHITECTURE"
          subtitle="EXPLORE THE SANCTUARY"
          description="Every zone inside Ganesha Fitness’s 5,000+ sq. ft space is scientifically configured to optimize training flows, protect joint health, and foster a motivating atmosphere."
          background="matte"
        >
          {/* Facilities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
            {facilitiesData.map((facility, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1} scale={0.97}>
                <Card
                   title={facility.title}
                   subtitle={facility.sub}
                   image={facility.image}
                   imageAlt={facility.title}
                   hoverEffect={true}
                   className="bg-charcoal/60 border border-gold-500/5 hover:border-gold-500/15 h-full"
                >
                  <div className="flex items-center gap-3 border-b border-gold-500/5 pb-4 mb-4">
                    <div className="p-2 rounded-sm bg-gold-500/5 border border-gold-500/10">
                      {facility.icon}
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-gold-500 uppercase font-semibold">
                      PREMIUM ZONE
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed font-sans">
                    {facility.desc}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Section>

        {/* Biometric index & calorie engine */}
        <Section
          title="BIOMETRIC INTEGRITY ANALYSIS"
          subtitle="BODY METRIC ESTIMATION"
          description="Assess your baseline body mass index, basal metabolic rate, and personalized target daily calorie ratios to optimize athletic adaptation."
          background="charcoal"
        >
          <BmiCalorieCalculator />
        </Section>

        {/* Hygiene and Air Filtration standards */}
        <Section
          title="THE HYGIENE COMMITMENT"
          subtitle="SANITATION STANDARDS"
          background="matte"
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <ScrollReveal direction="up" delay={0.0} className="p-6 bg-charcoal/40 rounded-sm border border-gold-500/5">
              <Sparkles className="w-6 h-6 text-gold-500 mx-auto mb-3" />
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2">
                CRITICAL SANITIZATION
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                All weights, seat pads, handles, and grip rigs are sanitised four times daily with medical-grade antiviral formulations.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.1} className="p-6 bg-charcoal/40 rounded-sm border border-gold-500/5">
              <Activity className="w-6 h-6 text-gold-500 mx-auto mb-3" />
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2">
                ACTIVE AIR FILTER
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Heavy-duty commercial ventilation systems ensure rapid, continuous fresh air cycles and consistent temperature-humidity balances.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="p-6 bg-charcoal/40 rounded-sm border border-gold-500/5">
              <Eye className="w-6 h-6 text-gold-500 mx-auto mb-3" />
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2">
                CCTV SURVEILLANCE
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Continuous high-definition security camera arrays ensure safety, theft prevention, and structural monitoring across all floor zones.
              </p>
            </ScrollReveal>
          </div>
        </Section>
      </div>
    </PageTransition>
  );
}
