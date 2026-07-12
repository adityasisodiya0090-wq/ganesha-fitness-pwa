import { FormEvent, useState } from 'react';
import PageTransition from '../components/ui/PageTransition';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';
import { MapPin, Phone, MessageSquare, Mail, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    goals: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Simulate API request saving contact
    setTimeout(() => {
      setIsSubmitted(true);
      // Reset form fields
      setFormData({ name: '', phone: '', goals: '' });
    }, 400);
  };

  const operationalHours = [
    { days: 'Monday - Saturday', hours: '05:30 AM - 10:00 PM' },
    { days: 'Sundays', hours: 'Closed' },
  ];

  return (
    <PageTransition>
      <div className="pt-20 min-h-screen bg-matte">
        <Section
          title="COMMENCE YOUR LIFETIME LEGACY"
          subtitle="CONNECT WITH US"
          description="Ready to escalate your physical conditioning? Get in touch with Ganesha Fitness. Drop by our front desk in Shikrapur, contact our concierge line, or send a message below for custom packages."
          background="matte"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 max-w-6xl mx-auto">
            {/* Left Column: Essential Contacts (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-[10px] tracking-widest text-gold-500 uppercase block font-semibold">
                HQ ADDRESS & CONTACT CHANNELS
              </span>

              <ScrollReveal direction="left" delay={0.0} scale={0.98}>
                <Card title="Our Location" subtitle="ATHLETIC SANCTUARY" hoverEffect={false} className="bg-charcoal/40">
                  <div className="flex gap-4 text-sm text-gray-300 mt-2 font-sans">
                    <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      Gajanan Karyalaya, Pabal Rd, chowk, Shikrapur, Maharashtra 412208
                    </span>
                  </div>
                </Card>
              </ScrollReveal>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ScrollReveal direction="left" delay={0.1} scale={0.98}>
                  <Card title="Voice Hotline" subtitle="CONCIERGE" hoverEffect={false} className="bg-charcoal/40 h-full">
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                        <a href="tel:+917249323535" className="text-sm font-mono text-gray-300 hover:text-gold-500 transition-colors">
                          +91 72493 23535
                        </a>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">05:00 AM - 10:00 PM</span>
                    </div>
                  </Card>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={0.2} scale={0.98}>
                  <Card title="WhatsApp Support" subtitle="WHATSAPP CHAT" hoverEffect={false} className="bg-charcoal/40 h-full">
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gold-500 shrink-0" />
                        <a 
                          href="https://wa.me/917249323535?text=Hi%20Ganesha%20Fitness,%20I'm%20interested%20in%20a%20membership!" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm font-mono text-gray-300 hover:text-gold-500 transition-colors"
                        >
                          Message Now
                        </a>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">Instant Response</span>
                    </div>
                  </Card>
                </ScrollReveal>
              </div>

              <ScrollReveal direction="left" delay={0.3} scale={0.98}>
                <Card title="Operational Hours" subtitle="TRAINING HOURS" hoverEffect={false} className="bg-charcoal/40">
                  <div className="space-y-3 mt-3">
                    {operationalHours.map((hoursObj, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs text-gray-300 font-mono border-b border-gold-500/5 pb-2 last:border-b-0 last:pb-0">
                        <span className="text-gray-400 font-sans">{hoursObj.days}</span>
                        <span className="text-gold-500 font-bold">{hoursObj.hours}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.4} scale={0.98}>
                <Card title="Corporate Inquiries" subtitle="EMAIL ADDRESS" hoverEffect={false} className="bg-charcoal/40">
                  <div className="flex gap-3 text-sm text-gray-300 mt-2 font-sans">
                    <Mail className="w-5 h-5 text-gold-500 shrink-0" />
                    <a href="mailto:info@ganeshafitness.com" className="hover:text-gold-500 transition-colors">
                      info@ganeshafitness.com
                    </a>
                  </div>
                </Card>
              </ScrollReveal>
            </div>

            {/* Right Column: Contact Inquiry Form (7 cols) */}
            <ScrollReveal direction="right" delay={0.1} scale={0.99} className="lg:col-span-7">
              <div className="bg-charcoal border border-gold-500/10 p-8 rounded-sm shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
                {/* Visual Grid Lines inside form container */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-gold" />
                
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="contact-form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase block mb-1">
                          ONLINE ACCESS DESK
                        </span>
                        <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-wider">
                          SEND AN ATHLETIC INQUIRY
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          Our support desk answers all digital queries within 2 hours.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-semibold">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-matte border border-gold-500/15 focus:border-gold-500 px-4 py-3 rounded-sm text-sm text-white focus:outline-none transition-colors"
                            placeholder="Enter your name"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-semibold">
                            Active Phone Number
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-matte border border-gold-500/15 focus:border-gold-500 px-4 py-3 rounded-sm text-sm text-white focus:outline-none transition-colors"
                            placeholder="e.g. +91 7249323535"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-semibold">
                            Your Current Fitness Goals & Questions
                          </label>
                          <textarea
                            rows={4}
                            required
                            value={formData.goals}
                            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                            className="w-full bg-matte border border-gold-500/15 focus:border-gold-500 p-4 rounded-sm text-sm text-white focus:outline-none transition-colors resize-none"
                            placeholder="Specify if you are looking for fat loss, muscle gain, strength prep, general coaching, etc..."
                          />
                        </div>

                        <div className="pt-2">
                          <Button type="submit" variant="primary" size="md" fullWidth className="py-3 font-semibold">
                            Submit Membership Inquiry
                          </Button>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    /* Elegant success screen instead of window.alert */
                    <motion.div
                      key="success-prompt"
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="text-center py-12 space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-gold-500/10 border-2 border-gold-500 flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <CheckCircle className="w-8 h-8 text-gold-500" />
                      </div>
                      
                      <div className="space-y-2">
                        <span className="font-mono text-xs text-gold-500 uppercase tracking-widest font-bold">
                          SUBMISSION COMPLETE
                        </span>
                        <h4 className="font-display font-black text-2xl text-white uppercase tracking-wider">
                          INQUIRY RECORDED!
                        </h4>
                        <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed font-sans">
                          Thank you for connecting with Ganesha Fitness. Our front desk coaches will reach out to you on your specified phone number shortly.
                        </p>
                      </div>

                      <div className="pt-4 max-w-sm mx-auto">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          fullWidth 
                          onClick={() => setIsSubmitted(false)}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </Section>

        {/* Location Google Maps Visual Block Indicator */}
        <Section
          title="VISIT SHIKRAPUR'S CHAMPION CLUB"
          subtitle="HOW TO GET HERE"
          background="charcoal"
        >
          <ScrollReveal direction="up" className="max-w-5xl mx-auto rounded-sm overflow-hidden border border-gold-500/10 bg-charcoal relative">
            <div className="aspect-[21/9] min-h-[250px] w-full flex flex-col justify-center items-center text-center p-8 bg-gradient-to-br from-charcoal to-matte relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
              <MapPin className="w-10 h-10 text-gold-500 mb-4 animate-bounce" />
              <h4 className="font-display font-bold text-lg text-white uppercase tracking-wider mb-2">
                PUNE-NAGAR HIGHWAY SANCTUARY
              </h4>
              <p className="text-sm text-gray-400 max-w-md mb-6 leading-relaxed font-sans">
                Located Gajanan Karyalaya, Pabal chowk, Shikrapur, Ganesha Fitness is highly accessible with dedicated car and bike parking facilities.
              </p>
              <a 
                href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjIjI3t2ceVAxUAAAAAHQAAAAAQCQ..i&rlz=1C1GGRV_enIN1206IN1207&pvq=Cg0vZy8xMXhyZHNrN3BmIkQKPmdhbmVzaGEgZml0bmVzcyBmaXRuZXNzIGd5bSB0aGVpciBhbnkgb2ZmaWNpYWwgd2Vic2l0ZSBvZiB0aGVtEAIYAw&lqi=CktnYW5lc2hhIGZpdG5lc3MgZml0bmVzcyBneW0gc2hpa3JhcHVyIGlzIHRoZWlyIGFueSBvZmZpY2lhbCB3ZWJzaXRlIG9mIHRoZW1Irb2izN28gIAIWmsQABABEAIQAxAGEAcQCBAJEAoQCxgAGAEYAhgDGAQiS2dhbmVzaGEgZml0bmVzcyBmaXRuZXNzIGd5bSBzaGlrcmFwdXIgaXMgdGhlaXIgYW55IG9mZmljaWFsIHdlYnNpdGUgb2YgdGhlbZIBA2d5bQ&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3bc2d760ae79c961:0xe2ae91876247db59"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="sm">
                  Open in Google Maps
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </Section>
      </div>
    </PageTransition>
  );
}
