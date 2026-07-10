import PageTransition from '../components/ui/PageTransition';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ScrollReveal from '../components/ui/ScrollReveal';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { Star, MessageSquare, Award, Flame, Quote } from 'lucide-react';
import { reviewsData } from '../data';

export default function Reviews() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen bg-matte">
        <Section
          title="THE TRANSFORMATION CHRONICLES"
          subtitle="COMMUNITY VOICE"
          description="Read real success stories, athletic achievements, and direct feedback shared by our dedicated membership community in Shikrapur, Pune."
          background="matte"
        >
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
            {reviewsData.map((rev, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1} scale={0.97}>
                <Card
                  title={rev.name}
                  subtitle={rev.role}
                  hoverEffect={true}
                  className="bg-charcoal/60 border border-gold-500/5 hover:border-gold-500/15 p-6 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Card Header Profile Initials */}
                    <div className="flex items-center justify-between border-b border-gold-500/5 pb-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm bg-gradient-gold text-matte font-display font-bold text-sm flex items-center justify-center">
                          {rev.initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-display font-bold text-sm text-white uppercase tracking-wider">
                            {rev.name}
                          </span>
                          <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-semibold">
                            {rev.role}
                          </span>
                        </div>
                      </div>
                      <Quote className="w-5 h-5 text-gold-500/20" />
                    </div>

                    {/* Stars block */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-gold-500 stroke-gold-500" />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-sm text-gray-300 leading-relaxed font-sans italic mb-6">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Footer source metadata */}
                  <div className="text-[10px] font-mono text-gray-500 tracking-wider pt-3 border-t border-gold-500/5 mt-auto">
                    {rev.date}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Section>

        {/* Global Stats Social Summary Section */}
        <Section
          title="OUR REPUTATION IN NUMBERS"
          subtitle="TRUST INDEX"
          background="charcoal"
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <ScrollReveal direction="up" delay={0.0} className="p-6 bg-matte/40 rounded-sm border border-gold-500/5">
              <span className="font-display font-black text-3xl sm:text-4xl text-gold-500 block mb-2">
                <AnimatedCounter value={4} suffix=".9 / 5.0" />
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase font-semibold">
                GOOGLE MAPS RATING
              </span>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1} className="p-6 bg-matte/40 rounded-sm border border-gold-500/5">
              <span className="font-display font-black text-3xl sm:text-4xl text-gold-500 block mb-2">
                <AnimatedCounter value={2400} suffix="+" />
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase font-semibold">
                ACTIVE WORKOUT MEMBERS
              </span>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="p-6 bg-matte/40 rounded-sm border border-gold-500/5">
              <span className="font-display font-black text-3xl sm:text-4xl text-gold-500 block mb-2">
                <AnimatedCounter value={98} suffix=".4%" />
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase font-semibold">
                TRANSFORMATION SUCCESS
              </span>
            </ScrollReveal>
          </div>
        </Section>
      </div>
    </PageTransition>
  );
}
