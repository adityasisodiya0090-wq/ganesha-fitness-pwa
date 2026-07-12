import PageTransition from '../components/ui/PageTransition';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';
import { Check, Flame, Trophy, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { plansData } from '../data';

export default function Plans() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen bg-matte">
        <Section
          title="CHOOSE YOUR COVENANT"
          subtitle="MEMBERSHIP PLANS"
          description="Invest in your physique, health, and athletic discipline. Ganesha Fitness offers transparent plans with zero hidden initiation fees. Select the package that aligns with your fitness goals."
          background="matte"
        >
          {/* Plan Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
            {plansData.map((plan, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1} scale={0.97}>
                <Card
                  title={plan.name}
                  subtitle={plan.subtitle}
                  hoverEffect={true}
                  className={`relative flex flex-col justify-between h-full bg-charcoal/80 border transition-all duration-300 ${
                    plan.popular 
                      ? 'border-gold-500/50 shadow-[0_4px_30px_rgba(212,175,55,0.15)] ring-1 ring-gold-500/20' 
                      : 'border-gold-500/5 hover:border-gold-500/20'
                  }`}
                >
                  <div>
                    {/* Icon & Plan Subtitle Header */}
                    <div className="flex justify-between items-center mb-6 border-b border-gold-500/10 pb-4">
                      <span className="text-[10px] font-mono tracking-widest text-gray-400">
                        GANESHA // ATHLETICS
                      </span>
                      <div className="p-1.5 rounded-sm bg-gold-500/5 border border-gold-500/15">
                        {plan.icon}
                      </div>
                    </div>

                    {/* Big Pricing Block */}
                    <div className="mb-8">
                      <span className="text-4xl sm:text-5xl font-display font-black text-white leading-none block">
                        {plan.price}
                      </span>
                      <span className="text-xs text-gray-400 font-mono tracking-wider mt-2 block">
                        FOR {plan.period.toUpperCase()}
                      </span>
                    </div>

                    {/* Bullet points */}
                    <ul className="space-y-4 text-xs sm:text-sm text-gray-300 mb-8 border-t border-gold-500/10 pt-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                          <span className="leading-tight font-sans text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive CTA Link */}
                  <div className="pt-4 mt-auto">
                    <Link to="/contact">
                      <Button 
                        variant={plan.popular ? 'primary' : 'secondary'} 
                        size="md" 
                        fullWidth
                        className={plan.popular ? 'shadow-[0_4px_20px_rgba(212,175,55,0.1)]' : ''}
                      >
                        Select Plan
                      </Button>
                    </Link>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Section>

        {/* Support Callout Section */}
        <Section
          title="CORPORATE & GROUP OFFERS"
          subtitle="SPECIAL DEALS"
          background="charcoal"
        >
          <ScrollReveal direction="up" className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans">
              Are you planning to train with friends, family members, or corporate colleagues? We offer exclusive discounted rates for group commitments of 3 or more members. Get in touch with our front desk or shoot us a WhatsApp message to receive your bespoke corporate package quote.
            </p>
            <div className="pt-2">
              <Link to="/contact">
                <Button variant="secondary" size="md" className="px-8">
                  Inquire Group Packages
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Section>
      </div>
    </PageTransition>
  );
}
