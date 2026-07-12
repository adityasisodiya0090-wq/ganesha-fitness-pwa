import PageTransition from '../components/ui/PageTransition';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ScrollReveal from '../components/ui/ScrollReveal';
import { Award, ShieldCheck, Dumbbell, Instagram, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import { trainersData } from '../data';

export default function Trainers() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen bg-matte">
        <Section
          title="MEET THE ELITE COACHES"
          subtitle="CERTIFIED PROFESSIONALS"
          description="At Ganesha Fitness, we don’t believe in count-keeping reps. Our professional coaches are scientific trainers who prioritize correct biomechanical execution, nutrition plans, and mental discipline."
          background="matte"
        >
          {/* Trainers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
            {trainersData.map((trainer, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1} scale={0.97}>
                <Card
                  title={trainer.name}
                  subtitle={trainer.role}
                  image={trainer.image}
                  imageAlt={trainer.name}
                  hoverEffect={true}
                  className="bg-charcoal/60 border border-gold-500/5 hover:border-gold-500/15 h-full"
                >
                  {/* Exp Indicator */}
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-gold-500 shrink-0" />
                    <span className="font-mono text-xs text-gold-500 tracking-wider font-semibold">
                      {trainer.exp.toUpperCase()}
                    </span>
                  </div>

                  {/* Trainer Specialties */}
                  <div className="space-y-4 flex-1">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block mb-1">
                        Certifications
                      </span>
                      <ul className="space-y-1.5">
                        {trainer.credentials.map((cred, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                            <ShieldCheck className="w-3.5 h-3.5 text-gold-500/80 shrink-0" />
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block mb-1">
                        Specialties
                      </span>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">
                        {trainer.specialties}
                      </p>
                    </div>
                  </div>

                  {/* Trainer Social Buttons */}
                  <div className="flex gap-2.5 pt-6 border-t border-gold-500/5 mt-6">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="secondary" size="sm" className="w-full flex items-center justify-center gap-2">
                        <Instagram className="w-3.5 h-3.5 text-gold-500" />
                        Follow
                      </Button>
                    </a>
                    <a
                      href={`https://wa.me/917249323535?text=Hi%20Ganesha%20Fitness,%20I'm%20interested%20in%20training%20with%20${encodeURIComponent(trainer.name)}!`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary" size="sm" className="px-3.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Section>

        {/* Dynamic Coach Guarantee */}
        <Section
          title="THE GANESHA COACHING CODE"
          subtitle="OUR PROMISE"
          background="charcoal"
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal direction="up" delay={0.0} className="flex flex-col items-center text-center p-6 bg-matte/40 rounded-sm border border-gold-500/5">
              <Dumbbell className="w-6 h-6 text-gold-500 mb-3" />
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2">
                100% PERSONALIZED REPS
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Every movement pattern is calibrated based on your natural skeletal levers, mobility constraints, and strength capacity.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center text-center p-6 bg-matte/40 rounded-sm border border-gold-500/5">
              <ShieldCheck className="w-6 h-6 text-gold-500 mb-3" />
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2">
                FORM OVER FATIGUE
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                We strictly enforce biomechanical safety, protecting spinal and connective tissue health over ego-lifting counts.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="flex flex-col items-center text-center p-6 bg-matte/40 rounded-sm border border-gold-500/5">
              <Award className="w-6 h-6 text-gold-500 mb-3" />
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2">
                METABOLIC STRATEGY
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Receive evidence-based scientific calorie models to fuel intense sessions and strip body fat cleanly.
              </p>
            </ScrollReveal>
          </div>
        </Section>
      </div>
    </PageTransition>
  );
}
